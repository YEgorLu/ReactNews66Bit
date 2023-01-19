import React, {ForwardedRef} from "react";
import {News} from "../Api";
import styles from '../styles/UI/newsCard.module.css'
import {CSSProperties} from "react";


export const NewsCard = React.memo(React.forwardRef(({news, style} : {news: News, style: CSSProperties }, ref:ForwardedRef<HTMLElement>) =>
        <article style={style} ref={ref} className={styles.card}>
            <div>
                <h2 className={styles.title}>{news.title}</h2>
                <p>{news.content}</p>
            </div>
        </article>
))
