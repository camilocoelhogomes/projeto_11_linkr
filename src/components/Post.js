import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import isYouTube from '../services/isYouTube';
import StyledPost from './StyledPost';
import { Link } from 'react-router-dom'


const Post = ({ post }) => {
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

    return (
        <StyledPost>
            <div className='img-like'>
                <Link to={`/user/${id}`}>
                    <img className='user-img' src={user.avatar} />
                </Link>

                <div className='likes' onClick={() => setLiked(!liked)}>
                    {
                        liked ?
                            <AiFillHeart size='20px' color='#AC0000' /> :
                            <AiOutlineHeart size='20px' color='#FFFFFF' />
                    }

                    <p className='like-text'>{likes.length} likes</p>


                </div>

            </div>

            <main>
                <h4>{user.username}</h4>

                <div className='paragraph'>
                    <p>

                        {text}

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
                            <a href={link} target="_blank">{link}</a>
                        </>
                        :
                        <a href={link} className='link-card' target="_blank">
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
                            <img className='link-img' src={linkImage} />
                        </a>
                }

            </main>

        </StyledPost>)
}

export default Post;

