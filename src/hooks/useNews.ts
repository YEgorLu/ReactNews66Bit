import {createRef, RefObject, useEffect, useState} from "react";
import {Api, News} from "../Api";
import {useIntersect} from "./useIntersect";

export function useNews(perPage: number = 7): [News[], number, RefObject<HTMLElement>, () => void] {
    const [news, setNews] = useState<News[]>(JSON.parse(localStorage.getItem('news') || '[]'));
    const [page, setPage] = useState<number>(JSON.parse(localStorage.getItem('page') || '1'));
    const [ids, setIds] = useState<Set<number>>(new Set(news.map(n => n.id)))
    const [posToLoad, setPosToLoad] = useState<number>(news.length < 2 ? 0 : news.length - 2);
    const refToLoad = createRef<HTMLElement>();
    const intersecting = useIntersect(refToLoad);

    // useEffect(() => {
    //     console.log(localStorage)
    // })

    const loadNews = async (refresh: boolean = false) => {
        let newNews = (await Api.getNews(page, perPage));
        if (!refresh)
            newNews = newNews.filter((n: News) => !ids.has(n.id))
        const newIds = newNews.map((n: News) => n.id);
        if (!refresh) {
            setNews(prevState => prevState.concat(newNews));
            setIds(prevState => new Set([...prevState, ...newIds]))
        } else {
            setNews(newNews);
            setIds(new Set(newIds));
        }
    }

    const refresh = () => {
        setPage(prevState => {
            setNews(() => {
                setIds(new Set());
                return []
            })
            if (prevState === 1)
                loadNews(true);
            return 1
        })
    }

    useEffect(() => {
        setPosToLoad(news.length < 2 ? 0 : news.length - 2);
        localStorage.setItem('news', JSON.stringify(news))
        localStorage.setItem('page', JSON.stringify(page))
        localStorage.setItem('posToLoad', JSON.stringify(posToLoad))
    }, [news])

    useEffect(() => {
        setPage(prevState => prevState + 1);
    }, [intersecting]);

    useEffect(() => {
        (async() => await loadNews())()
    }, [page])

    return [news, posToLoad, refToLoad, refresh];
}