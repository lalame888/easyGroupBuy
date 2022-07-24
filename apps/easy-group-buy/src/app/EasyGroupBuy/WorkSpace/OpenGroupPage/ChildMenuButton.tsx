
import { THEME } from "@easy-group-buy/data";
import { CSSProperties, useState } from "react"
import { NavLink } from "react-router-dom";

interface ChildMenuButtonProps {
    style?: CSSProperties
    buttonText: string;
    to: string
}

export function ChildMenuButton(props: ChildMenuButtonProps){
    const [hover, setHover] = useState<boolean>(false);
    
    const style: CSSProperties = {
        width: '150px',
        wordBreak:'keep-all',
        display:'inline-flex',
        justifyContent: 'center',
        padding:'15px 20px',
        border: THEME.broder,
        cursor: 'pointer',
        fontSize: '14px',
        color: '#212529',
        textDecoration:'none',
        ...props.style
    }
    
    return(
        <NavLink 
            to={props.to} 
            style={(p)=> {
                if (p.isActive) return {...style,backgroundColor: '#FFEEB0'}
                else if (hover) return {...style,backgroundColor: '#FEFFD8'}
                else  return style
            }}
            onMouseEnter={()=>setHover(true)}
            onMouseOut={()=> setHover(false)}
        >
            {props.buttonText}
        </NavLink>
    )
}