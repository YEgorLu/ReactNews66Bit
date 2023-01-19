import {Header} from "./Header";
import {Footer} from "./Footer";
import {Outlet} from 'react-router-dom'
import {useThemeContext} from "../../ThemeContextProvider";
import {CSSProperties} from "react";
import {TitleName} from "../../App";
import {NavMenu} from "../../UI/navigation/NavMenu";
import {useMediaContext} from "../../MediaContextProvider";
import {useScrollingDown} from "../../hooks/useScrollingDown";

export function Layout({title}: { title: TitleName }) {
    const {theme} = useThemeContext();
    const isMobile = useMediaContext()
    const scrollingDown = useScrollingDown(false);

    const mainContainerMobileStyle: CSSProperties = {
        width: '100%'
    }

    const mainConteainerStyle: CSSProperties = {
        width: '80%',
        margin: '0 auto'
    }

    const mainMobileStyle: CSSProperties = {
        background: theme?.secondColor,
        padding: '10vh 0',
        minHeight: '100vh'
    }

    const mainStyle: CSSProperties = {
        background: theme?.secondColor,
        padding: '40px 0',
    }

    const header = <Header title={title}/>
    const footer = <Footer>{isMobile && <NavMenu/>}</Footer>

    return (
        <>
            {!isMobile ?
                header
                :
                scrollingDown || header
            }
            <main style={isMobile ? mainMobileStyle : mainStyle}>
                <div className="mainContainer" style={isMobile ? mainContainerMobileStyle : mainConteainerStyle}>
                    <Outlet/>
                </div>
            </main>
            {!isMobile ?
                footer
                :
                scrollingDown || footer
            }
        </>
    )
}