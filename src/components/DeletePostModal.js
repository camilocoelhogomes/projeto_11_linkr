import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { deletePost } from '../services/API';

Modal.setAppElement(document.getElementById('root'));
export default function DeletePostModal({ state, postId }) {
    const { modalIsOpen, setModalIsOpen } = state;
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
            height: "262px",
            background: "#333333",
            borderRadius: "50px",
            padding: "0",
        },
    };

    function errorAlert(error) {
        setModalIsOpen(false);
        if (error.status === 403) {
            alert("This post belongs to another user! Can't continue.");
        } else {
            alert("Unable to delete!")
        };
        setIsLoading(false);
    }

    function requestDeletePost() {
        setIsLoading(true);
        const token = JSON.parse(localStorage.getItem("user")).token;
        const request = deletePost({ token, postId });
        request.then(res => {
            setModalIsOpen(false);
            setIsLoading(false);
            window.location.reload();
        });
        request.catch(err => errorAlert(err.response));
    }

    return (
        <Modal isOpen={modalIsOpen} style={customStyles} >
            <strong><Text>Tem certeza que deseja excluir essa publicação?</Text></strong>
            <Options>
                {isLoading ? <StyledLoadingText>Loading...</StyledLoadingText> :
                    <>
                        <WhiteButton onClick={() => setModalIsOpen(false)}>Não, voltar</WhiteButton>
                        <BlueButton onClick={requestDeletePost}>Sim, excluir</BlueButton>
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
    width: 358px;
    height: 82px;
    color: #FFFFFF;
    margin: 40px auto;
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
`
const BlueButton = styled.button`
background: #1877F2;
color: #FFFFFF;
`
