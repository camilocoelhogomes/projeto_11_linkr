import styled from "styled-components";
import {FiChevronDown} from 'react-icons/fi';
import {FiChevronUp} from 'react-icons/fi';
import { useState } from "react";

export default function Headers() {
    const [isSelected, SetIsSelected] = useState(false);

    const toggleMenu = () => {
        SetIsSelected(() => !isSelected);
    }

    return (
        <HeaderContainer>
            <h1>linkr</h1>
            <Menu>
                {isSelected 
                ? <ArrowUp onClick={toggleMenu} /> 
                : <ArrowDown onClick={toggleMenu} />
                }
                <img onClick={toggleMenu} src="https://pm1.narvii.com/6434/36a290a925f1ae788e0e545f3e8bfbafcad7e4ff_hq.jpg" />
                {isSelected 
                ?   <ul>
                        <li>My posts</li>
                        <li>My likes</li>
                        <li>Logout</li>
                    </ul> 
                : ""
                }
            </Menu>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.header`
    width: 100%;
    height: 72px;
    position: fixed;
    position: relative;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #151515;
    padding: 0 20px;

    h1 {
        font-size: 49px;
        color: #FFFFFF;
        letter-spacing: 0.05em;


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
    }

    li {
        font-size: 17px;
        font-weight: 700;
        color: #FFFFFF;
        letter-spacing: 0.05em;
        font-family: 'Lato', sans-serif;
        margin-top: 10px;
        cursor: pointer;
    }
`;

const ArrowDown = styled(FiChevronDown)`
    display: block;
    color: #FFFFFF;
    font-size: 35px;
    margin-right: 10px;
    cursor: pointer;
`;

const ArrowUp = styled(FiChevronUp)`
    display: block;
    color: #FFFFFF;
    font-size: 35px;
    margin-right: 10px;
    cursor: pointer;
`;