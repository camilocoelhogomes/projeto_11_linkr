import React, { useEffect, useState, useRef, useContext } from 'react';
import { StyledPost, LikesBox, LikedHeart, EmptyHeart, LikesNumber, StyledRepostInfo, StyledRepostBox } from './StyledPost';
import { FaTrash, FaRetweet } from 'react-icons/fa';
import { AiOutlineComment } from 'react-icons/ai';
import { sendLike, sendDislike, editServerPost } from '../services/API';
import { isYouTube, isImg } from '../services/validations';
import { Link, useHistory } from 'react-router-dom'
import ReactTooltip from 'react-tooltip';
import ReactHashtag from 'react-hashtag';
import DeletePostModal from './DeletePostModal';
import RepostModal from './RepostModal';
import Comments from './Comments';
import { Edit } from 'grommet-icons';
import useKeypress from 'react-use-keypress';
import hashtagsToLowerCase from '../services/hashtagsMask';
import LinkContext from '../store/LinkContext';
import { BACKGROUND_IMG } from '../Assets/img/img';
import SmallAlert from "./SmallAlert";
import { TiLocation } from "react-icons/ti";
import LocationPreview from './LocationPreview';

export default function Post({ post, userInfo, posts, setPosts, getNewPosts }) {
    const textRef = useRef();
    const history = useHistory();
    const {
        setShowIframe,
        setPreviewHref,
    } = useContext(LinkContext);
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
        geolocation,
        commentCount,
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
    const [location, setLocation] = useState(null);
    const [isCommentSelected, setIsCommentSelected] = useState(false);

    const likePost = (postId) => {
        setLiked(true);
        const actualLikesNumber = numberOfLikes;
        setNumberOfLikes(numberOfLikes + 1);
        sendLike(postId, userInfo.token).then(ans => {
            const newPosts = posts.map(post => {
                if(post.id === id) {
                    post.likes.push({"userId": userInfo.user.id});
                    return post;
                } else {
                    return post;
                }
            })
            setPosts([...newPosts]);
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
                const newPosts = posts.map(post => {
                    if(post.id === id) {
                        post.text = data.text;
                        return post;
                    } else {
                        return post;
                    }
                })
                setPosts([...newPosts]);
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
            const newPosts = posts.map(post => {
                if (post.likes.length > 0 && postId === post.id) {
                    console.log(post.likes);
                    post.likes = post.likes.filter(like => like.userId !== userInfo.user.id);
                    console.log(post.likes)
                    return post;
                }
                return post;  
            })
            setPosts([...newPosts]);
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
        } else {
            setLiked(false);
        }
    }

    const locationHandler = () => {
        setLocation(geolocation);
    }

    useEffect(isPostAlreadyLiked, [likes.length])
    useEffect(() => {
        if (isEditPost) {
            textRef.current.focus()
        }
    }, [isEditPost]);

    return (
        <>
            {!!repostedBy
                ? <StyledRepostInfo>
                    <FaRetweet className="repost" />
                    <p>Re-posted by
                        <Link to={`/user/${repostedBy.id}`}>
                            {repostedBy.id === userInfo.user.id ? " you" : ` ${repostedBy.username}`}
                        </Link>
                    </p>
                </StyledRepostInfo>
                : <></>
            }
            <StyledPost>
                {errorMessage !== "" ? (
                    <SmallAlert errorMessage={errorMessage} top={"110px"} left={"5px"}></SmallAlert>
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
                                    {likes.length} likes
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
                                    {likes.length} likes
                                </LikesNumber>
                            </>
                        )}
                    </LikesBox>
                    <StyledRepostBox>
                        <AiOutlineComment className="icon" onClick={() => setIsCommentSelected(!isCommentSelected)} />
                        <p>{commentCount} comments</p>
                        <FaRetweet className="icon" onClick={() => setRepostModal(true)} />
                        <p>{repostCount} re-posts</p>
                    </StyledRepostBox>
                </div>
                <main>
                    <h4>{user.username} {
                        !!geolocation ?
                            <button className='trashButton' onClick={locationHandler}>
                                <TiLocation size='16px' color='#ffffff' />
                            </button> :
                            ''
                    }
                    </h4>
                    {
                        isEditPost ?
                            <form className='paragraph'>
                                <textarea disabled={disableEditPost} ref={textRef} onChange={(e) => setPostText(e.target.value)} value={postText} />
                            </form> :
                            <div className='paragraph'>
                                <p>
                                    <ReactHashtag onHashtagClick={hashTag => history.push(`/hashtag/${hashTag.replace(/#/g, "")}`)}>
                                        {text != postText ? text : postText}
                                        <LocationPreview user={user} location={location} />       </ReactHashtag>
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
                            <div onClick={() => { setPreviewHref(link); setShowIframe(true) }} className='link-card'>
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
                                <div className='link-img-container'>
                                    <img alt='link' className='link-img' src={isImg({ img: linkImage }) ? linkImage : BACKGROUND_IMG} />
                                </div>
                            </div>
                    }
                </main>
                {
                    isCurrentUser ?
                        <div className='buttons-trash-edit'>
                            <button className='trashButton' onClick={() => setIsEditPost(!isEditPost)}><Edit size='16px' color='#FFFFFF' /></button>
                            <button className='trashButton' onClick={() => setModalIsOpen(true)}><FaTrash size='16px' color='white' /></button>
                        </div>
                        :
                        ""
                }
                <DeletePostModal state={{ modalIsOpen, setModalIsOpen }} postId={id} posts={posts} setPosts={setPosts} />
                <RepostModal state={{ repostModal, setRepostModal }} postId={id} getNewPosts={getNewPosts} posts={posts} setPosts={setPosts} />
                {!!location ? <LocationPreview user={user.username} setLocation={setLocation} location={location} /> : ''}
            </StyledPost>
            {isCommentSelected ? <Comments userInfo={userInfo} postId={id} authorId={user.id} posts={posts} setPosts={setPosts} /> : ""}
        </>
    )
}
