import React, { useState } from "react";
import styled from "styled-components";
import { publishPost } from "../../services/API";
import hashtagsToLowerCase from "../../services/hashtagsMask";
import { VscLocation } from "react-icons/vsc";
import SmallAlert from "../../components/SmallAlert";

export default function Publish({ loadPosts }) {
    const [text, setText] = useState("");
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const [isLocation, setIsLocation] = useState(false);
    const [unableLocation, setUnableLocation] = useState(false);
    const [userLocation, setUserLocation] = useState(null);

    const publish = (e) => {
        e.preventDefault();
        setLoading(true);
        const newText = hashtagsToLowerCase(text);
        const body = { "text": newText, "link": link };
        publishPost({ token: userInfo.token, body })
            .then(() => {
                setLoading(false);
                setText("");
                setLink("");
                loadPosts();
            })
            .catch(() => {
                setLoading(false);
                alert("Houve um erro ao publicar seu link");
            });
    }

    const getLocation = (e) => {
        e.preventDefault();

        const isNotLocation = () => {
            setUnableLocation(true);
            setIsLocation(false);
            setUserLocation(null);
            setTimeout(() => setUnableLocation(false), 2000);
        }

        if (isLocation) {
            isNotLocation();
        }

        if (!('geolocation' in navigator)) {
            isNotLocation();
            return;
        }

        const success = (position) => {
            const location = {
                accuracy: 1392,
                altitude: null,
                altitudeAccuracy: null,
                heading: null,
                latitude: -20.3596647,
                longitude: -41.95889,
                speed: null,
            }
            setUserLocation(location);
            setIsLocation(true);
        };

        navigator.geolocation.getCurrentPosition(success, isNotLocation);
    }

    return (
        <PublishContainer>
            <img src={userInfo.user.avatar} alt="avatar" />
            <MessageBox loading={loading} isLocation={isLocation}>
                <h2>O que você tem pra favoritar hoje?</h2>
                <form onSubmit={publish}>
                    <input
                        type="url"
                        placeholder="http://..."
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        required
                    >
                    </input>
                    <textarea
                        placeholder="Muito irado esse link falando de #javascript"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    >
                    </textarea>
                    <div className='buttons'>
                        <div onClick={getLocation} className='location'>
                            <VscLocation size='16px' />{isLocation ? 'Localização Ativada' : 'Localização Desativada'}
                            {unableLocation ? <SmallAlert errorMessage={'Não foi possível exibir a localização'} left={'0'} top={'26px'} /> : <></>}
                        </div>
                        <button className='publish' type="submit">
                            {loading
                                ? "Publishing..."
                                : "Publish"
                            }
                        </button>
                    </div>
                </form>
            </MessageBox>
        </PublishContainer>
    );
}

const PublishContainer = styled.div`
    position: relative;
    width: 611px;
    min-height: 209px;
    background-color: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    padding: 18px;

    img {
        width: 50px;
        height: 50px;
        border-radius: 27px;
        margin-right: 18px;
    }

    @media(max-width: 900px) {
        width: 100%;
        border-radius: 0;

        img {
            display: none;
        }
    }
`;

const MessageBox = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

    h2 {
        font-size: 20px;
        color: #707070;
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        margin: 8px 0 15px;
    }

    input {
        display: block;
        width: 100%;
        min-height: 30px;
        background-color: #EFEFEF;
        border-radius: 5px;
        border: none;
        margin-top: 5px;
        text-align: start;
        padding-left: 12px;
        font-family: 'Lato', sans-serif;
        color: #666666;
        pointer-events: ${({ loading }) => loading ? 'none' : 'all'};
        opacity: ${({ loading }) => loading ? 0.7 : 1};
        

        ::placeholder {
            font-weight: 300;
            color: #949494;
        }

        :focus {
            outline: none;
        }
    }

    textarea {
        resize: none;
        display: block;
        width: 100%;
        min-height: 66px;
        background-color: #EFEFEF;
        border-radius: 5px;
        border: none;
        margin-top: 5px;
        padding-left: 12px;
        padding-top: 8px;
        font-family: 'Lato', sans-serif;
        color: #666666;
        pointer-events: ${({ loading }) => loading ? 'none' : 'all'};
        opacity: ${({ loading }) => loading ? 0.7 : 1};
        
        ::placeholder {
            font-weight: 300;
            color: #949494;
        }

        :focus {
            outline: none;
        }
    }

    .buttons{
        width: 100%;
        position: absolute;
        right: 0;
        display: flex;
        justify-content: space-between;
    }

    .location{
        border: none;
        background-color: inherit;
        font-family: 'Lato';
        font-size: 13px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color:${({ isLocation }) => isLocation ? '#238700' : '#949494'};
        position: relative;
    }

    .publish {
        width: 112px;
        height: 31px;
        background-color: #1877F2;
        border-radius: 5px;
        border: none;
        font-family: 'Lato', sans-serif;
        color: #FFFFFF;
        font-weight: 700;
        margin-top: 5px;
        cursor: pointer;
        opacity: ${({ loading }) => loading ? 0.7 : 1};
        pointer-events: ${({ loading }) => loading ? 'none' : 'all'};
    }

    @media(max-width: 900px) {
        text-align: center;
    }
`;
