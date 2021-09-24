import { createGlobalStyle } from 'styled-components'

const TransitionStyle = createGlobalStyle`
    .fade-enter {
        opacity: 0;
        z-index: 5;
    }
    .fade-enter.fade-enter-active {
        opacity: 1;
        transition: opacity 1000ms ease-in;
    }
    .fade-exit {
        opacity: 0;
        z-index: 5;
    }
    .fade-exit.fade-exit-active {
        opacity: 0;
        transition: opacity 0ms ease-in;
    }
`

export default TransitionStyle;