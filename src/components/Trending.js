import { useHistory } from "react-router-dom";
import { getTrendingHashtags } from "../services/API";
import React, { useEffect, useState } from "react";
import { TrendingContainer, TitleBox, Hashtags, HashtagLink, StyledTrendingInput, StyledHashtagPlaceholder } from "./StyledTrending";

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