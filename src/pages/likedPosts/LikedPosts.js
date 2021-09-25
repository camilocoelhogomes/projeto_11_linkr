import React, { useEffect, useState } from "react";
import { getLikedPosts } from "../../services/API";
import Post from '../../components/Post';
import Header from '../../components/Header';
import Trending from "../../components/Trending";
import Alert from "../../components/Alert";
import { PageContainer } from "../../components/PageContainer";
import LoadingPosts from "../../components/LoadingPosts";
import SearchInput from "../../components/SearchInput";

export default function LikedPosts() {
    const [posts, setPosts] = useState(null);
    const [err, setErr] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const getPosts = () => {
        getLikedPosts({token: userInfo.token})
            .then( res => setPosts(res.data.posts))
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

    if (!posts) return (
        <>
            <PageContainer>
                <header>
                    <h2>my likes</h2>
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
                    <h2>my likes</h2>
                </header>
                <div className='main-content'>
                    <div className='posts'>
                        {posts.length === 0 ? <h2>Nenhum post encontrado</h2> :
                            posts.map(post => <Post key={!!post.repostId ? post.repostId : post.id} post={post} userInfo={userInfo} getPosts={getPosts}/>)
                        }
                    </div>
                    <Trending className='trending' />
                </div>
            </PageContainer>
            <Header />
        </>
    )
}