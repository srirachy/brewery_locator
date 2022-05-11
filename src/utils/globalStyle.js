import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #ffffff;
    font-family: 'Playfair Display', serif;
  }

html{
  overflow-x: hidden;
}
`;

export default GlobalStyle;