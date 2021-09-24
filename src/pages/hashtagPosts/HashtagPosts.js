import React, { useEffect, useState } from "react";
import { getHashtagPosts } from "../../services/API";
import { useParams } from "react-router-dom";
import Post from '../../components/Post';
import Header from '../../components/Header';
import Trending from "../../components/Trending";
import Alert from "../../components/Alert";
import { PageContainer } from "../../components/PageContainer";
import InfiniteScroll from "react-infinite-scroller";
import loading from '../../Assets/img/loading.gif';

export default function HashtagPosts() {
    const [posts, setPosts] = useState([]);
    const [err, setErr] = useState(null);
    const { hashtag } = useParams();
    const [hasMore, setHasMore] = useState(true);
    const [postId, setPostId] = useState("");
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const loadMorePosts = () => {
        getHashtagPosts({ token: userInfo.token, hashtag, postId })
            .then(res => {
                setPosts([...posts, ...res.data.posts]);
                if (res.data.posts.length === 0) {
                    setHasMore(false);
                }
            })
            .catch(() => setErr(true));
    }

    const getNewPosts = (newPosts = [], id) => {
        return getHashtagPosts({ token: userInfo.token, hashtag, postId: (id ? id : "") })
            .then(res => {
                newPosts.push(...res.data.posts);
                if (newPosts.length === posts.length || res.data.posts.length === 0) {
                    return newPosts;
                }
                return getNewPosts(newPosts, newPosts[newPosts.length - 1].id);
            })    
    }

    const getPosts = () => {
        getNewPosts().then(data => {setPosts(data)});   
    }

    useEffect(() => {
        loadMorePosts();
    }, [postId]);

    useEffect(() => {
        getHashtagPosts({ token: userInfo.token, hashtag, postId: "" })
            .then(res => {
                window.scrollTo({top: 0, behavior: 'smooth'});       
                setPosts(res.data.posts); 
                setHasMore(true);
            })
            .catch(() => setErr(true));
        const intervalId =  setInterval(getPosts, 15000);
        return () => {
            clearInterval(intervalId);
        }
    }, [hashtag])

    if (err) {
        return <Alert message={'Não foi possível carregar os posts, por favor recarregue a página'} />
    }

    return (
        <>
            <Header />
            <PageContainer>
                <header>
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
                                    {posts.map(post => <Post key={post.id} post={post} userInfo={userInfo} getPosts={getPosts} />)}  
                                </InfiniteScroll>
                        }
                    </div>
                    <Trending className='trending' />
                </div>
            </PageContainer>
        </>
    );
}