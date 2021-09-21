import React, { useEffect, useState } from "react";
import { getLikedPosts } from "../../services/API";
import styled from "styled-components";
import Post from '../../components/Post';
import Header from '../../components/Header';
import Trending from "../../components/Trending";
import Alert from "../../components/Alert";

export default function LikedPosts() {
    const [posts, setPosts] = useState([]);
    const [err, setErr] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const getPosts = () => {
        getLikedPosts({token: userInfo.token})
            .then( res => setPosts(res.data.posts))
            .catch(() => setErr(true));
    }

    useEffect(getPosts, []);

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
                        {posts.length === 0 ? <h2>Nenhum post encontrado</h2> :
                            posts.map(post => <Post key={post.id} post={post} userInfo={userInfo} getPosts={getPosts}/>)
                        }
                    </div>
                    <Trending className='trending' />
                </div>
            </PageContainer>
        </>
    )
}

const PageContainer = styled.div`
    margin: 0 auto;
    max-width: 1042px;
    position: relative;
    header {
        margin: 125px 0 43px 0;
    }
    .posts{
        display: flex;
        flex-direction: column;
    }

    .main-content{
        display: flex;
        justify-content: space-between;
        position: relative;
    }

    @media(max-width: 900px){
        .posts{
            width: 100%;
        }
    }
`;