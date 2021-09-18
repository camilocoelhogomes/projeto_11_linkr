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
        <Testing>
        <input type="checkbox" id="btnControl"/>
        <label class="btn" for="btnControl">
        <TrendingContainer>
            <TitleBox className="testingtitle">
                <h3>
                    trending
                </h3>
            </TitleBox>
            <Hashtags className="hiddenDiv">
                {hashtagsList.map((hashtag, i) =>
                    <HashtagLink to={`/hashtag/${hashtag.name}`} id={hashtag.id} key={i}>
                        <li># {hashtag.name}</li>
                    </HashtagLink>
                )}
            </Hashtags>
        </TrendingContainer>
        </label>
        {/* <Details>
            <summary>trending</summary>
            <Hashtags>
                {hashtagsList.map((hashtag, i) =>
                    <HashtagLink to={`/hashtag/${hashtag.name}`} id={hashtag.id} key={i}>
                        <li># {hashtag.name}</li>
                    </HashtagLink>
                )}
            </Hashtags>
        </Details> */}
        </Testing>
    )
}

// const Details = styled.details`
//     display: none;

//     @media(max-width:900px){
//         display: initial;
//         position: fixed;
//         top: 80px;
//         background-color: #000000;
//         border-radius: 10px;
//         width: 301px;
//         transition: height 0.5s ease-out;
//         &:not([open]) { height: 40px; }
//         &[open] { 
//             height: fit-content;
//         }
//         summary {
//             color: #ffffff;
//             font-size: 25px;
//             font-weight: bold;
//             padding: 6px 15px;
//         }
//     }
// `

const Testing = styled.div`

    @media(max-width:900px){
            position: fixed;
            top: 60px;
            width: fit-content;

            #btnControl {
                display: none;
            }
            #btnControl:not(:checked) + label > div {
                .testingtitle {
                    border: none;
                }
                .hiddenDiv {
                    transition: 1s ease-in;
                    transform: translateX(-300px);
                    height: -10px;
                }
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