import {NavIcon} from "./NavIcon";
import {NavMenu} from "./NavMenu";
import React, {useState} from "react";
import {useOnClickOutside} from "../../hooks/useOnClickOutside";


export function Nav() {
    const [active, setActive] = useState<boolean>(false);
    const ref = React.createRef<HTMLDivElement>()
    useOnClickOutside(ref, () => setActive(false));

    return (
        <div className='navContainer' ref={ref}>
            <NavIcon active={active} toggleActive={() => setActive(prevState => !prevState)}/>
            {active &&
              <NavMenu hideMenu={() => setActive(false)}/>
            }
        </div>
    )
}