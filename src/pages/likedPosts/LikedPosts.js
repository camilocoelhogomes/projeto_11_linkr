import React, { useEffect, useState } from "react";
import { getLikedPosts } from "../../services/API";
import Post from '../../components/Post';
import Header from '../../components/Header';
import Trending from "../../components/Trending";
import Alert from "../../components/Alert";
import { PageContainer } from "../../components/PageContainer";
import InfiniteScroll from "react-infinite-scroller";
import loading from '../../Assets/loading.gif';

export default function LikedPosts() {
    const [posts, setPosts] = useState([]);
    const [err, setErr] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [postId, setPostId] = useState("");
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const getPosts = () => {
        getLikedPosts({ token: userInfo.token, postId })
            .then(res => {
                setPosts([...posts, ...res.data.posts]);
                if (res.data.posts.length === 0) {
                    setHasMore(false);
                }
            })
            .catch(() => setErr(true));
    }

    const getNewPosts = () => {
        getLikedPosts({ token: userInfo.token, postId: "" })
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

    if (err) {
        return <Alert message={'Não foi possível carregar os posts, por favor recarregue a página'} />
    }

    return (
        <>
            <Header />
            <PageContainer>
                <header>
                    <h2>my likes</h2>
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
        </>
    )
}