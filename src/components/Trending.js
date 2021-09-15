import styled from "styled-components";
import { Link } from "react-router-dom";
import { getTrendingHashtags } from "../services/api.service";
import { useEffect, useState } from "react";


export default function Trending ({userInfo}) {

    //trocar o userInfo pelo objeto ja existente de login do usuario

    const [hashtagsList, setHashtagsList] = useState(null);

    useEffect(() => {
        getTrendingHashtags(userInfo).then(ans => {
            setHashtagsList(ans.data.hashtags);
        }).catch(
            alert("Não foi possível obter as trending hashtags do servidor!")
        )
    }, [])

    if (hashtagsList === null) {
        return(
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
                    <HashtagLink to={`/hashtag/${hashtag.name}`} id={hashtag.id} key={i}>
                        <li># {hashtag.name}</li>
                    </HashtagLink>
                )}

            </Hashtags>
        </TrendingContainer>
    )
}

const TrendingContainer = styled.div`
    width: 301px;
    background-color: #171717;
    border-radius: 16px;
    position: sticky;
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