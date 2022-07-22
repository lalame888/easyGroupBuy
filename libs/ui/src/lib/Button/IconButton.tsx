import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { CSSProperties, useState } from "react"

interface IconButtonProps {
    icon: IconDefinition
    style?: CSSProperties;
    onClick?(event: React.MouseEvent): void;
    hoverColor?: string;
    bottonColor?: string;
}

export function IconButton(props:IconButtonProps): JSX.Element {
    const [isHover, setIsHover] = useState<boolean>(false);
    const hoverColor: string = props.hoverColor || 'black';
    const bottonColor: string = props.bottonColor || 'gray';
    const style: CSSProperties = {
        padding: '5px'
    }
    const iconStyle: CSSProperties = {
        ...props.style,
        color: (isHover) ? hoverColor : bottonColor,
        cursor: 'pointer'
    }
    return (
        <span
            style={style}
            onMouseOver={()=>{setIsHover(true);}}
            onMouseOut={()=>{setIsHover(false)}}
            onClick={props.onClick}
        >
            <FontAwesomeIcon 
                style={iconStyle}
                icon={props.icon} 
            />
        </span>
    )
}
