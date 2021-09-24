import React, { useEffect, useState } from "react";
import { getUserPosts } from "../../services/API";
import { PageContainer } from "../../components/PageContainer";
import Post from '../../components/Post';
import Header from '../../components/Header';
import Trending from "../../components/Trending";
import Alert from "../../components/Alert";
import InfiniteScroll from "react-infinite-scroller";

export default function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [err, setErr] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [postId, setPostId] = useState("");
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const getPosts = () => {
        getUserPosts({ token: userInfo.token, id: userInfo.user.id, postId })
            .then(res => {
                setPosts([...posts, ...res.data.posts]);
                if (res.data.posts.length === 0) {
                    setHasMore(false);
                }
            })
            .catch(() => setErr(true));
    }

    const getNewPosts = () => {
        getUserPosts({ token: userInfo.token, id: userInfo.user.id, postId: "" })
            .then(res => {
                const newPosts = [];
                res.data.posts.some(post => {
                    if (!!post.repostId) {
                        if(!posts[0].respostId) {
                            return newPosts.push(post);
                        } 
                        if (post.respostId === posts[0].respostId) {
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
                    <h2>my posts</h2>
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
        </>
    );
}
