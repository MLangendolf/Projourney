                                                                                                  
import { createContext, useContext, useEffect, useState } from "react"

// Define the two color themes
const themes = {
  light: 'rgba(65, 98, 88, 0.37)',
  dark: 'rgba(8, 8, 20, 0.4)'
}

interface ThemeContextType {
  theme: string
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(() => {
    // Check for saved theme in localStorage, default to light theme
    const savedTheme = localStorage.getItem("theme")
    return savedTheme || themes.light
  })

  useEffect(() => {
    const root = window.document.documentElement
    // Add a class to the root element based on the current theme
    if (theme === themes.dark) {
      root.classList.remove("light")
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
      root.classList.add("light")
    }
    // Save the current theme to localStorage
    localStorage.setItem("theme", theme)
  }, [theme])

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === themes.light ? themes.dark : themes.light))
  }

  const value = { theme, toggleTheme }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// Custom hook to easily access the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider")
  }
  return context
}
                                                                                                 
                         