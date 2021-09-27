import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { getComments, postComment, getFollowedUsers } from "../services/API";
import { Link } from "react-router-dom";

export default function Comments({userInfo, postId, authorId, posts, setPosts}) {
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState("");
    const [followedUsers, setFollowedUsers] = useState([]);

    const listFollowedUsers = () => {
        getFollowedUsers(userInfo.token)
            .then(res => setFollowedUsers(res.data.users));
    }
    
    const loadComments = () => {
        listFollowedUsers();
        getComments({token: userInfo.token, postId})
            .then(res => {
                setComments(res.data.comments);
                const newPosts = posts.map(post => {
                    if(post.id === postId) {
                        post.commentCount = res.data.comments.length;
                        return post;
                    } else {
                        return post;
                    }
                })
                setPosts(newPosts);
            });
    }

    const sendComment = (e) => {
        e.preventDefault();
        postComment({token: userInfo.token, body: {"text": userComment}, postId})
            .then(res => {
                loadComments();
                setUserComment("");
            });
    }

    const userType = (userId) => {
        if (userId === authorId) {
            return " • post's author";
        }
        if (followedUsers.find(user => user.id === userId)) {
            return " • following";
        } 
        return "";
    }

    useEffect(loadComments, []);

    return(
        <StyledCommentSection>
            {comments.length === 0 
                ? ""
                :  comments.map(comment => {
                        return (
                            <Comment>
                                <Link to={`/user/${comment.user.id}`}>
                                    <img src={comment.user.avatar} alt="avatar" />
                                </Link>
                                <UserInfo>
                                    <h4>
                                        <Link to={`/user/${comment.user.id}`}>
                                            {comment.user.username}
                                        </Link> 
                                        <span>{userType(comment.user.id)}</span>
                                    </h4>
                                    <p>{comment.text}</p>
                                </UserInfo>
                            </Comment>
                        );
                    })
            } 
            <CommentBar onSubmit={sendComment}>
                <Link to='/my-posts'>
                    <img src={userInfo.user.avatar} alt="avatar" />
                </Link>
                <input 
                    type="text"
                    placeholder="write a comment..."
                    value={userComment}
                    onChange={e => setUserComment(e.target.value)}
                    required
                />
                <IoPaperPlaneOutline className="icon" onClick={sendComment}/>
            </CommentBar>
        </StyledCommentSection>
    );
}

const StyledCommentSection = styled.div`
    min-height: 113px;
    background-color: #1E1E1E;
    border-radius: 16px;
    width: 611px;
    box-sizing: border-box;
    padding: 50px 20px 5px;
    margin-top: -46px;
    margin-bottom: 16px;

    @media(max-width: 900px) {
        width: 100%;
    }
`;

const Comment = styled.div`
    width: 100%;
    display: flex;
    border-bottom: 1px solid #353535;
    padding-bottom: 18px;
    margin-bottom: 20px;

    img {
        width: 39px;
        height: 39px;
        border-radius: 25px;
        margin-right: 14px;
        cursor: pointer;
    }
`;

const UserInfo = styled.div`
    h4 {
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        color: #F3F3F3;
        font-size: 14px;
        cursor: pointer;
        word-break: break-all;
    }

    span {
        font-weight: 400;
        color: #565656;
        cursor: initial;
    }

    p {
        font-family: 'Lato', sans-serif;
        font-size: 14px;
        color: #ACACAC;
        margin-top: 8px;
        word-break: break-all;
    }
`;

const CommentBar = styled.form`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    img {
        width: 39px;
        height: 39px;
        border-radius: 25px;
        margin-right: 14px;
        cursor: pointer;
    }

    input {
        width: 100%;
        height: 39px;
        background-color: #252525;
        border: none;
        border-radius: 8px;
        color: #ACACAC;
        font-size: 14px;
        padding: 0 44px 0 12px;

        :focus {
            outline: none;
        }

        ::placeholder {
            font-family: 'Lato', sans-serif;
            font-style: italic;
            color: #575757;
        }
    }

    .icon {
        font-size: 22px;
        color: #FFFFFF;
        margin-left: -32px;
        cursor: pointer;
    }
`;