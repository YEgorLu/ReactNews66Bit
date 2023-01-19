import {CSSProperties, useEffect, useMemo, useState} from "react";
import {useThemeContext} from "../ThemeContextProvider";
import {Api, Theme, ThemeName} from "../Api";
import styles from '../styles/themePage.module.css'
import {ThemeButton} from "../UI/ThemeButton";
import {useMediaContext} from "../MediaContextProvider";


export function ThemePage({onStart}: {onStart: () => void}) {
    const {setTheme} = useThemeContext();
    const [buttons, setButtons] = useState<JSX.Element[]>([]);
    const isMobile = useMediaContext();
    const themes: ThemeName[] = ['dark', 'light', 'blue']

    useEffect(onStart, [])

    const createThemeButtonsMemo = useMemo(async function createThemeButtons() {
        return Promise.all<Promise<Theme>>(themes.map((name: ThemeName) => Api.getTheme(name)))
            .then((themes: Theme[]) => {
                return themes.map((theme: Theme) => {
                    return <ThemeButton key={theme.id} theme={theme} setTheme={setTheme}/>
                })
            })
    }, [])

    useEffect(() => {
        createThemeButtonsMemo
            .then(setButtons);
    }, [])

    const containerMobileStyle: CSSProperties = {
        width: '70%'
    }

    return (
        <div style={isMobile ? containerMobileStyle: {}} className={styles.container}>
            {buttons}
        </div>
    )
}