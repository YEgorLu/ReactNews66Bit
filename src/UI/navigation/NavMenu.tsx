import styles from '../../styles/UI/navMenu.module.css'
import {Link} from "react-router-dom";
import {CSSProperties} from "react";
import {useThemeContext} from "../../ThemeContextProvider";
import {faNewspaper, faPaintbrush} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useMediaContext} from "../../MediaContextProvider";


type NavMenuProps = {
    hideMenu?: () => void;
}

export function NavMenu({hideMenu}: NavMenuProps) {
    const {theme} = useThemeContext();
    const isMobile = useMediaContext()


    const navBgMobileStyle: CSSProperties = {
        width: '100%',
        height: '100%',
    }
    const navListMobileStyle: CSSProperties = {
        alignItems: 'center',
        flexFlow: 'row'
    }
    const buttonMobileStyle: CSSProperties = {
        width: '6vh',
        height: '6vh',
        lineHeight: '6vh'
    }
    const navBgStyle: CSSProperties = {background: theme?.mainColor}
    const buttonStyle: CSSProperties = {background: theme?.secondColor, color: theme?.textColor}

    return (
        <nav style={isMobile ? {...navBgStyle, ...navBgMobileStyle} : navBgStyle} className={styles.mainNav}>
            <ul style={isMobile ? navListMobileStyle : undefined} className={styles.navList}>
                <li><Link to={''} style={isMobile ? {...buttonStyle, ...buttonMobileStyle} : buttonStyle} onClick={hideMenu} className={styles.navLink}>
                    {isMobile ?
                        <FontAwesomeIcon icon={faNewspaper} size={"2xl"}/>
                        :
                        'Новости'
                    }

                </Link></li>
                <li><Link to={'theme'} style={isMobile ? {...buttonStyle, ...buttonMobileStyle} : buttonStyle} onClick={hideMenu} className={styles.navLink}>
                    {isMobile ?
                        <FontAwesomeIcon icon={faPaintbrush} size={'2xl'}/>
                        :
                        'Тема'
                    }
                </Link></li>
            </ul>
        </nav>
    )
}