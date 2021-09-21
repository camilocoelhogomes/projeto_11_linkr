import React, { useEffect, useState } from 'react';
import StyledTimeLine from './StyledTimeLine';
import Header from '../../components/Header';
import Post from '../../components/Post';
import { getServerPosts } from '../../services/API';
import Alert from '../../components/Alert';
import Treding from '../../components/Trending';
import Publish from './Publish';


export default function TimeLine() {

    const [posts, setPosts] = useState(null);
    const [err, setErr] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const getPosts = () => {
        getServerPosts({ token: userInfo.token })
            .then((res) => { setErr(false); setPosts(res.data.posts) })
            .catch(() => setErr(true))
    }

    useEffect(getPosts, []);

    if (!posts) return (
        <>
            <Header />
            <StyledTimeLine>
                <header>
                    <h2>timeline</h2>
                </header>
            </StyledTimeLine>
        </>
    )

    if (err) {
        return <Alert message={'Não foi possível carregar os posts, por favor recarregue a página'} />
    }

    return (
        <>
            <Header />
            <StyledTimeLine>
                <header>
                    <h2>timeline</h2>
                </header>
                <div className='main-content'>
                    <div className='posts'>
                        <Publish loadPosts={getPosts} />
                        {posts.length === 0 ? <h2>Nenhm post encontrado</h2> :
                            posts.map(post => <Post key={post.id} post={post} userInfo={userInfo} getPosts={getPosts} />)
                        }
                    </div>
                    <Treding className='trending' />
                </div>
            </StyledTimeLine>
        </>
    );
}