import React, { CSSProperties, useState } from "react"

interface HoverButtonProps {
    style?: CSSProperties;
    onClick?(event: React.MouseEvent): void;
    hoverStyle?: CSSProperties;
    children?: JSX.Element | string
    disabled?: boolean
}

export function HoverButton(props:HoverButtonProps): JSX.Element {
    const [isHover, setIsHover] = useState<boolean>(false);
    const changeStyle = (isHover && props.hoverStyle)? {...props.style,...props.hoverStyle} : {...props.style};
    const disableStyle: CSSProperties | undefined =(props.disabled) ? {
        color: '#7a7a7a',
        cursor: 'auto',
        backgroundColor: '#f5f5f5'
    } : undefined
    const style: CSSProperties = {
        userSelect: 'none',
        padding: '5px 15px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        ...changeStyle,
        ...disableStyle
    }
    
    return (
        <span
            style={style}
            onMouseOver={()=>{setIsHover(true && !props.disabled);}}
            onMouseOut={()=>{setIsHover(false )}}
            onClick={props.onClick}
        >
            {props.children}
        </span>
    )
}


export function MyHoverButton(props: HoverButtonProps): JSX.Element {
    const buttonStyle: CSSProperties = {
        fontSize: '17px',
        border: '1px solid',
        borderRadius: '30px',
        padding: '5px 40px',
        ...props.style
    }
    const buttonHoverStyle: CSSProperties = {
        backgroundColor: '#7acac554',
        ...props.hoverStyle
    }
    return (
        <HoverButton 
            {...props}
            style={buttonStyle} 
            hoverStyle={buttonHoverStyle}
        >
            {props.children}
        </HoverButton>)

}
