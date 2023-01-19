import {useState, RefObject, useEffect, useMemo} from "react";

export function useIntersect(ref: RefObject<HTMLElement>): boolean {
    const [intersecting, setIntersecting] = useState<boolean>(false);
    let o = useMemo(() => new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)), [ref]);

    useEffect(() => {
        if (ref.current)
            o.observe(ref.current)
        return () => o.disconnect()
    }, [ref])

    return intersecting;
}