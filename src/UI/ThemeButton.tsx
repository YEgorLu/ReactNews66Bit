import styles from "../styles/themePage.module.css";
import {Theme, ThemeName} from "../Api";
import React, {CSSProperties} from "react";
import {useMediaContext} from "../MediaContextProvider";


export const ThemeButton = React.memo(({
                                           theme,
                                           setTheme,
                                       }: { theme: Theme, setTheme: (name: ThemeName) => void }) => {
    const isMobile = useMediaContext()

    const buttonMobileStyle: CSSProperties = {
        padding: '50px',
        fontSize: '1rem'
    }

    const buttonStyle: CSSProperties = {
        color: theme.textColor,
        background: theme.secondColor,
        borderColor: theme.mainColor
    }

    return (
        <button key={theme.id} style={isMobile ? {...buttonStyle, ...buttonMobileStyle} : buttonStyle}
                className={styles.themeButton}
                onClick={() => setTheme(theme.name)}>
            {theme.title}
        </button>
    )
}, (prevProps: { theme: Theme, setTheme: (name: ThemeName) => void },
    nextProps: { theme: Theme, setTheme: (name: ThemeName) => void }) => {
    for (const [key, value] of Object.entries(prevProps.theme)) {
        if (nextProps.theme[key as keyof Theme] !== value)
            return false
    }
    return true;
})