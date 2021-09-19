import styled from "styled-components";
import { Link } from "react-router-dom";
import { getTrendingHashtags } from "../services/API";
import React, { useEffect, useState } from "react";

export default function Trending() {

    const [hashtagsList, setHashtagsList] = useState(null);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("user"));
        getTrendingHashtags(userInfo.token).then(ans => {
            setHashtagsList(ans.data.hashtags);
        }).catch(err => {
            alert("Não foi possível obter as trending hashtags do servidor!")
        })
    }, [])

    if (hashtagsList === null) {
        return (
            <>
            </>
        )
    }

    return (
        <>
        <TrendingContainer>
            <TitleBox>
                <h3>
                    trending
                </h3>
            </TitleBox>
            <Hashtags>
                {hashtagsList.map((hashtag, i) =>
                    <HashtagLink to={`/hashtag/${hashtag.name}`} id={hashtag.id} key={i}>
                        <li># {hashtag.name}</li>
                    </HashtagLink>
                )}
            </Hashtags>
        </TrendingContainer>
        <Details>
            <summary>trending</summary>
            <Hashtags className="details-content">
                {hashtagsList.map((hashtag, i) =>
                    <HashtagLink to={`/hashtag/${hashtag.name}`} id={hashtag.id} key={i}>
                        <li># {hashtag.name}</li>
                    </HashtagLink>
                )}
            </Hashtags>
        </Details>
        </>
    )
}

const Details = styled.details`
    display: none;

    @media(max-width:900px){
        display: initial;
        position: fixed;
        top: 65px;
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
const TrendingContainer = styled.div`
    width: 301px;
    background-color: #171717;
    border-radius: 16px;
    height: fit-content;
    position: sticky;
    top: 160px; 
    
    @media(max-width:900px){
        display: none;
    }
`
const TitleBox = styled.div`
    height: 61px;
    border-bottom: 1px solid #484848;
    display: flex;
    align-items: center;
    padding: 0 16px;
`
const Hashtags = styled.ul`
    display: flex;
    flex-direction: column;
    padding: 22px 16px;
    gap: 13px;
`
const HashtagLink = styled(Link)`
    text-decoration: none;
`