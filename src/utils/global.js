import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html {
    --color-white: ${(props) => props.theme.colors.white};
    --color-dark: ${(props) => props.theme.colors.dark};
    --color-grey: ${(props) => props.theme.colors.grey};
    --color-blue: ${(props) => props.theme.colors.blue};
    --color-lightBlue: ${(props) => props.theme.colors.lightBlue};
    --color-black: ${(props) => props.theme.colors.black};
    --color-red: ${(props) => props.theme.colors.red};
    --color-green: ${(props) => props.theme.colors.green};
    --color-sky: ${(props) => props.theme.colors.sky};
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }

    code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    } 
`;
