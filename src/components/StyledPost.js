import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const StyledPost = styled.div`

    span {
        cursor: pointer;
    }

    background-color: #171717;
    border-radius: 16px;
    width: 611px;
    box-sizing: border-box;
    padding: 18px;
    display: flex;
    white-space: pre-wrap;
    overflow: clip;
    position: relative;
    margin-bottom: 16px;

    h4{
        width: 100%;
    }

    main {
        margin: 0 0 0 18px;
        max-width: calc(100% - 71px);
        width: calc(100% - 71px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        overflow-wrap: break-word;
    }

    .paragraph{
        width: 100%;
        overflow: clip;
        white-space: pre-wrap;
        text-overflow: ellipsis;    
        margin: 10px 0;
    }

    .link-card{
        min-width: 100%;
        min-height: 155px;
        border: 1px solid #4D4D4D;
        box-sizing: border-box;
        border-radius: 11px;
        display: flex;
        justify-content: space-between;
        text-decoration: none;
        overflow: clip;
        text-decoration: none;
        box-sizing: border-box;
        cursor: pointer;
        :hover {
            border: 1px solid gray;
        }
    }

    .link-text-info{
        max-width: 70%;
        padding: 7px 11px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .link-title {
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;
    }

    .link-description{
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
    }   

    .link{
        font-size: 11px;
        line-height: 13px;

        color: #CECECE;
    }

    .link-img{
        border-radius: 0px 12px 13px 0px;
        height: 100%;
        width: 100%;        
    }

    .link-img-container{
        width: 30%;
    }

    .img-like{
        width: 71px; 
        display: flex ;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
    }

    .youtube-video{
        width:501px;
        height:281px;
    }

    .user-img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        :hover {
            opacity: 0.8;
        }
        :active {
            transform: translateY(-3px);
        }
    }

    .like-text{
        font-size: 11px;
        line-height: 13px;
        color: #FFFFFF;
    }

    .buttons-trash-edit{
        height:fit-content;
        position:absolute;
        top:10px;
        right:10px;
        gap:8px;
    }
    .trashButton{
        border:none;
        background:none;
        cursor: pointer;
        :hover {
           opacity: 0.8;
        }
        :active {
            transform: translateY(-3px);
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
        pointer-events: ${({ loading }) => loading ? 'none' : 'all'};
        opacity: ${({ loading }) => loading ? 0.7 : 1};
        
        ::placeholder {
            font-weight: 300;
            color: #949494;
        }

        :focus {
            outline: none;
        }
    }
    @media(max-width: 900px){
        border-radius: 0px;
        width: 100%;
        padding: 14px;

    .img-like{
        width: 50px;  
    }
    
    .user-img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    main{
        margin: 0 0 0 14px;
        max-width: calc(100% - 50px);
        width: calc(100% - 50px);
    }

    .youtube-video{
        width:100%;
        height:initial;
    }

    }
`
const LikesBox = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
`
const LikedHeart = styled(AiFillHeart)`
    font-size: 30px;
    color: #AC0000;
    cursor: pointer;
    :hover {
        opacity: 0.8
    }
    :active {
        transform: translateY(-3px);
    }
`
const EmptyHeart = styled(AiOutlineHeart)`
    font-size: 30px;
    color: #FFFFFF;
    cursor: pointer;
    :hover {
           color: #AC0000;
        }
    :active {
        transform: translateY(-3px);
    }
`
const LikesNumber = styled.p`
    font-size: 11px;
`
const StyledRepostBox = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;

    .icon {
        font-size: 30px;
        color: #FFFFFF;
        margin-top: 15px;
        cursor: pointer;
        :hover {
           opacity: 0.8;
        }
        :active {
            transform: translateY(-3px);
        }
    }

    p {
        font-size: 11px;
        color: #FFFFFF;
        white-space: nowrap;
    }
`
const StyledRepostInfo = styled.div`
    height: 63px;
    background-color: #1E1E1E;
    border-radius: 16px;
    width: 611px;
    box-sizing: border-box;
    padding: 5px 20px;
    display: flex;
    margin-bottom: -30px;
    font-size: 25px;
    color: #FFFFFF;

    p {
        margin-left: 8px;
        margin-top: 6px;
        font-size: 13px;
        font-family: 'Lato', sans-serif;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    @media(max-width: 900px) {
        width: 100%;
    }
`;

export { StyledPost, LikesBox, LikedHeart, EmptyHeart, LikesNumber, StyledRepostBox, StyledRepostInfo };
