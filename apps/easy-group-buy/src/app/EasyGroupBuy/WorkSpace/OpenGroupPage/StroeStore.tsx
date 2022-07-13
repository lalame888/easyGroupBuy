import { PageMap, PageState } from "@easy-group-buy/data";
import { RootState } from "@easy-group-buy/redux"
import { CSSProperties } from "react"
import { useSelector } from "react-redux"

export function StroeStore(){
    const style: CSSProperties = {
        width: '100%',
        height: '100vh'
    }
    const selectPage: PageMap = useSelector((state: RootState)=> state.pageSelect);
    return(
        <div style={style}>

        </div>
    )
}