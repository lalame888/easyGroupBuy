import { PageMap, PageState } from "@easy-group-buy/data";
import { useReduxSelector } from "@easy-group-buy/redux"
import { CSSProperties } from "react"

export function HistoryGroup(){
    const style: CSSProperties = {
        width: '100%',
        height: '100vh'
    }
    const selectPage: PageMap = useReduxSelector((state)=> state.pageSelect);
    return(
        <div style={style}>

        </div>
    )
}