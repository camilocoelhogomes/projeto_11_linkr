import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Post from '../../components/Post';
import { getFollowedUsersPosts, getFollowedUsers } from '../../services/API';
import Alert from '../../components/Alert';
import Treding from '../../components/Trending';
import Publish from './Publish';
import SearchInput from '../../components/SearchInput';
import { PageContainer } from '../../components/PageContainer';
import LoadingPosts from "../../components/LoadingPosts";
import InfiniteScroll from "react-infinite-scroller";
import loading from '../../Assets/loading.gif';

export default function TimeLine() {

    const [posts, setPosts] = useState(null);
    const [err, setErr] = useState(null);
    const [followedUsersErr, setFollowedUsersErr] = useState(null);
    const [followedUsers, setFollowedUsers] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [postId, setPostId] = useState("");
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const [firstRender, setFirstRender] = useState(false);

    const getPosts = () => {
        getFollowedUsersPosts(userInfo.token, (postId === "" ? "" : `?olderThan=${postId}`))
            .then(res => {
                (!posts) ? setPosts([...res.data.posts]) : setPosts([...posts, ...res.data.posts]);
                if (res.data.posts.length === 0) {
                    setHasMore(false);
                }
                if (!firstRender) {
                    setFirstRender(true);
                }
            })
            .catch(() => { setErr(true); });
    }

    const getNewPosts = () => {
        getFollowedUsersPosts(userInfo.token, "")
            .then(res => {
                const newPosts = [];
                let isTheSamePost = false;
                res.data.posts.some(post => {
                    if(!isTheSamePost && firstRender) {
                        if (!!post.repostId) {
                            if (!posts[0].repostId) {
                                return newPosts.push(post);
                            }
                            if (post.repostId === posts[0].repostId) {
                                isTheSamePost = true;
                                return;
                            }
                            return newPosts.push(post);
                        }
                        if (post.id === posts[0].id) {
                            isTheSamePost = true;
                            return;
                        }
                        return newPosts.push(post);
                    }
                });
                setPosts(() => [...newPosts, ...posts]);
            })
            .catch((err) => {
                setErr(true)
            });
    }

    const defineFollowedUsers = () => {
        getFollowedUsers(userInfo.token)
            .then(ans => {
                setFollowedUsersErr(false);
                setFollowedUsers(ans.data.users)
            }).catch(err => {
                setFollowedUsersErr(true);
            })
    }

    useEffect(() => {
        defineFollowedUsers();
        getPosts();
    }, [postId]);
    
    useEffect(() => {
        const intervalId = setInterval(getNewPosts, 15000);
        return () => {
            clearInterval(intervalId);
        }
    }, [posts]);

    if (!posts) return (
        <>
            <PageContainer>
                <header>
                    <SearchInput />
                    <h2>timeline</h2>
                </header>
                <LoadingPosts />
            </PageContainer>
            <Header />
        </>
    )

    if (followedUsersErr) {
        return <Alert message={'N??o foi poss??vel obter os dados de seus seguidores, por favor recarregue a p??gina'} />
    }

    if (err) {
        return <Alert message={'N??o foi poss??vel carregar os posts, por favor recarregue a p??gina'} />
    }

    return (
        <>
            <PageContainer>
                <header>
                    <SearchInput />
                    <h2>timeline</h2>
                </header>
                <div className='main-content'>
                    <div className='posts'>
                        <Publish loadPosts={getNewPosts} />
                        {followedUsers.length === 0 ? (
                            <h3 className="posts-message">Voc?? n??o segue ningu??m ainda. Procure por perfis na busca.</h3>
                        ) : (
                            posts.filter(post => post.user.id !== userInfo.user.id).length === 0 ? (
                                <h3 className="posts-message">Seus seguidores n??o postaram nada ainda!</h3>
                            ) : ("")
                        )}
                        {posts.length === 0
                            ? <h2>Nenhum post encontrado</h2>
                            : <InfiniteScroll
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
                                        <img src={loading} />
                                        Loading more posts...
                                    </div>
                                }
                            >
                                {posts.map(post => <Post key={!!post.repostId ? post.repostId : post.id} post={post} userInfo={userInfo} getNewPosts={getNewPosts} posts={posts} setPosts={setPosts} />)}
                            </InfiniteScroll>
                        }
                    </div>
                    <Treding />
                </div>
            </PageContainer>
            <Header />
        </>
    );
}