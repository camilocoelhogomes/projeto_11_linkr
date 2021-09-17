import React, { useEffect, useState } from 'react';
import StyledTimeLine from './StyledTimeLine';

import Post from '../../components/Post';
import { getServerPosts } from '../../services/API';
import Alert from '../../components/Alert';




const TimeLine = () => {

    const [posts, setPosts] = useState(null);
    const [err, setErr] = useState(null)
    const token = {
        "token": "09e49b91-c4c6-41eb-bb38-8d742259526f",
    }

    const getPosts = () => {
        getServerPosts(token)
            .then((res) => { setErr(false); setPosts(res.data.posts) })
            .catch(() => setErr(true))
    }

    useEffect(getPosts, [token]);

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
            <div className='posts'>
                {posts.length === 0 ? <h2>Nenhm post encontrado</h2> :
                    posts.map(post => <Post key={post.id} post={post} />)
                }
            </div>
        </StyledTimeLine>
    )
}

export default TimeLine;
