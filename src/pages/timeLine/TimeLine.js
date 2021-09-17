import React, { useEffect, useState } from 'react';
import StyledTimeLine from './StyledTimeLine';

import Post from '../../components/Post';
import { getServerPosts } from '../../services/API';



const TimeLine = () => {
    const [posts, setPosts] = useState(null);
    debugger;
    const token = {
        "token": "09e49b91-c4c6-41eb-bb38-8d742259526f",
    }

    const getPosts = () => {
        getServerPosts(token)
            .then((res) => { setPosts(res.data.posts) })
            .catch(() => alert('Houve uma falha em obter os posts, por favor atualze a página'))
    }

    useEffect(getPosts, []);

    if (!posts) return (
        <header>
            <h2>timeline</h2>
        </header>)

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
