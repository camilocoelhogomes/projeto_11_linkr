import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { sharePost } from '../services/API';

Modal.setAppElement(document.getElementById('root'));
export default function RepostModal({ state, postId, getNewPosts, posts, setPosts }) {
    const { repostModal, setRepostModal } = state;
    const [isLoading, setIsLoading] = useState(false);

    const customStyles = {
        overlay: { background: "rgba(255, 255, 255, 0.9)" },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "597px",
            height: "210px",
            background: "#333333",
            borderRadius: "20px",
            padding: "0",
        },
    };

    const repost = () => {
        setIsLoading(true);
        const token = JSON.parse(localStorage.getItem("user")).token;
        sharePost({ token, postId })
            .then(res => {
                const newPosts = posts.map(post => {
                    if(post.id === postId) {
                        post.repostCount++;
                        return post;
                    } else {
                        return post;
                    }
                })
                setPosts(newPosts);
                getNewPosts();
                setIsLoading(false);
                setRepostModal(false);
            })
            .catch(() => alert("Unable to share post!"))
    }

    return (
        <Modal isOpen={repostModal} style={customStyles}>
            <strong><Text>Do you want to re-post this link?</Text></strong>
            <Options>
                {isLoading ? <StyledLoadingText>Loading...</StyledLoadingText> :
                    <>
                        <WhiteButton onClick={() => setRepostModal(false)}>No, cancel</WhiteButton>
                        <BlueButton onClick={repost}>Yes, share!</BlueButton>
                    </>
                }
            </Options>
        </Modal>
    );
};

const Text = styled.h1`
    font-family: "Lato",sans-serif;
    font-size: 32px;
    line-height: 41px;
    text-align: center;
    width: 358px;
    height: 82px;
    color: #FFFFFF;
    margin: 25px auto 30px;
`
const StyledLoadingText = styled.h1`
    font-family: "Lato",sans-serif;
    font-size: 32px;
    width: 358px;
    color: #FFFFFF;
    margin: 0 auto;
`
const Options = styled.div`
    display:flex;
    width: 300px;
    justify-content:space-between;
    margin:0 auto;

    button{
        width: 134px;
        height: 37px;
        border-radius: 5px;
        border:none;
        font-weight:bold;
        font-size: 18px;
        font-family: "Lato",sans-serif;
}
`
const WhiteButton = styled.button`
    background: #FFFFFF;
    color: #1877F2;
    :hover {
        opacity: 0.8;
    }
    :active {
        transform: translateY(-3px);
    }
`
const BlueButton = styled.button`
    background: #1877F2;
    color: #FFFFFF;
    :hover {
        opacity: 0.8;
    }
    :active {
        transform: translateY(-3px);
    }
`
