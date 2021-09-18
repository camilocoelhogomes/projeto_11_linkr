import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import isYouTube from '../services/isYouTube';
import StyledPost from './StyledPost';
import { Link } from 'react-router-dom'
import ReactHashtag from "react-hashtag";
import { sendLike, sendDislike } from '../services/API';
import ReactTooltip from 'react-tooltip';

import styled from 'styled-components';

const Post = ({ post, userInfo, getPosts }) => {

    const [liked, setLiked] = useState(false);
    const {
        id,
        user,
        likes,
        text,
        linkDescription,
        linkImage,
        linkTitle,
        link,
    } = post;

    console.log(post);
    console.log(userInfo);

    const likePost = (postId) => {
        setLiked(true);
        sendLike(postId, userInfo.token).then(ans => {
            getPosts();
        }).catch(err => {
            setLiked(false);
        })
    }

    const dislikePost = (postId) => {
        setLiked(false);
        sendDislike(postId, userInfo.token).then(ans => {
            getPosts();
        }).catch(err => {
            setLiked(true);
        })
    }

    const isPostAlreadyLiked = () => {
        if (likes.find(like => like.userId === userInfo.user.id) !== undefined) {
            setLiked(true);
        } 
    }

    useEffect(isPostAlreadyLiked, [])

    return (
        <StyledPost>
            <div className='img-like'>
                <Link to={`/user/${user.id}`}>
                    <img alt='user' className='user-img' src={user.avatar} />
                </Link>
                <ReactTooltip
                    data-event="hover" 
                    backgroundColor="#ffffff" 
                    place="bottom"
                    effect="float"
                />
                <LikesBox>
                    {liked ? (
                        <>
                            <LikedHeart onClick={() => dislikePost(id)}/>
                            <LikesNumber data-text-color="#505050" data-tip={
                                likes.length === 0 ? ("Ninguém curtiu esta publicação!") 
                                : (likes.length === 1 ? (`Curtido por ${userInfo.user.username}`) 
                                : (likes.length === 2 ? (likes[1].userId === userInfo.user.id ? (`Curtido por ${likes[1]["user.username"]} e ${likes[0]["user.username"]}`) 
                                : (`Curtido por ${likes[0]["user.username"]} e ${likes[1]["user.username"]}`)) 
                                : (likes[likes.length - 1].userId === userInfo.user.id ? (`Curtido por ${userInfo.user.username}, ${likes[likes.length - 2]["user.username"]} e outras ${likes.length - 2} pessoa(s)`) 
                                : (`Curtido por ${userInfo.user.username}, ${likes[likes.length - 1]["user.username"]} e outras ${likes.length - 2} pessoa(s)`))))}>
                                {likes.length} likes
                            </LikesNumber>
                        </>
                    ) : (
                        <>
                            <EmptyHeart onClick={() => likePost(id)}/>
                            <LikesNumber data-text-color="#505050" data-tip={
                                likes.length === 0 ? ("Ninguém curtiu esta publicação!") 
                                : (likes.length === 1 ? (`Curtido por ${likes[0]["user.username"]}`) 
                                : (likes.length === 2 ? (`Curtido por ${likes[0]["user.username"]} e ${likes[1]["user.username"]}`) 
                                : (`Curtido por ${likes[likes.length - 1]["user.username"]}, ${likes[likes.length - 2]["user.username"]} e outras ${likes.length - 2} pessoa(s)`)))
                                }>
                                {likes.length} likes
                            </LikesNumber>
                        </>
                    )}
                </LikesBox>

            </div>

            <main>
                <h4>{user.username}</h4>

                <div className='paragraph'>
                    <p>
                        <ReactHashtag>
                            {text}
                        </ReactHashtag>
                    </p>
                </div>

                {
                    isYouTube({ link: link }).service === 'youtube' ?
                        <>
                            <div className='youtube-video'>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${isYouTube({ link: link }).id}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen></iframe>
                            </div>
                            <a href={link} target="_blank" rel="noreferrer">{link}</a>
                        </>
                        :
                        <a href={link} className='link-card' target="_blank" rel="noreferrer">
                            <div className='link-text-info'>
                                <div className='paragraph'>
                                    <p className='link-title'>{linkTitle}</p>
                                </div>

                                <div className='paragraph'>
                                    <p className='link-description'>{linkDescription}</p>
                                </div>

                                <div className='paragraph'>
                                    <p className='link'>{link}</p>
                                </div>


                            </div>
                            <img alt='link' className='link-img' src={linkImage} />
                        </a>
                }

            </main>

        </StyledPost>)
}

export default Post;

const LikesBox = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
`
const LikedHeart = styled(AiFillHeart)`
    font-size: 30px;
    color: #AC0000;
`
const EmptyHeart = styled(AiOutlineHeart)`
    font-size: 30px;
    color: #FFFFFF;
`
const LikesNumber = styled.p`
    font-size: 11px;
`