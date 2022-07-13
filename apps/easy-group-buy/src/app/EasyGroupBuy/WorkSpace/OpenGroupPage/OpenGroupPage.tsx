import { ChildPage, PageMap, PageState } from "@easy-group-buy/data";
import { Action, RootState } from "@easy-group-buy/redux"
import { CSSProperties } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChildMenuButton } from "./ChildMenuButton";
import { HistoryGroup } from "./HistoryGroup";
import { JoinNew } from "./JoinNew";
import { NewOpen } from "./NewOpen";
import { NowGroup } from "./NowGroup";
import { StroeStore } from "./StroeStore";

export function OpenGroupPage(){
    const style: CSSProperties = {
        width: '100%',
        height: '100vh'
    }
    const dispatch = useDispatch();
    const pageSelect: PageMap = useSelector((state: RootState)=> state.pageSelect);
    const childPage: ChildPage  = pageSelect.childPage;

    
    return(
        <>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {pageSelect.getChildPageMenu(pageSelect.pageState).map((child)=>{
                    return (
                        <ChildMenuButton
                            key={child.pageName}
                            buttonText={child.pageName}
                            onClick={()=>dispatch(Action.changeChildPage(child))}
                            active={child.pageName === childPage.pageName}
                        />
                    )
                   
                })}
            </div>
            <div style={style}> 
            {
                // TODO: 使用route 
            }
                {(childPage.pageName === '開新團') &&  <NewOpen/>} 
                {(childPage.pageName === '跟新團') &&  <JoinNew/>} 
                {(childPage.pageName === '目前團單') &&  <NowGroup/>} 
                {(childPage.pageName === '歷史團單') &&  <HistoryGroup/>} 
                {(childPage.pageName === '儲存商家') &&  <StroeStore/>} 

            </div>
        </>
    )
}