import {Nav} from "../../UI/navigation/Nav";
import styles from "../../styles/layout/header.module.css"
import {useThemeContext} from "../../ThemeContextProvider";
import {TitleName} from "../../App";
import {CSSProperties} from "react";
import {useMediaContext} from "../../MediaContextProvider";

export function Header({title}: {title: TitleName}){
    const {theme} = useThemeContext();
    const isMobile = useMediaContext()

    const headerMobileStyle: CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '8vh'
    }

    const headerStyle: CSSProperties = {
        background: theme?.mainColor
    }

    const textStyle: CSSProperties = {
        color: theme?.textColor,
        gridColumn: 2
    }

    return (
        <header style={isMobile ? {...headerStyle, ...headerMobileStyle} : headerStyle} className={styles.mainHeader}>
            {isMobile ||
              <Nav/>
            }
            <p style={textStyle} className={styles.siteName}>{title}</p>
        </header>
    )
}