import React, { useContext } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from "react-icons/ai";
import GoogleMapReact from 'google-map-react';
import { TiLocation } from "react-icons/ti";
import LinkContext from '../store/LinkContext';
const LocationPreview = () => {
    const { location, setLocation, userLocation } = useContext(LinkContext);
    const center = {
        lat: Number(location.latitude),
        lng: Number(location.longitude)
    }
    return (
        <StyledLinkPreview>
            <div className='preview-box'>
                <div className='preview-header'>
                    <h2>{userLocation}'s location</h2>
                    <button onClick={() => { setLocation(null); }} className='close-link-preview'><AiOutlineClose /></button>
                </div>
                <div className='frame-preview'>
                    <GoogleMapReact
                        defaultCenter={center}
                        defaultZoom={15}
                    >
                        <TiLocation
                            lat={center.lat}
                            lng={center.lng}
                            text={userLocation}
                            size='32px'
                            color='#ff0000'
                        />
                    </GoogleMapReact>
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
        height: 354px;
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
        width: 100%;
    }

    @media(max-width: 600px){
        .preview-box{
            width: 100%;
            border-radius: 0px;
            height: 100vh;
        }
    }
`;