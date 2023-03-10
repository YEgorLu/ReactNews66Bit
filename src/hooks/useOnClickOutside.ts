import React, {useEffect} from "react";

export function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: Function) {
    useEffect(
        () => {
            const listener = (event: any) => {
                if (ref && (!ref.current || ref.current.contains(event.target))) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },

        [ref, handler]
    );
}