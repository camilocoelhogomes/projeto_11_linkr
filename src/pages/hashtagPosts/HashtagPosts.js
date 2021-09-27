import React, { useEffect, useState } from "react";
import { getHashtagPosts } from "../../services/API";
import { useParams } from "react-router-dom";
import Post from '../../components/Post';
import Header from '../../components/Header';
import Trending from "../../components/Trending";
import Alert from "../../components/Alert";
import LoadingPosts from "../../components/LoadingPosts";
import { PageContainer } from "../../components/PageContainer"
import SearchInput from "../../components/SearchInput";
import InfiniteScroll from "react-infinite-scroller";
import loading from '../../Assets/loading.gif';

export default function HashtagPosts() {
    const [posts, setPosts] = useState(null);
    const [err, setErr] = useState(null);
    const { hashtag } = useParams();
    const [hasMore, setHasMore] = useState(true);
    const [postId, setPostId] = useState("");
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const getPosts = () => {
        getHashtagPosts({ token: userInfo.token, hashtag, postId })
            .then(res => {
                (!posts) ? setPosts([...res.data.posts]) : setPosts([...posts, ...res.data.posts]);
                if (res.data.posts.length === 0) {
                    setHasMore(false);
                }
            })
            .catch(() => setErr(true));
    }

    const getNewPosts = () => {
        getHashtagPosts({ token: userInfo.token, hashtag, postId: "" })
            .then(res => {
                const newPosts = [];
                res.data.posts.some(post => {
                    if(post.id === posts[0].id) {
                        return true;
                    } 
                    return newPosts.push(post); 
                })
                setPosts([...newPosts, ...posts]);
            })
            .catch(() => setErr(true));
    }

    useEffect(() => {
        getPosts();
    }, [postId]);

    useEffect(() => {
        getHashtagPosts({ token: userInfo.token, hashtag, postId: "" })
            .then(res => {
                setPosts(res.data.posts);
                window.scrollTo({top: 0});
                setHasMore(true);
            });
    }, [hashtag]);

    if (err) {
        return <Alert message={'Não foi possível carregar os posts, por favor recarregue a página'} />
    }

    if (!posts) return (
        <>
            <PageContainer>
                <header>
                    <h2>#</h2>
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
                    <h2># {hashtag}</h2>
                </header>
                <div className='main-content'>
                    <div className='posts'>
                        {posts.length === 0 
                            ?   <h2>Nenhum post encontrado</h2> 
                            :   <InfiniteScroll
                                    pageStart={0}
                                    loadMore={() => {setPostId(posts[posts.length - 1].id)}
                                    }
                                    hasMore={hasMore}
                                    loader={
                                        <div className="loader" key={0}>
                                            <img src={loading}/>
                                            Loading more posts...
                                        </div>
                                    }
                                >
                                    {posts.map(post => <Post key={post.id} post={post} userInfo={userInfo} getNewPosts={getNewPosts} posts={posts} setPosts={setPosts}/>)}
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