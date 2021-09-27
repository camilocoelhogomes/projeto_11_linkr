import { useHistory } from "react-router-dom";
import { getTrendingHashtags } from "../services/API";
import React, { useEffect, useState } from "react";
import { Hashtags, HashtagLink, StyledTrendingInput, StyledHashtagPlaceholder, Details } from "./StyledTrending";

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