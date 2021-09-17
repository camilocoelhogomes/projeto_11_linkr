import styled from 'styled-components'

const StyledTimeLine = styled.div`
    margin: 0 auto;
    max-width: 1042px;
    position: relative;
    header {
        margin: 53px 0 43px 0;
    }
    .posts{
        display: flex;
        flex-direction: column;
        gap: 16px; 
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

export default StyledTimeLine;