import GlobalStyles from '../styles/globals'

import '../services/firebase'
import { AuthProvider } from '../contexts/AuthContext'
import { ThemeContextProvider } from '../contexts/ThemeContext'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeContextProvider>
  )
}

export default MyApp
