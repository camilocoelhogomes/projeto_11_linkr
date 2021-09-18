import React, { useEffect, useState } from 'react';
import StyledTimeLine from './StyledTimeLine';

import Post from '../../components/Post';
import { getServerPosts } from '../../services/API';
import Alert from '../../components/Alert';
import Treding from '../../components/Trending'



const TimeLine = () => {

    const [posts, setPosts] = useState(null);
    const [err, setErr] = useState(null)


    const getPosts = () => {
        const token = JSON.parse(localStorage.getItem("user")).token;
        getServerPosts({ token: token })
            .then((res) => { setErr(false); setPosts(res.data.posts) })
            .catch(() => setErr(true))
    }

    useEffect(getPosts, []);

    if (!posts) return (
        <header>
            <h2>timeline</h2>
        </header>)

    if (err) {
        return <Alert message={'Não foi possível carregar os posts, por favor recarregue a página'} />
    }

    return (
        <StyledTimeLine>

            <header>
                <h2>timeline</h2>
            </header>
            <div className='main-content'>
                <div className='posts'>
                    {posts.length === 0 ? <h2>Nenhm post encontrado</h2> :
                        posts.map((post) => <Post key={post.id} post={post} />)
                    }
                </div>
                <Treding className='trending' />
            </div>
        </StyledTimeLine>
    )
}

export default TimeLine;
