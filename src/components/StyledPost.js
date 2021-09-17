import styled from 'styled-components';

const StyledPost = styled.div`
    max-width: 611px;
    background-color: #171717;
    border-radius: 16px;
    display: flex;
    padding: 18px;
    min-height: 276px;
    
    main {
        margin: 0 0 0 18px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
p{
    margin: 7px 0;
}
    a{
        text-decoration: none;
    }

    .link-card{
        width: 503px;
        min-height: 155px;
        border: 1px solid #4D4D4D;
        box-sizing: border-box;
        border-radius: 11px;
        display: flex;
        justify-content: space-between;
        text-decoration: none;
        overflow: hidden;
    }

    .link-text-info{
        width: 100%;
        padding: 20px 24px;
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
        width: 153.44px;
        
    }

    .img-like{
        width: 71px;  
    }

    .likes{
        width:100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 19px 0 0 0;
        flex-direction: column;
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
`;

export default StyledPost;