import { createContext, useEffect, useState } from "react";
import light from "../styles/theme/light";
import dark from "../styles/theme/dark";
import { ThemeProvider } from 'styled-components'
import Cookies from 'js-cookie'

export const ThemeContext = createContext({} as any);

export function ThemeContextProvider({children}) {
  const [theme, setTheme] = useState(dark)

  function toggleTheme() {
    setTheme(theme.title === 'light' ? dark : light)
  }

  useEffect(() => {
    Cookies.set('lastTheme', theme.title)
  }, [theme])

  return(
    <ThemeContext.Provider value={{toggleTheme, theme}}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}