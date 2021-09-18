import styled from 'styled-components';

const StyledPost = styled.div`

    background-color: #171717;
    border-radius: 16px;
    width: 611px;
    box-sizing: border-box;
    padding: 18px;
    display: flex;
    white-space: pre-wrap;
    overflow: clip;

    h4{
        width: 100%;
    }

    main {
        margin: 0 0 0 18px;
        max-width: calc(100% - 71px);
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
        width: 30%;        
    }

    .img-like{
        width: 71px; 
        display: flex ;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
    }

    .likes{
        width:100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 19px 0 0 0;
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
    .trashButton{
        background:none;
        height:fit-content;
        border:none;
    }
    @media(max-width: 900px){
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
    }

    .youtube-video{
        width:100%;
        height:initial;
    }

    }
`;

export default StyledPost;