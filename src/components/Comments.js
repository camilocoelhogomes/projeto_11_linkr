import React from "react";
import styled from "styled-components";
import { IoPaperPlaneOutline } from 'react-icons/io5'

export default function Comments() {
    return(
        <StyledCommentSection>
            <Comment>
                <img src="http://pm1.narvii.com/6434/36a290a925f1ae788e0e545f3e8bfbafcad7e4ff_00.jpg" alt="avatar" />
                <UserInfo>
                    <h4>João Avatares <span>• following</span></h4>
                    <p>Adorei esse post galerinha!</p>
                </UserInfo>
            </Comment>
            <Comment>
                <img src="http://pm1.narvii.com/6434/36a290a925f1ae788e0e545f3e8bfbafcad7e4ff_00.jpg" alt="avatar" />
                <UserInfo>
                    <h4>João Avatares <span>• following</span></h4>
                    <p>Adorei esse post galerinha!</p>
                </UserInfo>
            </Comment>
            <CommentBar>
                <img src="http://pm1.narvii.com/6434/36a290a925f1ae788e0e545f3e8bfbafcad7e4ff_00.jpg" alt="avatar" />
                <input placeholder="write a comment..."/>
                <IoPaperPlaneOutline className="icon"/>
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
    }
`;

const UserInfo = styled.div`
    h4 {
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        color: #F3F3F3;
        font-size: 14px;
    }

    span {
        font-weight: 400;
        color: #565656;
    }

    p {
        font-family: 'Lato', sans-serif;
        font-size: 14px;
        color: #ACACAC;
        margin-top: 8px;
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