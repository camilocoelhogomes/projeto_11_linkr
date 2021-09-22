import { DebounceInput } from 'react-debounce-input';
import React, { useState } from "react";
import { searchUsers } from '../services/API';
import styled from 'styled-components';

export default function SearchInput() {
    const [usersLists, setUsersLists] = useState([]);
    const token = JSON.parse(localStorage.getItem("user")).token;

    function search(value) {
        if (!value) setUsersLists([]);
        const username = value;
        searchUsers({ token, username }).then(res => setUsersLists(res.data.users));
    }

    return (
        <StyledSearchBox>
            <DebounceInput
                placeholder='Search for people and friends'
                style={{ height: "45px", borderRadius: "8px" }}
                minLength={3}
                debounceTimeout={300}
                onChange={event => search(event.target.value)}
            />
            <ul>
                {usersLists.map((user, i) => (
                    <li key={i} >
                        <img src={user.avatar} alt={"avatar"} />
                        <h1>{user.username}</h1>
                    </li>
                ))}
            </ul>
        </StyledSearchBox>
    );

}
const StyledSearchBox = styled.div`
    display:flex;
    flex-direction: column;
    width: 563px;
    position: absolute;
    top:13px;
    left: calc((100% - 563px)/2);
    input{
        color: #C6C6C6;
        font-size: 19px;
        font-family: 'lato', sans-serif;
        border:none;
        padding-left:16px;
    }
    ul{
        width: 563px;
        background: #E7E7E7;
        border-radius: 0 0 8px 8px;
        margin-top:-8px;
        z-index:-1;
        padding-bottom:16px;
    }
    li{
        display: flex;
        margin: 16px 0 0 16px;
        align-items: center;
        h1{
            font-size: 19px;
            font-family: 'lato', sans-serif;
            color: #515151;
            margin-left:16px;
            margin-right:8px;
        }
        img{
            width: 39px;
            height: 39px;
            border-radius:50%;
            
        }
    }
`