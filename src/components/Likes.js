import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ReactTooltip from 'react-tooltip';
import { sendLike, sendDislike } from "../services/api.service"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Likes ({ userInfo }) {

    console.log(userInfo)
    const [posts, setPosts] = useState(null);
    console.log(posts);

    const getPosts = () => axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts`, { headers: { Authorization: `Bearer ${userInfo.token}`}})


    const renderPosts = () => {
        getPosts().then(ans => {
            setPosts(ans.data.posts);
            console.log(ans.data.posts)
        })
    }

    useEffect(() => {
        renderPosts();
    },[])

    if (posts === null) {
        return(
            <>
            </>
        )
    }


    const likePost = (postId) => {
        sendLike(postId, userInfo).then(ans => {
            console.log(ans.data);
            renderPosts();
        }).catch(err => {
            console.log(err);
        })
    }

    const dislikePost = (postId) => {
        sendDislike(postId, userInfo).then(ans => {
            console.log(ans.data);
            renderPosts();
        }).catch(err => {
            console.log(err);
        })
    }



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
                    {post.likes.find(like => like.userId === userInfo.user.id) !== undefined ? (
                        <>
                            <AiFillHeart size='30px' color='#AC0000' onClick={() => dislikePost(post.id)}/>
                            <LikesNumber data-text-color="#505050" data-tip={
                                post.likes.length === 1 ? (`Curtido por ${userInfo.user.username}`) 
                                : (post.likes.length === 2 ? (post.likes[1]["user.id"] === userInfo.user.id ? (`Curtido por ${post.likes[1]["user.username"]} e ${post.likes[0]["user.username"]}`) 
                                : (`Curtido por ${post.likes[0]["user.username"]} e ${post.likes[1]["user.username"]}`)) 
                                : (post.likes[post.likes.length - 1]["user.id"] === userInfo.user.id ? (`Curtido por ${userInfo.user.username}, ${post.likes[post.likes.length - 2]["user.username"]} e outras ${post.likes.length - 2} pessoa(s)`) 
                                : (`Curtido por ${userInfo.user.username}, ${post.likes[post.likes.length - 1]["user.username"]} e outras ${post.likes.length - 2} pessoa(s)`)))}>
                                {post.likes.length} likes
                            </LikesNumber>
                        </>
                    ) : (
                        <>
                            <AiOutlineHeart size='30px' color='#FFFFFF' onClick={() => likePost(post.id)}/>
                            <LikesNumber data-text-color="#505050" data-tip={
                                post.likes.length === 0 ? ("Ninguém curtiu esta publicação!") 
                                : (post.likes.length === 1 ? (`Curtido por ${post.likes[0]["user.username"]}`) 
                                : (post.likes.length === 2 ? (`Curtido por ${post.likes[0]["user.username"]} e ${post.likes[1]["user.username"]}`) 
                                : (`Curtido por ${post.likes[post.likes.length - 1]["user.username"]}, ${post.likes[post.likes.length - 2]["user.username"]} e outras ${post.likes.length - 2} pessoa(s)`)))
                                }>
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
    display: flex;
    justify-content: center;
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