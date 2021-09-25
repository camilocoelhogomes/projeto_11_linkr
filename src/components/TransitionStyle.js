import { createGlobalStyle } from 'styled-components'

const TransitionStyle = createGlobalStyle`
    .fade-enter {
        transform: translateX(-1000px);
        opacity: 0;
        z-index: 1;
    }
    .fade-enter.fade-enter-active {
        transform: translateX(100px);
        opacity: 0.6;
        transition: all 500ms ease-out;
    }
    .fade-enter-done {
        transform: translateX(0px);
        opacity: 1;
        transition: all 500ms ease-in;
    }
    .fade-exit {
        transform: translateX(10000px);
    }

`
export default TransitionStyle;