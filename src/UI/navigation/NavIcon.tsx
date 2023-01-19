import styles from '../../styles/UI/navIcon.module.css'
import {useThemeContext} from "../../ThemeContextProvider";

type NavIconProps = {
    active: boolean;
    toggleActive: () => void
}

export function NavIcon({toggleActive, active}: NavIconProps) {
    const {theme} = useThemeContext();
    const bgStyle = {
        background: theme?.secondColor
    }

    const barStyle = {
        background: theme?.textColor
    }


    return (
        <div style={bgStyle} className={`${styles.navBg} ${active ? styles.active : ''}`} onClick={toggleActive}>
            <div style={barStyle} className={[styles.bar, styles.topBar].join(' ')}></div>
            <div style={barStyle} className={[styles.bar, styles.middleBar].join(' ')}></div>
            <div style={barStyle} className={[styles.bar, styles.bottomBar].join(' ')}></div>
        </div>
    )
}