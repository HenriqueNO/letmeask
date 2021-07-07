import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    background: var(--background);
    color: var(--white-color-500);
  }

  body, input, button, textarea {
    font: 400 16px "Roboto", sans-serif;
  }

  :root {
    --background: ${props => props.theme.colors.background};
    --background-light: ${props => props.theme.colors.background_light};
    --background-question: ${props => props.theme.colors.background_question};
    --background-question-highlight: ${props => props.theme.colors.background_question_highlight};
    --background-question-answered: ${props => props.theme.colors.background_question_answered};

    --google-button: ${props => props.theme.colors.google_button};

    --white-color-100: ${props => props.theme.colors.white_color_100};
    --white-color-200: ${props => props.theme.colors.white_color_200};
    --white-color-300: ${props => props.theme.colors.white_color_300};
    --white-color-400: ${props => props.theme.colors.white_color_400};
    --white-color-500: ${props => props.theme.colors.white_color_500};
    
    --pink-100: ${props => props.theme.colors.pink_100};
    --pink-200: ${props => props.theme.colors.pink_200};
    --pink-300: ${props => props.theme.colors.pink_300};
    --pink-400: ${props => props.theme.colors.pink_400};
    --pink-500: ${props => props.theme.colors.pink_500};

    --purple-100: ${props => props.theme.colors.purple_100};
    --purple-200: ${props => props.theme.colors.purple_200};
    --purple-300: ${props => props.theme.colors.purple_300};
    --purple-400: ${props => props.theme.colors.purple_400};
    --purple-500: ${props => props.theme.colors.purple_500};

    --violet-100: ${props => props.theme.colors.violet_100};
    --violet-200: ${props => props.theme.colors.violet_200};
    --violet-300: ${props => props.theme.colors.violet_300};
    --violet-400: ${props => props.theme.colors.violet_400};
    --violet-500: ${props => props.theme.colors.violet_500};

    --violet-dark-100: ${props => props.theme.colors.violet_dark_100};
    --violet-dark-200: ${props => props.theme.colors.violet_dark_200};
    --violet-dark-300: ${props => props.theme.colors.violet_dark_300};
    --violet-dark-400: ${props => props.theme.colors.violet_dark_400};
    --violet-dark-500: ${props => props.theme.colors.violet_dark_500};

    --blue-100: ${props => props.theme.colors.blue_100};
    --blue-200: ${props => props.theme.colors.blue_200};
    --blue-300: ${props => props.theme.colors.blue_300};
    --blue-400: ${props => props.theme.colors.blue_400};
    --blue-500: ${props => props.theme.colors.blue_500};
  }
`