import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import isYouTube from '../services/isYouTube';
import StyledPost from './StyledPost';

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

    console.log(post)
    return (
        <StyledPost>
            <div clasName='img-like'>

                <img className='user-img' src={user.avatar} />

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
                <p>{text}</p>


                <a href={link} className='link-card' target="_blank">
                    {
                        isYouTube({ link: link }).service === 'youtube' ?

                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${isYouTube({ link: link }).id}`}
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen></iframe>

                            :
                            <>
                                <div className='link-text-info'>
                                    <p className='link-title'>{linkTitle}</p>
                                    <p className='link-description'>{linkDescription}</p>
                                    <p className='link'>{link}</p>
                                </div>
                                <img className='link-img' src={linkImage} />
                            </>
                    }

                </a>


            </main>

        </StyledPost>)
}

export default Post;

