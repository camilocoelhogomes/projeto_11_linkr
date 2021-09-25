import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { getTrendingHashtags } from "../services/API";
import React, { useEffect, useState } from "react";

export default function Trending() {

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
            window.scrollTo(0, 0);    
        }
    }

    if (hashtagsList === null) {
        return (
            <>
            </>
        )
    }

    return (
        <TrendingContainer>
            <TitleBox>
                <h3>
                    trending
                </h3>
            </TitleBox>
            <Hashtags>
                {hashtagsList.map((hashtag, i) =>
                    <HashtagLink to={`/hashtag/${hashtag.name}`} id={hashtag.id} key={i} onClick={() => window.scrollTo(0,0)}>
                        <li># {hashtag.name}</li>
                    </HashtagLink>
                )}
            </Hashtags>
            <StyledTrendingInput placeholder="type a hashtag" type="search" value={searchBoxHashtag} onChange={e => setSearchBoxHashtag(e.target.value)} onKeyUp={e => search(e)}/>
            <StyledHashtagPlaceholder>#</StyledHashtagPlaceholder>
        </TrendingContainer>
    )
}

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