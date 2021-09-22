import { DebounceInput } from 'react-debounce-input';
import React, { useState } from "react";
import { searchUsers, getFollowedUsers } from '../services/API';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function SearchInput() {
    const [usersLists, setUsersLists] = useState([]);
    const token = JSON.parse(localStorage.getItem("user")).token;

    function search(value) {
        if (!value) setUsersLists([]);
        const username = value;
        getFollowedUsers(token).then(res => console.log(res)).catch(err => console.log(err));
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
                {usersLists.map(({ id, avatar, username }, i) => (
                    <Link to={`/user/${id}`} key={i} >
                        <li>
                            <img src={avatar} alt={"avatar"} />
                            <h1>{username}</h1>
                        </li>
                    </Link>
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
        z-index:1;
    }
    ul{
        width: 563px;
        background: #E7E7E7;
        border-radius: 0 0 8px 8px;
        margin-top:-8px;
    }
    li{
        display: flex;
        margin: 16px 0 0 16px;
        align-items: center;
        :last-child{
            margin-bottom:16px;
        }
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