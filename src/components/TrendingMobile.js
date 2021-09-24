import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { getTrendingHashtags } from "../services/API";
import React, { useEffect, useState } from "react";

export default function TrendingMobile () {

    const [hashtagsList, setHashtagsList] = useState(null);
    const [searchBoxHashtag, setSearchBoxHashtag] = useState("");
    const history = useHistory();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("user"));
        getTrendingHashtags(userInfo.token).then(ans => {
            setHashtagsList(ans.data.hashtags);
        }).catch(err => {
            alert("Não foi possível obter as trending hashtags do servidor!")
        })
    }, [])

    const search = (event) => {
        if(event.key === 'Enter' && searchBoxHashtag.replace(/\s/g,'').length) {
            history.push(`/hashtag/${searchBoxHashtag}`);       
        }
    }

    if (hashtagsList === null) {
        return (
            <>
            </>
        )
    }

    return (
        <Details>
            <summary>trending</summary>
            <Hashtags>
                {hashtagsList.map((hashtag, i) =>
                    <HashtagLink to={`/hashtag/${hashtag.name}`} id={hashtag.id} key={i}>
                        <li># {hashtag.name}</li>
                    </HashtagLink>
                )}
            </Hashtags>
            <StyledTrendingInput placeholder="type a hashtag" type="search" value={searchBoxHashtag} onChange={e => setSearchBoxHashtag(e.target.value)} onKeyUp={e => search(e)}/>
            <StyledHashtagPlaceholder>#</StyledHashtagPlaceholder>
        </Details>
    )
}

const Hashtags = styled.ul`
    display: flex;
    flex-direction: column;
    padding: 22px 16px;
    gap: 13px;
    font-weight: 700;
`
const HashtagLink = styled(Link)`
    text-decoration: none;
`
const StyledTrendingInput = styled.input`
    height: 35px;
    width: calc(100% - 32px);
    margin-bottom: 15px;
    margin-left: 16px;
    border-radius: 8px;
    background: #252525;
    outline: none;
    color: #ffffff;
    font-size: 16px;
    padding-left: 36px;
    padding-right: 16px;
    border: none;

    ::placeholder {
        color: #575757;
        font-size: 16px;
        font-style: italic;
        border: none;
    }
`
const StyledHashtagPlaceholder = styled.span`
    font-size: 19px;
    font-weight: 700;
    bottom: 23px;
    left: 29px;
    z-index: 3;
    position: absolute;
`

const Details = styled.details`
    display: none;

    @media(max-width:900px){
        display: initial;
        position: fixed;
        top: 65px;
        left: 0;
        background-color: #171717;
        border-radius: 10px;
        width: 230px;

        @keyframes fadeInDown {
            0% {
                opacity: 0;
                transform: translateX(-10em);
            }
            100% {
                opacity: 1;
                transform: translateX(0);
            }
        }
        &:not([open]) { 
            height: 40px; 
        }
        &[open] { 
            animation-name: fadeInDown;
            animation-duration: 0.7s;
        }
        &[open] li{ 
            animation-name: fadeInDown;
            animation-duration: 0.75s;
        }
        summary {
            color: #ffffff;
            font-size: 25px;
            font-weight: bold;
            padding: 6px 15px;
        }
    }
`