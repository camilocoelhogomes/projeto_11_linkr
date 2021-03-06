import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import TrendingMobile from "./TrendingMobile";
import SearchInput from "./SearchInput";

export default function Header() {
    const [isSelected, setIsSelected] = useState(false);
    const history = useHistory();
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (!userInfo) {
        history.push("/");
    }

    const toggleMenu = (isBlur) => {
        if (isBlur) {
            if (isSelected) {
                return setIsSelected(() => !isSelected);
            } else {
                return;
            }
        }
        setIsSelected(() => !isSelected);
    }

    const goToPage = (page) => {
        setIsSelected(false);
        if (page === '/') {
            setTimeout(() => localStorage.removeItem("user"), 800);
        } 
        history.push(page);
        window.scrollTo(0,0);
    }

    return (
        <>
        {userInfo ? (
            <HeaderContainer>
            <Link to='/timeline' onClick={() => window.scrollTo(0,0)}>
                <h1 className="site-name">linkr</h1>
            </Link>
            <TrendingMobile />
            <SearchInput parent='header' />
            <Menu onBlur={() => toggleMenu(true)}>
                {isSelected
                    ? <ArrowUp onClick={() => toggleMenu(false)} />
                    : <ArrowDown onClick={() => toggleMenu(false)} />
                }
                <img onClick={() => toggleMenu(false)} src={userInfo.user.avatar} alt="avatar" />
                {isSelected
                    ? <ul>
                        <li onClick={() => goToPage('/my-posts')}>My posts</li>
                        <li onClick={() => goToPage('/my-likes')}>My likes</li>
                        <li onClick={() => goToPage('/')} className="logout">Logout</li>
                    </ul>
                    : ""
                }
            </Menu>
        </HeaderContainer>
        ) : (
            <Redirect to="/"></Redirect>
        )}
    </>
    );
}

const HeaderContainer = styled.header`
    width: 100%;
    height: 72px;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #151515;
    padding: 0 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    z-index: 3;

    h1 {
        font-family: 'Passion One', cursive;
        font-size: 49px;
        color: #FFFFFF;
        letter-spacing: 0.05em;
    }
    .site-name {
        :hover {
            opacity: 0.8;
        }
        :active {
            transform: translateY(-3px);
        }
    }
    @media(min-width:900px){
        .desktop-input{
            display:none;
        }
    }
`;

const Menu = styled.button`
    background-color: inherit;
    border: none;
    display: flex;
    align-items: center;
    position: relative;
    
    img {
        width: 53px;
        height: 53px;
        border-radius: 27px;
        cursor: pointer;
    }

    ul {
        width: 150px;
        height: 109px;
        position: absolute;
        bottom: -109px;
        right: -20px;
        background-color: #171717;
        border-bottom-left-radius: 20px;
        .logout {
            :hover {
                color: red;
                opacity: 0.8;
            }
        }
    }

    li {
        font-size: 17px;
        font-weight: 700;
        color: #FFFFFF;
        letter-spacing: 0.05em;
        font-family: 'Lato', sans-serif;
        margin-top: 10px;
        cursor: pointer;
        :hover {
            color: #1877F2;
        }
        :active {
            transform: translateY(-3px);
        }
    }
`;

const ArrowDown = styled(FiChevronDown)`
    display: block;
    color: #FFFFFF;
    font-size: 35px;
    margin-right: 10px;
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`;

const ArrowUp = styled(FiChevronUp)`
    display: block;
    color: #FFFFFF;
    font-size: 35px;
    margin-right: 10px;
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`;