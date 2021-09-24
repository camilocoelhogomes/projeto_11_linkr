import { createGlobalStyle } from 'styled-components'

const TransitionStyle = createGlobalStyle`
    .fade-enter {
        transform: translateY(-1000px);
        z-index: 5;
    }
    .fade-enter.fade-enter-active {
        transform: translateY(100px);
        transition: transform 500ms ease-out;
    }
    .fade-enter-done {
        transform: translateY(0px);
        transition: transform 500ms ease-in;
    }

    .fade-exit {
        z-index: 6;
        transform: translateY(-10000px);
    }
`

export default TransitionStyle;