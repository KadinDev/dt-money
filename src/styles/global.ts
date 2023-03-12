import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    // tudo que estiver em foco quando clicar (botões, inputs, etc),
    // o navegador por padrão coloca alguma coisa, aqui seto o que quero colocar quando houver foco
    :focus { 
        outline: 0;
        box-shadow: 0 0 0 2px ${props => props.theme['green-500']};
    }

    body {
        background-color: ${props => props.theme['gray-800']};
        color: ${props => props.theme['gray-100']};
        -webkit-font-smoothing: antialiased; // para deixar a font melhor
    }

    body, input, textarea, button {
        font: 400 1rem Roboto, sans-serif;
    }
`