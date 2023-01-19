import {News} from "../Api";
import {NewsCard} from "../UI/NewsCard";
import styles from '../styles/newsPage.module.css'
import {useNews} from "../hooks/useNews";
import {SideButton} from "../UI/SideButton";
import {faArrowsRotate, faArrowUp} from '@fortawesome/free-solid-svg-icons'
import {useThemeContext} from "../ThemeContextProvider";
import {CSSProperties, useEffect} from "react";
import {useMediaContext} from "../MediaContextProvider";
import {useScrollingDown} from "../hooks/useScrollingDown";
import {useOnSwipeDown} from "../hooks/useOnSwipeDown";

export function NewsPage({onStart}: { onStart: () => void }) {
    const [news, posToLoad, ref, refresh] = useNews();
    const {theme} = useThemeContext();
    const isMobile = useMediaContext();
    const scrollingDown = useScrollingDown(false);
    const scrollUp = () => window.scroll(0, 0);

    useEffect(onStart, [])
    useOnSwipeDown(refresh)

    const newsMobileStyle: CSSProperties = {
        width: '90%'
    }

    const newsStyle: CSSProperties = {
        borderColor: theme?.mainColor,
        background: theme?.mainColor,
        color: theme?.textColor
    }

    const sideButtonStyle: CSSProperties = {
        borderColor: theme?.mainColor,
        background: theme?.secondColor,
        color: theme?.textColor
    }

    const sideButtons = <>
        <SideButton icon={faArrowsRotate} styles={sideButtonStyle} className={'refreshButton'}
                    onClick={() => {
                        scrollUp();
                        refresh();
                    }}/>
        <SideButton onClick={scrollUp} styles={sideButtonStyle} icon={faArrowUp}/>
    </>

    return (
        <div className={styles.newsPageContainer}>
            {isMobile &&
                (scrollingDown ||
              <div className={styles.buttonsMobileContainer}>
                  {sideButtons}
              </div>)
            }
            <div className={styles.newsContainer}>
                {news.map((n: News,
                           i: number) => <NewsCard key={n.id}
                                                   style={isMobile ? {...newsStyle, ...newsMobileStyle} : newsStyle}
                                                   {...i >= posToLoad && {ref: ref}}
                                                   news={n}/>)}
            </div>
            {isMobile ||
              <div className={styles.buttonsContainer}>
                  {sideButtons}
              </div>
            }
        </div>
    )
}