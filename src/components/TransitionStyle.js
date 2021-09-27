import { createGlobalStyle } from 'styled-components'

const TransitionStyle = createGlobalStyle`
    .fade-drop-enter {
        transform: translateY(-1000px);
        opacity: 0;
        z-index: 1;
    }
    .fade-drop-enter.fade-drop-enter-active {
        transform: translateY(100px);
        opacity: 0.6;
        transition: all 500ms ease-out;
    }
    .fade-drop-enter-done {
        transform: translateY(0px);
        opacity: 1;
        transition: all 500ms ease-in;
    }
    .fade-drop-exit {
        transform: translateX(10000px);
    }
`
export default TransitionStyle;