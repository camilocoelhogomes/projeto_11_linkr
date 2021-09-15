import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ReactTooltip from 'react-tooltip';
import { sendLike, sendDislike } from "../services/api.service"
import { useEffect, useState } from "react";

export default function Likes () {

    const userInfo = {
        "token": "2532452342342345",
        "user": {
            "id": 1,
            "email": "teste@teste.com",
            "username": "Pedro Mafra",
            "avatar": "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/1/avatar"
        }
    }

    const posts = [
        {
            "id": 1,
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
                    "postId": 1,
                    "createdAt": "2021-05-24T18:55:37.544Z",
                    "updatedAt": "2021-05-24T18:55:37.544Z",
                    "user.id": 1,
                    "user.username": "teste"
                },
                {
                    "id": 2,
                    "userId": 2,
                    "postId": 1,
                    "createdAt": "2021-05-24T18:55:37.544Z",
                    "updatedAt": "2021-05-24T18:55:37.544Z",
                    "user.id": 2,
                    "user.username": "teste2"
                }
            ]
        },
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
                    "userId": 2,
                    "postId": 2,
                    "createdAt": "2021-05-24T18:55:37.544Z",
                    "updatedAt": "2021-05-24T18:55:37.544Z",
                    "user.id": 2,
                    "user.username": "teste"
                },
                {
                    "id": 2,
                    "userId": 3,
                    "postId": 2,
                    "createdAt": "2021-05-24T18:55:37.544Z",
                    "updatedAt": "2021-05-24T18:55:37.544Z",
                    "user.id": 3,
                    "user.username": "teste2"
                }
            ]
        }
    ]

    const likePost = (postId) => {
        sendLike(postId, userInfo).then(ans => {
            console.log(ans.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const dislikePost = (postId) => {
        sendDislike(postId, userInfo).then(ans => {
            console.log(ans.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const likes = [
        {
            "userId": 1,
            "username": "Pedro Mafra"
        },
        {
            "userId": 4,
            "username": "lalalabanana"
        }
    ]


    return (
        <>
        {posts.map((post, i) => 
            <SketchCard id={post.id} key={i}>
                <ReactTooltip
                    data-event="hover" 
                    backgroundColor="#ffffff" 
                    place="bottom"
                    effect="float"
                />
                <LikesBox>
                    {post.likes.filter(like => like.userId === userInfo.user.id).length !== 0 ? (
                        <>
                            <AiFillHeart size='30px' color='#AC0000' onClick={() => dislikePost(post.id)}/>
                            <LikesNumber data-text-color="#505050" data-tip={`${userInfo.user.username}, fulano, e outras ${post.likes.length + 1} pessoas`}>
                                {post.likes.length} likes
                            </LikesNumber>
                        </>
                    ) : (
                        <>
                            <AiOutlineHeart size='30px' color='#FFFFFF' onClick={() => likePost(post.id)}/>
                            <LikesNumber data-text-color="#505050" data-tip={`fulano, beltrano, e outras ${post.likes.length} pessoas`}>
                                    {post.likes.length} likes
                            </LikesNumber>
                        </>
                    )}
                </LikesBox>
            </SketchCard>
        )}
        
        </>
    )
}

const SketchCard = styled.div`
    width: 611px;
    height: 276px;
    background-color: #171717;
    border-radius: 16px;
    margin-top: 30px;
`
const LikesBox = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
`
const LikesNumber = styled.p`
    font-size: 11px;
`