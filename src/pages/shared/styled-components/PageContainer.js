import styled from "styled-components";

const PageContainer = styled.div`
    margin: 0 auto;
    max-width: 1042px;
    position: relative;
    header {
        width: 100%;
        margin: 125px 0 43px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow-wrap:break-word;
        h2{
            width: 85%;
            justify-content: space-between;
            align-items: center;
            overflow-wrap:break-word;
        }
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

export { PageContainer }