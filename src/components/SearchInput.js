import { DebounceInput } from 'react-debounce-input';
import React, { useState } from "react";
import { searchUsers, getFollowedUsers } from '../services/API';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function SearchInput({ parent }) {
    const [usersLists, setUsersLists] = useState([]);
    const [followedList, setFollowedList] = useState([]);
    const token = JSON.parse(localStorage.getItem("user")).token;

    getFollowedUsers(token).then(res => {
        const idList = [];
        res.data.users.forEach(user => idList.push(user.id))
        setFollowedList(idList)
    });

    function search(value) {
        if (!value) setUsersLists([]);
        const username = value;
        searchUsers({ token, username }).then(res => {
            const users = res.data.users;
            users.sort((a, b) => {
                if (followedList.includes(a.id)) return -1;
                return 1;
            });
            setUsersLists(users);
        });
    }

    return (
        <StyledSearchBox parent={parent} >
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
                            {followedList.includes(id) ?
                                <span>• following</span> : ""
                            }
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
        padding:16px;
        z-index:1;
    }
    ul{
        width: 563px;
        background: #E7E7E7;
        border-radius: 0 0 8px 8px;
        margin-top:-8px;
    }
    li{
        overflow: hidden;
        display: flex;
        margin: 16px;
        align-items: center;
        h1{
            font-size: 19px;
            font-family: 'lato', sans-serif;
            color: #515151;
            margin-left:16px;
            margin-right:8px;
            width:50%;
            overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        }
        img{
            width: 39px;
            height: 39px;
            border-radius:50%;
            
        }
        span{
            font-size: 19px;
            font-family: 'lato', sans-serif;
            color: #C5C5C5;
        }
    }
    ${props => props.parent === 'header' ?
    `@media (max-width: 900px){
        display:none;
    }`
    :
    `@media (min-width: 900px){
        display:none;
    }
    width:93%;
    `
}
`