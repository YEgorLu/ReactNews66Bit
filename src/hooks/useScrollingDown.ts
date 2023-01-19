import {useEffect, useState} from "react";

export function useScrollingDown(init: boolean): boolean {
    const [lastScrollY, setLastScrollY] = useState<number>(window.scrollY);
    const [scrollingDown, setScrollingDown] = useState<boolean>(init);

    const setScroll = () => {
        setScrollingDown(lastScrollY < window.scrollY);
        setLastScrollY(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener('scroll', setScroll);
        return () => window.removeEventListener('scroll', setScroll)
    })

    return scrollingDown
}