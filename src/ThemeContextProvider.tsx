import React, {ReactElement, useContext, useEffect, useState} from "react";
import {Api, Theme, ThemeName} from "./Api";

const ThemeContext = React.createContext<{ theme: Theme | undefined, setTheme: (name: ThemeName) => void }>({
    theme: undefined,
    setTheme: () => null
});

function isTheme(t: any): t is Theme {
    return !(!('id' in t) || !('name' in t) || !('mainColor' in t) ||
        !('textColor' in t) || !('title' in t) || !('secondColor' in t));

}

export function ThemeContextProvider({children}: { children: ReactElement | ReactElement[] }) {
    const [theme, setTheme] = useState<Theme>()

    useEffect(() => {
        (async () => {
                const lastTheme = JSON.parse(localStorage.getItem('lastTheme') || '{}');
                if (lastTheme && isTheme(lastTheme)) {
                    setTheme(lastTheme)
                } else
                    setTheme(await Api.getTheme('dark'));
            }
        )()
    }, [])

    useEffect(() => {
        localStorage.setItem('lastTheme', JSON.stringify(theme || ''))
    }, [theme])

    return (
        <ThemeContext.Provider
            value={{theme: theme, setTheme: (name: ThemeName) => (async () => setTheme(await Api.getTheme(name)))()}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => useContext(ThemeContext);