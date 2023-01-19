import {useEffect, useState} from "react";

export function useOnSwipeDown(onSwipeDown: () => void){
    const [startY, setStartY] = useState<number>(0);
    const [endY, setEndY] = useState<number>(0);

    useEffect(() => {
        const onTouchStart = (ev: TouchEvent) => setStartY(ev.touches[0].pageY)
        const onTouchEnd = (ev: TouchEvent) => setEndY(ev.changedTouches[0].pageY)
        document.addEventListener('touchstart', onTouchStart);
        document.addEventListener('touchend', onTouchEnd);

        return () => {
            document.removeEventListener('touchstart', onTouchStart);
            document.removeEventListener('touchend', onTouchEnd);
        }
    }, [])

    useEffect(() => {
        const moved = endY - startY;
        const onUpperScreen = startY <= window.innerHeight
        const needRefresh = onUpperScreen && moved >= 300
        if (needRefresh)
            onSwipeDown()
    }, [endY])
}