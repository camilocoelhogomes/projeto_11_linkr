import React, { useContext } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from "react-icons/ai";
import LinkContext from '../store/LinkContext';
const LinkPreview = () => {
    const { previewHref, setShowIframe } = useContext(LinkContext);

    return <StyledLinkPreview>
        <div className='preview-box'>
            <div className='preview-header'>
                <a href={previewHref} className='new-tab-button' target="_blank" rel="noreferrer">Abrir uma nova Aba</a>
                <button onClick={() => setShowIframe(false)} className='close-link-preview'><AiOutlineClose /></button>
            </div>
            <div className='frame-preview'>
                <iframe src={previewHref}
                    title="iframe Example 1" width="100%" height="100%">
                </iframe>
            </div>
        </div>
    </StyledLinkPreview>
}

export default LinkPreview;

const StyledLinkPreview = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: rgba(255,255,255,0.9);
    position: fixed;
    top: 0;
    left: 0%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;

    .preview-box{
        border-radius: 20px;
        background-color: #333333;
        height: calc(100vh - 120px);
        width: 70vw;
        padding: 18px 22px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        justify-content: space-between;
    }

    .preview-header{
        display: flex;
        justify-content: space-between;
    }

    .new-tab-button{
        background: #1877F2;
        border-radius: 5px;
        width: 138px;
        height: 31px;
        border: none;
        color: #ffffff;
        font-family: 'Lato';
        font-weight: 700;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover{
            cursor: pointer;
        }
    }

    .close-link-preview{
        background-color: inherit;
        font-size: 30px;
        color: #ffffff;
        border: none;
        &:hover{
            cursor: pointer;
        }
    }
    .frame-preview{
        height: calc(100% - 50px);
    }

    @media(max-width: 600px){
        .preview-box{
            width: 100%;
            border-radius: 0px;
            height: 100vh;
        }
    }
`;