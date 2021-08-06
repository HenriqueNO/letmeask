import { shade, lighten } from 'polished'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'dark',

  colors: {
    background_100: shade(0.65, '#fff'),
    background_200: shade(0.75, '#fefefe'),
    background_300: shade(0.8, '#f8f8f8'),
    background_400: shade(0.8, '#f4f0ff'),
    background_500: shade(0.8, '#dbdcdd'),

    google_button: shade(0.1, '#ea4335'),

    white_color_100: lighten(0.45, '#B5B5B5'),
    white_color_200: lighten(0.55, '#757575'),
    white_color_300: lighten(0.65, '#363636'),
    white_color_400: lighten(0.75, '#333333'),
    white_color_500: lighten(1.00, '#292929'),

    pink_100: shade(0.1, '#DA4FFE'),
    pink_200: shade(0.1, '#C647E6'),
    pink_300: shade(0.1, '#A53BBF'),
    pink_400: shade(0.1, '#6E2880'),
    pink_500: shade(0.1, '#371440'),

    purple_100: shade(0.1, '#A14BF2'),
    purple_200: shade(0.1, '#9A47E6'),
    purple_300: shade(0.1, '#883FCC'),
    purple_400: shade(0.1, '#6E33A6'),
    purple_500: shade(0.1, '#442066'),

    violet_100: shade(0.1, '#835AFD'),
    violet_200: shade(0.1, '#7652E3'),
    violet_300: shade(0.1, '#6244BD'),
    violet_400: shade(0.1, '#412D7D'),
    violet_500: shade(0.1, '#20163D'),

    violet_dark_100: shade(0.1, '#4B51F2'),
    violet_dark_200: shade(0.1, '#474BE6'),
    violet_dark_300: shade(0.1, '#3F44CC'),
    violet_dark_400: shade(0.1, '#3337A6'),
    violet_dark_500: shade(0.1, '#202266'),

    blue_100: shade(0.1, '#4F81FE'),
    blue_200: shade(0.1, '#4774E6'),
    blue_300: shade(0.1, '#3B61BF'),
    blue_400: shade(0.1, '#284080'),
    blue_500: shade(0.1, '#142040')
  }
}