import React, { useEffect, useState } from 'react';
import isYouTube from '../services/isYouTube';
import {StyledPost, LikesBox, LikedHeart, EmptyHeart, LikesNumber} from './StyledPost';
import { Link } from 'react-router-dom'
import ReactHashtag from "react-hashtag";
import { sendLike, sendDislike } from '../services/API';
import ReactTooltip from 'react-tooltip';

export default function Post ({ post, userInfo, getPosts }) {

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
    const [liked, setLiked] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(likes.length);

    console.log(post);
    console.log(userInfo);

    const likePost = (postId) => {
        setLiked(true);
        setNumberOfLikes(numberOfLikes + 1);
        sendLike(postId, userInfo.token).then(ans => {
            getPosts();
        }).catch(err => {
            setLiked(false);
            setNumberOfLikes(numberOfLikes - 1);
        })
    }

    const dislikePost = (postId) => {
        setLiked(false);
        setNumberOfLikes(numberOfLikes - 1);
        sendDislike(postId, userInfo.token).then(ans => {
            getPosts();
        }).catch(err => {
            setLiked(true);
            setNumberOfLikes(numberOfLikes + 1);
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
                                {numberOfLikes} likes
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
                                {numberOfLikes} likes
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