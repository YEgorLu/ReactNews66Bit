import {createContext, ReactNode, useContext, useEffect, useState} from "react";

const MediaContext = createContext<boolean>(false)

export const useMediaContext = () =>  useContext(MediaContext)

export function useMedia(maxWidth: number) {
    const [smaller, setSmaller] = useState<boolean>(window.innerWidth <= maxWidth);

    useEffect(() => {
        const onResize = () => {
            setSmaller(window.innerWidth <= maxWidth)
        }

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [])

    return smaller
}

export function MediaContextProvider({maxWidth, children}: {children: ReactNode | ReactNode[], maxWidth: number}){
    const isMedia = useMedia(maxWidth);

    return (
        <MediaContext.Provider value={isMedia}>
            {children}
        </MediaContext.Provider>
    )
}