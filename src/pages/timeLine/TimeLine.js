import React, { useEffect, useState } from 'react';

import Post from '../../components/Post';
import { getServerPosts } from '../../services/API';
import StyledTimeLine from './StyledTimeLine';

const TimeLine = () => {
    const [posts, setPosts] = useState(null);


    const token = {
        "token": "09e49b91-c4c6-41eb-bb38-8d742259526f",
    }

    const getPosts = () => {
        getServerPosts(token).then((res) => setPosts(res.data.posts))
    }

    useEffect(getPosts, []);

    if (!posts) return <></>

    return (
        <StyledTimeLine>
            <header>
                <h2>timeline</h2>
            </header>
            <div className='posts'>
                {
                    posts.map(post => <Post key={post.id} post={post} />)
                }
            </div>
        </StyledTimeLine>
    )
}

export default TimeLine;
