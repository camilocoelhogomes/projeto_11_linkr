import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement(document.getElementById('root'));
export default function DeletePostModal({ state }) {
    const { modalIsOpen, setModalIsOpen } = state;

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

    return (
        <Modal isOpen={modalIsOpen} style={customStyles} >
            <strong><Text>Tem certeza que deseja excluir essa publicação?</Text></strong>
            <Options>
                <WhiteButton onClick={() => setModalIsOpen(false)}>Não, voltar</WhiteButton>
                <BlueButton onClick={() => setModalIsOpen(false)}>Sim, excluir</BlueButton>
            </Options>
        </Modal>
    );
};

const Text = styled.h1`
    font-family: "Lato",sans-serif;
    font-size: 34px;
    line-height: 41px;
    width: 358px;
    height: 82px;
    color: #FFFFFF;
    margin: 40px auto;
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
