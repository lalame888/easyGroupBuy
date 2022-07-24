import { ChildPage, getChildPageMenu, PageState } from "@easy-group-buy/data";
import { Action, useReduxSelector } from "@easy-group-buy/redux"
import { CSSProperties } from "react"
import { useDispatch } from "react-redux"
import { Navigate, Route, Routes } from "react-router";
import { ChildMenuButton } from "./ChildMenuButton";
import { HistoryGroup } from "./HistoryGroup";
import { JoinNew } from "./JoinNew";
import { NewOpen } from "./NewOpen";
import { NowGroup } from "./NowGroup/NowGroup";
import { StroeStore } from "./StroeStore";

export function OpenGroupPage(){
    const style: CSSProperties = {
        
    }
    const dispatch = useDispatch();
    const menuStyle: CSSProperties = {
        marginBottom: '50px',
        display: 'flex', 
        justifyContent: 'center'
    }
    
    return(
        <>
            <div style={menuStyle}>
                {getChildPageMenu(PageState['開團']).map((child)=>{
                    return (
                        <ChildMenuButton
                            key={child.pageName}
                            buttonText={child.pageName}
                            to={child.page}
                        />
                    )
                   
                })}
            </div>
            <div style={style}> 
                <Routes>
                    <Route path="/" element={<Navigate to={`NowGroup`} />} />
                    <Route path={`NewOpen`} element={<NewOpen/>} />
                    <Route path={`JoinNew`} element={<JoinNew/>} />
                    <Route path={`NowGroup`}  element={<NowGroup/>} />
                    <Route path={`HistoryGroup`} element={<HistoryGroup/>} />
                    <Route path={`StroeStore`} element={<StroeStore/>} />
                </Routes>
            </div>
        </>
    )
}