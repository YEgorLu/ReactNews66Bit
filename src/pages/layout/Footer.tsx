import {CSSProperties, ReactNode} from "react";
import styles from '../../styles/layout/footer.module.css'
import {useThemeContext} from "../../ThemeContextProvider";
import {useMediaContext} from "../../MediaContextProvider";

export function Footer({children}: {children?: ReactNode | ReactNode[]}){
    const {theme} = useThemeContext();
    const isMobile = useMediaContext()

    const footerMobileStyle: CSSProperties = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '8vh'
    }

    const footerStyle: CSSProperties = {
        background: theme?.mainColor
    }

    return (
        <footer style={isMobile ? footerMobileStyle : footerStyle} className={styles.mainFooter}>
            {children}
        </footer>
    )
}