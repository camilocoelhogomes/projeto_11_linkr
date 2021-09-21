import styled from "styled-components";

const PageContainer = styled.div`
    margin: 0 auto;
    max-width: 1042px;
    position: relative;
    header {
        margin: 125px 0 43px 0;
        overflow-wrap:break-word;
    }
    .posts{
        display: flex;
        flex-direction: column;
    }

    .main-content{
        display: flex;
        justify-content: space-between;
        position: relative;
    }

    @media(max-width: 900px){
        .posts{
            width: 100%;
        }
    }
`;

export {PageContainer}