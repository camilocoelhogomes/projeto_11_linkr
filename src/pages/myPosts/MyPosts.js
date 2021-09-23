import React, { useEffect, useState } from "react";
import { getUserPosts } from "../../services/API";
import { PageContainer } from "../shared/styled-components/PageContainer";
import Post from '../../components/Post';
import Header from '../../components/Header';
import Trending from "../../components/Trending";
import Alert from "../../components/Alert";
import InfiniteScroll from "react-infinite-scroller";

export default function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [err, setErr] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const getPosts = () => {
        getUserPosts({ token: userInfo.token, id: userInfo.user.id })
            .then(res => setPosts(res.data.posts))
            .catch(() => setErr(true));
    }

    useEffect(() => {
        getPosts();
        const intervalId =  setInterval(getPosts, 15000);
        return () => {
            clearInterval(intervalId);
        }
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
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={loadFunc}
                            hasMore={true || false}
                            loader={<div className="loader" key={0}>Loading ...</div>}
                        >
                            {posts.length === 0 
                                ? <h2>Nenhum post encontrado</h2> 
                                : posts.map(post => <Post key={post.id} post={post} userInfo={userInfo} getPosts={getPosts} />)
                            }
                        </InfiniteScroll>
                    </div>
                    <Trending className='trending' />
                </div>
            </PageContainer>
        </>
    );
}
