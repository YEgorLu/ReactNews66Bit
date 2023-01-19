import {CSSProperties} from "react";
import style from '../styles/UI/sideButton.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from '@fortawesome/free-solid-svg-icons'

type SideButtonProps = {
    className?: string;
    onClick: () => void;
    styles?: CSSProperties;
    icon: IconDefinition
}

export const SideButton = ({className, onClick, styles, icon}: SideButtonProps) =>
    <button className={[style.button, className].join(' ')} onClick={onClick} style={styles}>
        <FontAwesomeIcon icon={icon} size="2xl"/>
    </button>

