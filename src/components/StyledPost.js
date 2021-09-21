import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const StyledPost = styled.div`

    span {
        :hover{
            cursor: pointer;
        }
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

        &:hover{
            cursor: pointer;
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
        :hover{
            cursor: pointer;
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
`
const EmptyHeart = styled(AiOutlineHeart)`
    font-size: 30px;
    color: #FFFFFF;
    cursor: pointer;

`
const LikesNumber = styled.p`
    font-size: 11px;
`
const ErrorMessage = styled.span`
    position: absolute;
    height: 30px;
    background-color: #000000;
    border-radius: 5px;
    border: 1px solid #ffffff;
    left: 5px;
    top: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    span {
        color: #f97a7a;
        font-size: 14px;
    }
`

export { StyledPost, LikesBox, LikedHeart, EmptyHeart, LikesNumber, ErrorMessage };