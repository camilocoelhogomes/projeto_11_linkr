import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from "react-icons/ai";

const LocationPreview = ({ setIsShowLocation, user }) => {

    return (
        <StyledLinkPreview>
            <div className='preview-box'>
                <div className='preview-header'>
                    <h2>{user}'s location</h2>
                    <button onClick={() => setIsShowLocation(false)} className='close-link-preview'><AiOutlineClose /></button>
                </div>
                <div className='frame-preview'>

                </div>
            </div>
        </StyledLinkPreview>
    );
}

export default LocationPreview;

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

    .close-link-preview{
        background-color: inherit;
        font-size: 30px;
        color: #ffffff;
        border: none;
        cursor: pointer;
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