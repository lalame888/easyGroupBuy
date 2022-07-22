
import { CSSProperties, useState } from "react"

interface ChildMenuButtonProps {
    style?: CSSProperties
    active?: boolean
    buttonText: string;
    onClick?(): void
}

export function ChildMenuButton(props: ChildMenuButtonProps){
    const [hover, setHover] = useState<boolean>(false);
    function getStyle(): CSSProperties{
        if (props.active) {
            return {
                backgroundColor: '#FFEEB0'
            }
        } else if (hover) {
            return{
                backgroundColor: '#FEFFD8'
            }
        }
        else {
            return {}
        }
    }
    const style: CSSProperties = {
        width: '150px',
        display:'inline-flex',
        justifyContent: 'center',
        padding:'15px 20px',
        border: '1px solid #489A81',
        cursor: 'pointer',
        fontSize: '14px',
        ...props.style,
        ...getStyle() // 根據狀態決定目前樣子（顏色）
    }
    
    return(
        <div 
            onClick={props.onClick} 
            style={style}
            onMouseEnter={()=>setHover(true)}
            onMouseOut={()=> setHover(false)}
        >
            {props.buttonText}
        </div>
    )
}