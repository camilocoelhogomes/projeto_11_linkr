import { DebounceInput } from 'react-debounce-input';
import React, { useEffect, useState } from "react";
import { searchUsers, getFollowedUsers } from '../services/API';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

export default function SearchInput({ parent }) {
    const [user, setUser] = useState('');
    const [usersLists, setUsersLists] = useState([]);
    const [followedList, setFollowedList] = useState([]);
    const token = JSON.parse(localStorage.getItem("user")).token;

    getFollowedUsers(token).then(res => {
        const idList = [];
        res.data.users.forEach(user => idList.push(user.id))
        setFollowedList(idList)
    });

    
    useEffect(() => {
        if (!user) setUsersLists([]);
        const username = user;
        searchUsers({ token, username }).then(res => {
            const users = res.data.users;
            users.sort((a, b) => {
                if (followedList.includes(a.id)) return -1;
                return 1;
            });
            setUsersLists(users);
        });
    }, [user])


    return (
        <StyledSearchBox parent={parent} >
            <div class="input-box">
                <DebounceInput
                    placeholder='Search for people and friends'
                    style={{ height: "45px", borderRadius: "8px 0 0 8px" }}
                    minLength={3}
                    debounceTimeout={300}
                    value={user}
                    onChange={event => setUser(event.target.value)}
                />
                <div className='search-icon' >
                    <AiOutlineSearch
                        color="#C6C6C6"
                        size='24px'
                    />
                </div>
            </div>
            <ul>
                {usersLists.map(({ id, avatar, username }, i) => (
                    <Link to={`/user/${id}`} key={i} >
                        <li onClick={()=>setUser('')}>
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

    @media (max-width: 900px) {
        width: calc(100vw - 40px);
    }

    .input-box {
        width:100%;
        display: flex;
        margin: 0;

        div {
            background-color:#fff;
            width:10%;
            border-radius: 0 8px 8px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            margin:0;
            z-index:1;
        }
    }

    input{
        color: #515151;
        font-size: 19px;
        font-family: 'lato', sans-serif;
        border:none;
        padding:16px;
        z-index:1;
        height: 45px;
        border-radius: 8px 0 0 8px;
        width:90%;
        outline: none;

        ::placeholder {
            color: #C6C6C6;
        }
    }

    ul {
        width: 100%;
        background: #E7E7E7;
        border-radius: 0 0 8px 8px;
        margin-top:-8px;
    }
    
    li {
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
            max-width: calc(100% - 180px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        img {
            width: 39px;
            height: 39px;
            border-radius:50%;
        }

        span {
            font-size: 19px;
            font-family: 'lato', sans-serif;
            color: #C5C5C5;
            margin-left: 5px;
            width: 100px;

            @media (max-width: 900px) {
                font-size: 17px;
                width: 90px;
            }
        }
    }

    ${props => props.parent === 'header' ?
        `@media (max-width: 900px){
            display:none;
        }`
        :
        `@media (min-width: 900px){
            display:none;
        }`
    }
`