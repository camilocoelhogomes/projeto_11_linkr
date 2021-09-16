import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Lato&family=Oswald&family=Passion+One&display=swap');
    
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    * {
        box-sizing: border-box;
    }
    body {
        background-color: #333333;
        font-family: 'Lato', sans-serif;
        color: #B7B7B7;
        font-size: 17px;
    }
    strong {
        font-weight: bold;
    }
    li,h1,h2,h3,h4 {
        color: #FFFFFF;
        font-size: 19px;
    }
    h1 {
        font-family: 'Passion One', cursive;
        font-weight: 700;
        font-size: 50px;
    }
    h2 {
        font-family: 'Oswald', sans-serif;
        font-size: 44px;  
        font-weight: 700;
    }
    h3 {
        font-family: 'Oswald', sans-serif;
        font-size: 27px;  
        font-weight: 700;
    }

    @media (max-width: 600px){
        body {
            font-size: 15px;
        }
            h1 {

            font-size: 45px;
        }
        h2 {
            font-size: 33px;  
        }
    }
`

export default GlobalStyle;