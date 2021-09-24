import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Post from '../../components/Post';
import { getFollowedUsersPosts, getFollowedUsers } from '../../services/API';
import Alert from '../../components/Alert';
import Treding from '../../components/Trending';
import Publish from './Publish';
import { PageContainer } from '../../components/PageContainer';
import InfiniteScroll from "react-infinite-scroller";
import loading from '../../Assets/img/loading.gif';

export default function TimeLine() {

    const [posts, setPosts] = useState([]);
    const [err, setErr] = useState(null);
    const [followedUsersErr, setFollowedUsersErr] = useState(null);
    const [followedUsers, setFollowedUsers] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [postId, setPostId] = useState("");
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const loadMorePosts = () => {
        getFollowedUsersPosts( userInfo.token, (postId === "" ? "" : `olderThan=${postId}`) )
            .then(res => {
                setErr(false);
                setPosts([...posts, ...res.data.posts]);
                if (res.data.posts.length === 0) {
                    setHasMore(false);
                }   
            })
            .catch(() => setErr(true));
    }

    const getNewPosts = (newPosts = [], id) => {
        return getFollowedUsersPosts( userInfo.token, (id ? `olderThan=${id}` : "") )
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
        getNewPosts().then(data => setPosts(data));   
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
        loadMorePosts();
    }, [postId]);

    useEffect(() => {
        defineFollowedUsers();
        const intervalId = setInterval(getPosts, 15000);
        return () => {
            clearInterval(intervalId);
        }
    }, []);

    if (!posts) return (
        <>
            <Header />
            <PageContainer>
                <header>
                    <h2>timeline</h2>
                </header>
            </PageContainer>
        </>
    )

    if (followedUsersErr) {
        return <Alert message={'Não foi possível obter os dados de seus seguidores, por favor recarregue a página'} />
    }

    if (err) {
        return <Alert message={'Não foi possível carregar os posts, por favor recarregue a página'} />
    }

    return (
        <>
            <Header />
            <PageContainer>
                <header>
                    <h2>timeline</h2>
                </header>
                <div className='main-content'>
                    <div className='posts'>
                        <Publish loadPosts={getPosts} />
                        {followedUsers.length === 0 ? (
                            <h3 className="posts-message">Você não segue ninguém ainda. Procure por perfis na busca.</h3>
                        ) : (
                            posts.filter(post => post.user.id !== userInfo.user.id).length === 0 ? (
                                <h3 className="posts-message">Seus seguidores não postaram nada ainda!</h3>
                            ) : ("")
                        )}
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
                    <Treding className='trending' />
                </div>
            </PageContainer>
        </>
    );
}