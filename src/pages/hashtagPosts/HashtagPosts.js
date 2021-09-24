import React, { useEffect, useState } from "react";
import { getHashtagPosts } from "../../services/API";
import { useParams } from "react-router-dom";
import Post from '../../components/Post';
import Header from '../../components/Header';
import Trending from "../../components/Trending";
import Alert from "../../components/Alert";
import { PageContainer } from "../../components/PageContainer";

export default function HashtagPosts() {
    const [posts, setPosts] = useState([]);
    const [err, setErr] = useState(null);
    const { hashtag } = useParams();
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const getPosts = () => {
        getHashtagPosts({ token: userInfo.token, hashtag })
            .then(res => setPosts(res.data.posts))
            .catch(() => setErr(true));
    }

    useEffect(() => {
        getPosts();
        const intervalId =  setInterval(getPosts, 15000);
        return () => {
            clearInterval(intervalId);
        }
    }, [hashtag]);

    if (err) {
        return <Alert message={'Não foi possível carregar os posts, por favor recarregue a página'} />
    }

    return (
        <>
            <PageContainer>
                <header>
                    <h2># {hashtag}</h2>
                </header>
                <div className='main-content'>
                    <div className='posts'>
                        {posts.length === 0 ? <h2>Nenhum post encontrado</h2> :
                            posts.map(post => <Post key={!!post.repostId ? post.repostId : post.id} post={post} userInfo={userInfo} getPosts={getPosts} />)
                        }
                    </div>
                    <Trending className='trending' />
                </div>
            </PageContainer>
            <Header />
        </>
    );
}