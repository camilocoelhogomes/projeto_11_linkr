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
import LoadingPosts from "../../components/LoadingPosts";
import InfiniteScroll from "react-infinite-scroller";
import loading from '../../Assets/loading.gif';
import SearchInput from "../../components/SearchInput";

export default function UserPosts() {
    const [posts, setPosts] = useState(null);
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

    const getPosts = () => {
        getUserPosts({ token: userInfo.token, id, postId })
            .then(res => {
                (!posts) ? setPosts([...res.data.posts]) : setPosts([...posts, ...res.data.posts]);
                if (res.data.posts.length === 0) {
                    setHasMore(false);
                }
            })
            .catch(() => setErr(true));
    }

    const getNewPosts = () => {
        getUserPosts({ token: userInfo.token, id, postId: "" })
            .then(res => {
                const newPosts = [];
                res.data.posts.some(post => {
                    if (!!post.repostId) {
                        if(!posts[0].repostId) {
                            return newPosts.push(post);
                        } 
                        if (post.repostId === posts[0].repostId) {
                            return true;
                        } 
                        return newPosts.push(post);    
                    }
                    if(post.id === posts[0].id) {
                        return true;
                    } 
                    return newPosts.push(post); 
                })
                setPosts([...newPosts, ...posts]);
            })
            .catch(() => setErr(true));
    }

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
        getUserInfo({token: userInfo.token, id})
            .then( res => setUsername(res.data.user.username));
        defineFollowedUsers();
        getUserPosts({ token: userInfo.token, id, postId: "" })
            .then(res => {
                setPosts(res.data.posts);
                window.scrollTo({top: 0});
                setHasMore(true);
            });
    }, [id]);

    useEffect(() => {
        getPosts();
    }, [postId]);

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

    if (!posts) return (
        <>
            <PageContainer>
                <header>
                    <h2>'s posts</h2>
                </header>
                <LoadingPosts />
            </PageContainer>
            <Header />
        </>
    )

    return (
        <>
            <PageContainer>
                <header>
                    <SearchInput />
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
                                    {posts.map(post => <Post key={!!post.repostId ? post.repostId : post.id} post={post} userInfo={userInfo} getNewPosts={getNewPosts} posts={posts} setPosts={setPosts}/>)}
                                </InfiniteScroll>
                        }
                    </div>
                    <Trending className='trending' />
                </div>
            </PageContainer>
            <Header />
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
    :hover {
        opacity: 0.8;
    }
    :active {
        transform: translateY(-3px);
    }
`
const LoadingButton = styled.button`
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
    border: none;
`