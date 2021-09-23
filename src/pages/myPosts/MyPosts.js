import React, { useEffect, useState } from "react";
import { getUserPosts } from "../../services/API";
import { PageContainer } from "../shared/styled-components/PageContainer";
import Post from '../../components/Post';
import Header from '../../components/Header';
import Trending from "../../components/Trending";
import Alert from "../../components/Alert";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import loading from '../../Assets/img/loading.gif';

export default function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [err, setErr] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const [hasMore, setHasMore] = useState(true);

    const getPosts = (id) => {
        axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/${userInfo.user.id}/posts?olderThan=${id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } })
            .then(res => {
                setPosts([...posts, ...res.data.posts]);
                if (res.data.posts.length === 0) {
                    setHasMore(false);
                }
            })
            .catch(() => setErr(true));
    }

    useEffect(() => {
        getUserPosts({ token: userInfo.token, id: userInfo.user.id })
        .then(res => setPosts(res.data.posts))
        .catch(() => setErr(true));
    }, []);

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
                                loadMore={() => getPosts(posts[posts.length - 1].id)}
                                hasMore={hasMore}
                                loader={
                                    <div className="loader" key={0}>
                                        <img src={loading}/>
                                        Loading more posts...
                                    </div>
                                }
                            >
                                {posts.map(post => <Post key={post.repostId ? post.repostId : post.id} post={post} userInfo={userInfo} getPosts={getPosts} />)}
                                
                            </InfiniteScroll>
                    }
                    </div>
                    <Trending className='trending' />
                </div>
            </PageContainer>
        </>
    );
}
