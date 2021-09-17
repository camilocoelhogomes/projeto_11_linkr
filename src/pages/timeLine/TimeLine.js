import React from 'react';

import Post from '../../components/Post';
import StyledTimeLine from './StyledTimeLine';

const TimeLine = () => {
    const posts = serverPosts.posts;
    return (
        <StyledTimeLine>
            <header>
                <h2>timeline</h2>
            </header>
            {
                posts.map(post => <Post key={post.id} post={post} />)
            }
        </StyledTimeLine>
    )
}

export default TimeLine;

const serverPosts = {
    "posts": [
        {
            "id": 2,
            "text": "Never Gonna Give You Up #rickroll",
            "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "linkTitle": "Rick Astley - Never Gonna Give You Up (Video)",
            "linkDescription": "Rick Astley's official music video for “Never Gonna Give You Up” Listen to Rick Astley: https://RickAstley.lnk.to/_listenYDSubscribe to the official Rick Ast...",
            "linkImage": "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
            "user": {
                "id": 1,
                "username": "teste",
                "avatar": "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/1/avatar"
            },
            "likes": [
                {
                    "id": 1,
                    "userId": 1,
                    "postId": 2,
                    "createdAt": "2021-05-24T18:55:37.544Z",
                    "updatedAt": "2021-05-24T18:55:37.544Z",
                    "user.id": 1,
                    "user.username": "teste"
                }
            ]
        }
    ]
}