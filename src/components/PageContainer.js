import styled from "styled-components";

const PageContainer = styled.div`
    margin: 0 auto;
    max-width: 1042px;
    position: relative;
    header {
        width: 100%;
        margin: 125px 0 43px 0;
        display: grid;
        grid-template-areas: 'search-input search-input';
        overflow-wrap:break-word;
        justify-content:space-between;
        h2{
            max-width:60vw;
            justify-content: space-between;
            align-items: center;
            overflow-wrap:break-word;
        }
        div{
            position: initial;
            margin:0 auto 19px;
            grid-area: search-input;
        }
    }
    .posts{
        display: flex;
        flex-direction: column;
        .posts-message {
            margin-bottom: 15px;
        }
    }
    .main-content{
        display: flex;
        justify-content: space-between;
        position: relative;
    }

    .loader {
        text-align: center;
        color: #6D6D6D;
        font-size: 22px;
        margin-bottom: 50px;

        img {
            width: 100px;
            display: block;
            margin: 0 auto;
        }
    }

    @media(max-width: 900px){
        .posts{
            width: 100%;
        }
        header{
            h2{
                margin-left:16px;
            }
            button{
                margin-right:16px;
            }
        }
    }
`;

export { PageContainer }