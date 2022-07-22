/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { CSSProperties, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface CircleDeleteButtonProps {
    isShow: boolean,
    onClick(): void;
    style?: CSSProperties
    disabled?: boolean
}
// 編輯模式時的link => hover 會出現popover
export function CircleDeleteButton(props: CircleDeleteButtonProps) {
    const [isDeleteHover, setIsDeleteHover] = useState<boolean>(false);
    
    const deleteButtonStyle: CSSProperties = {
        color: (isDeleteHover && !props.disabled)?'red': 'gray',
        position: 'absolute', 
        right: '33px', 
        top:'7px',
        cursor:(!props.disabled)?'pointer': 'auto',
        fontSize: '20px',
        borderRadius:'100px',
        border: '1px solid gray',
        backgroundColor: 'white',
        ...props.style
        
    }
    return (
            (props.isShow || isDeleteHover) && 
            <FontAwesomeIcon
                 
                icon={faTimesCircle} 
                style={deleteButtonStyle}
                onClick={(e)=>{
                    if (!props.disabled) {
                        e.stopPropagation(); 
                        props.onClick();
                    }
                }}
                onMouseEnter={()=> setIsDeleteHover(true)}
                onMouseLeave={()=> setIsDeleteHover(false)}
            />
    );
}
export default CircleDeleteButton;
