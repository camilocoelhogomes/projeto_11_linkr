import React, { useEffect, useState } from "react";
import { getUserPosts, getFollowedUsers, followUser, unfollowUser, getUserInfo } from "../../services/API";
import { useParams, useHistory } from "react-router-dom";
import Post from '../../components/Post';
import Header from '../../components/Header';
import Trending from "../../components/Trending";
import Alert from '../../components/Alert';
import SmallAlert from "../../components/SmallAlert";
import { PageContainer } from "../../components/PageContainer";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import loading from '../../Assets/img/loading.gif';

export default function UserPosts() {
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState("");
    const [err, setErr] = useState(null);
    const [followErr, setFollowErr] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const { id } = useParams();
    const [isFollowed, setIsFollowed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [postId, setPostId] = useState("");
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const history = useHistory();

    const loadMorePosts = () => {
            getUserPosts({ token: userInfo.token, id, postId })
                .then(res => {
                    setPosts([...posts, ...res.data.posts]);
                    if (res.data.posts.length === 0) {
                        setHasMore(false);
                    }
                })
                .catch(() => setErr(true));
    }

    const getNewPosts = (newPosts = [], idPost) => {
        return getUserPosts({ token: userInfo.token, id, postId: (idPost ? idPost : "") })
            .then(res => {
                newPosts.push(...res.data.posts);
                if (newPosts.length === posts.length || res.data.posts.length === 0) {
                    return newPosts;
                }
                if (!!newPosts[newPosts.length - 1].repostId) {
                    return getNewPosts(newPosts, newPosts[newPosts.length - 1].repostId);
                } else {
                    return getNewPosts(newPosts, newPosts[newPosts.length - 1].id);
                }
            })    
    }

    const getPosts = () => {
        getNewPosts().then(data => {setPosts(data)});   
    }

    useEffect(() => {
        loadMorePosts();
    }, [postId]);

    const defineFollowedUsers = () => {
        getFollowedUsers(userInfo.token).then(ans => {
            setIsLoading(false);
            if (ans.data.users.find(user => user.id === Number(id))) {
                setIsFollowed(true);
            } else {
                setIsFollowed(false);
            }
        }).catch(err => {
            setFollowErr(true);
        })
    }

    useEffect(() => {
        const isUser = (Number(id) === userInfo.user.id);
        if (isUser) {
            history.push('/my-posts');
        }
        getUserPosts({token: userInfo.token, id, postId: ""})
            .then( res => {
                window.scrollTo({top: 0, behavior: 'smooth'});   
                setPosts(res.data.posts);
                setHasMore(true);
            })
            .catch(() => setErr(true));
        getUserInfo({token: userInfo.token, id})
            .then( res => setUsername(res.data.user.username));
        defineFollowedUsers();
        const intervalId = setInterval(getPosts, 15000);
        return () => {
            clearInterval(intervalId);
        }
    }, [id]);

    const follow = () => {
        setIsFollowed(true);
        followUser(id, userInfo.token).then(ans => {
            return;
        }).catch(err => {
            setIsFollowed(false);
            setErrorMessage("Não foi possível seguir este usuário!");
            setTimeout(() => setErrorMessage(""), 2000);
        })
    }

    const unfollow = () => {
        setIsFollowed(false);
        unfollowUser(id, userInfo.token).then(ans => {
            return;
        }).catch(err => {
            setIsFollowed(true);
            setErrorMessage("Não foi possível deixar de seguir este usuário!");
            setTimeout(() => setErrorMessage(""), 2000);
        })
    }

    if (err) {
        return <Alert message={'Não foi possível carregar os posts, por favor recarregue a página'} />
    }
    if (followErr) {
        return <Alert message={'Não foi possível saber se você segue ou não o usuário, por favor recarregue a página'} />
    }

    return (
        <>
            <Header />
            <PageContainer>
                <header>
                {errorMessage !== "" ? (
                    <SmallAlert errorMessage={errorMessage} top={"40px"} left={"calc(100% - 200px)"}></SmallAlert>
                ) : (<></>)}
                    <h2>{username}'s posts</h2>
                    {isLoading ? (
                        <LoadingButton>Loading...</LoadingButton>
                    ) : (
                        isFollowed ? (
                            <StyledFollowButton backgroundColor={"#ffffff"} textColor={"#1877F2"} onClick={unfollow}>Unfollow</StyledFollowButton>
                        ) : (
                            <StyledFollowButton backgroundColor={"#1877F2"} textColor={"#ffffff"} onClick={follow}>Follow</StyledFollowButton>
                        )
                    )}
                </header>
                <div className='main-content'>
                    <div className='posts'>
                        {posts.length === 0 
                            ?   <h2>Nenhum post encontrado</h2> 
                            :   <InfiniteScroll
                                    pageStart={0}
                                    loadMore={() => {
                                            if (!!posts[posts.length - 1].repostId) {
                                                setPostId(posts[posts.length - 1].repostId)
                                            } else {
                                                setPostId(posts[posts.length - 1].id)
                                            }
                                        }
                                    }
                                    hasMore={hasMore}
                                    loader={
                                        <div className="loader" key={0}>
                                            <img src={loading}/>
                                            Loading more posts...
                                        </div>
                                    }
                                >
                                    {posts.map(post => <Post key={!!post.repostId ? post.repostId : post.id} post={post} userInfo={userInfo} getPosts={getPosts} />)}   
                                </InfiniteScroll>
                        }
                    </div>
                    <Trending className='trending' />
                </div>
            </PageContainer>
        </>
    );
}

const StyledFollowButton = styled.button`
    width: 112px;
    height: 31px;
    background-color: ${({backgroundColor}) => backgroundColor};
    color: ${({textColor}) => textColor};
    font-size: 14px;
    border: none;
    line-height: 17px;
    font-weight: bold;
    border-radius: 5px;
`
const LoadingButton = styled.div`
    width: 112px;
    height: 31px;
    background-color: gray;
    color: #ffffff;
    opacity: 0.7;
    font-size: 17px;
    font-weight: bold;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`