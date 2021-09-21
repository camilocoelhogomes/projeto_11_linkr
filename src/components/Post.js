import React, { useEffect, useState, useRef } from 'react';
import isYouTube from '../services/isYouTube';
import { StyledPost, LikesBox, LikedHeart, EmptyHeart, LikesNumber, ErrorMessage, RepostInfo, RepostBox } from './StyledPost';
import { FaTrash, FaRetweet } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { sendLike, sendDislike, editServerPost, sharePost } from '../services/API';
import ReactTooltip from 'react-tooltip';
import { useHistory } from 'react-router-dom';
import ReactHashtag from 'react-hashtag';
import DeletePostModal from './DeletePostModal';
import RepostModal from './RepostModal';
import { Edit } from 'grommet-icons';
import useKeypress from 'react-use-keypress';
import hashtagsToLowerCase from '../services/hashtagsMask';

export default function Post({ post, userInfo, getPosts }) {
    const textRef = useRef();
    const history = useHistory();
    const {
        id,
        user,
        likes,
        text,
        linkDescription,
        linkImage,
        linkTitle,
        link,
        repostCount,
        repostedBy,
    } = post;

    const isCurrentUser = Boolean(userInfo.user.id === user.id);
    const [liked, setLiked] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(likes.length);
    const [errorMessage, setErrorMessage] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [repostModal, setRepostModal] = useState(false);
    const [isEditPost, setIsEditPost] = useState(false);
    const [postText, setPostText] = useState(text);
    const [disableEditPost, setDisableEditPost] = useState(false);

    const likePost = (postId) => {

        setLiked(true);
        const actualLikesNumber = numberOfLikes;
        setNumberOfLikes(numberOfLikes + 1);
        sendLike(postId, userInfo.token).then(ans => {
            getPosts();
        }).catch(err => {
            setLiked(false);
            setNumberOfLikes(actualLikesNumber);
            setErrorMessage("Não foi possível curtir esta publicação!");
            setTimeout(() => setErrorMessage(""), 2000);
        })
    }

    useKeypress("Enter", () => {
        if (isEditPost) {
            setDisableEditPost(true);
            const data = { 'text': hashtagsToLowerCase(postText) };
            editServerPost({
                token: userInfo.token,
                id: id,
                data: data,
            }).then(res => {
                setDisableEditPost(false);
                setIsEditPost(false);
            }).catch(() => {
                setDisableEditPost(false);
                setErrorMessage("Não foi possível editar esse post!");
                textRef.current.focus()
                setTimeout(() => setErrorMessage(""), 2000);
            })
        }
    });

    useKeypress("Escape", () => {
        if (isEditPost) {
            setPostText(text);
            setIsEditPost(false);
        }
    });

    const dislikePost = (postId) => {
        setLiked(false);
        const actualLikesNumber = numberOfLikes;
        setNumberOfLikes(numberOfLikes - 1);
        sendDislike(postId, userInfo.token).then(ans => {
            getPosts();
        }).catch(err => {
            setLiked(true);
            setNumberOfLikes(actualLikesNumber);
            setErrorMessage("Não foi possível descurtir esta publicação!");
            setTimeout(() => setErrorMessage(""), 2000);
        })
    }

    const isPostAlreadyLiked = () => {
        if (likes.find(like => like.userId === userInfo.user.id) !== undefined) {
            setLiked(true);
        }
    }

    useEffect(isPostAlreadyLiked, [])
    useEffect(() => {
        if (isEditPost) {
            textRef.current.focus()
        }
    }, [isEditPost]);

    return (
        <>
        {!!repostedBy  
            ?   <RepostInfo>
                    <FaRetweet className="repost"/>
                    <p>Re-posted by {repostedBy.id === userInfo.user.id ? "you" : repostedBy.username}</p>
                </RepostInfo>
            :   <></>
        }
        <StyledPost>
            {errorMessage !== "" ? (
                <ErrorMessage><span>{errorMessage}</span></ErrorMessage>
            ) : (<></>)}
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
                            <LikedHeart onClick={() => dislikePost(id)} />
                            <LikesNumber data-text-color="#505050" data-tip={
                                likes.length === 0 ? ("Ninguém curtiu esta publicação!")
                                    : (likes.length === 1 ? (`Curtido por você`)
                                        : (likes.length === 2 ? (likes[1].userId === userInfo.user.id ? (`Curtido por você e ${likes[0]["user.username"]}`)
                                            : (`Curtido por você e ${likes[1]["user.username"]}`))
                                            : (likes[likes.length - 1].userId === userInfo.user.id ? (`Curtido por você, ${likes[likes.length - 2]["user.username"]} e outras ${likes.length - 2} pessoa(s)`)
                                                : (`Curtido por você, ${likes[likes.length - 1]["user.username"]} e outras ${likes.length - 2} pessoa(s)`))))}>
                                {numberOfLikes} likes
                            </LikesNumber>
                        </>
                    ) : (
                        <>
                            <EmptyHeart onClick={() => likePost(id)} />
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
                <RepostBox>
                    <FaRetweet className="repost" onClick={() => setRepostModal(true)}/>
                    <p>{repostCount} re-posts</p>
                </RepostBox>
            </div>
            <main>
                <h4>{user.username}</h4>
                {
                    isEditPost ?
                        <form className='paragraph'>
                            <textarea disabled={disableEditPost} ref={textRef} onChange={(e) => setPostText(e.target.value)} value={postText} />
                        </form> :
                        <div className='paragraph'>
                            <p>
                                <ReactHashtag onHashtagClick={hashTag => history.push(`/hashtag/${hashTag.replace(/#/g, "")}`)}>
                                    {postText}
                                </ReactHashtag>
                            </p>
                        </div>
                }
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
            {isCurrentUser ?
                <div className='buttons-trash-edit'>
                    <button className='trashButton' onClick={() => setIsEditPost(!isEditPost)}><Edit size='16px' color='#FFFFFF' /></button>
                    <button className='trashButton' onClick={() => setModalIsOpen(true)}><FaTrash size='16px' color='white' /></button>
                </div>
                :
                ""
            }
            <DeletePostModal state={{ modalIsOpen, setModalIsOpen }} postId={id} getPosts={getPosts} />
            <RepostModal state={{ repostModal, setRepostModal }} postId={id} getPosts={getPosts} />
        </StyledPost>
        </>
        )
}
