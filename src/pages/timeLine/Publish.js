import React, { useState } from "react";
import styled from "styled-components";
import { publishPost } from "../../services/API";

export default function Publish({loadPosts}) {
    const [text, setText] = useState("");
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const hashtagsToLowerCase = () => {
        const rule = /([#|＃][^\s]+)/g;
        const newText = text.split(rule).map(chunk => {
            if (chunk.match(rule)) {
                return chunk.toLowerCase();
            }
            return chunk;
        });
        return newText.join("");
    }

    const publish = (e) => {
        e.preventDefault();
        setLoading(true);
        const newText = hashtagsToLowerCase();
        const body = {"text": newText, "link": link};
        publishPost({token: userInfo.token, body})
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

    return(
        <PublishContainer>
            <img src={userInfo.user.avatar} alt="avatar"/>
            <MessageBox loading={loading}>
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
                    <button type="submit">
                        {loading 
                            ? "Publishing..." 
                            : "Publish"
                        }
                    </button>
                </form>
            </MessageBox>
        </PublishContainer>
    );
}

const PublishContainer = styled.div`
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
        pointer-events: ${({loading}) => loading ? 'none' : 'all'};
        opacity: ${({loading}) => loading ? 0.7 : 1};
        

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
        pointer-events: ${({loading}) => loading ? 'none' : 'all'};
        opacity: ${({loading}) => loading ? 0.7 : 1};
        
        ::placeholder {
            font-weight: 300;
            color: #949494;
        }

        :focus {
            outline: none;
        }
    }

    button {
        width: 112px;
        height: 31px;
        position: absolute;
        right: 0;
        background-color: #1877F2;
        border-radius: 5px;
        border: none;
        font-family: 'Lato', sans-serif;
        color: #FFFFFF;
        font-weight: 700;
        margin-top: 5px;
        cursor: pointer;
        opacity: ${({loading}) => loading ? 0.7 : 1};
        pointer-events: ${({loading}) => loading ? 'none' : 'all'};
    }

    @media(max-width: 900px) {
        text-align: center;
    }
`;