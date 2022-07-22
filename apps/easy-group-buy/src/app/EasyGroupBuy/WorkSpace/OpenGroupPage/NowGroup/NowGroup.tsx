
import { GroupBuyObject, PageMap, PageState, UserInfo } from "@easy-group-buy/data";
import { serverUtils } from "@easy-group-buy/features";
import { useReduxSelector } from "@easy-group-buy/redux"
import { CSSProperties, useEffect, useMemo, useState } from "react"
import { GroupBuyListCard } from "./GroupBuyListCard";

export function NowGroup(){
    
    const userInfo: UserInfo = useReduxSelector((state)=> state.userInfo) as UserInfo;
    const [groupBuyList, setGroupBuyList] = useState<GroupBuyObject[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [searchInput , setSearchInput] = useState<string>('');

    const pageNation = 20; // 20筆一頁

    useEffect(()=>{
        loadGroupBuyList(userInfo);
    },[userInfo]);
    const showList = useMemo(()=>{
        groupBuyList.filter((object: GroupBuyObject)=> {
            if (searchInput === '') return true;
            return object.title.includes(searchInput)
        }).slice(pageNumber, (pageNumber+1) * pageNation);

        return groupBuyList;
    },[groupBuyList,pageNumber,searchInput]);

    async function loadGroupBuyList(userInfo: UserInfo){
        try {
            const list = await serverUtils.loadPersonalGroupBuyList(userInfo);
            setGroupBuyList(list);
        } catch (error) {
            if (typeof(error) === 'string') setErrorMessage(`取得目前團單列表發生錯誤 >> ${error}`);
            else {
                console.log(error);
                setErrorMessage('取得目前團單列表發生錯誤');
            }
        }
    }

    

    const style: CSSProperties = {
        
    }
    const searchDivStyle: CSSProperties = {
        display: 'flex',
        height: '30px'
    }
    
    return(
        <div style={style}>
            <div style={searchDivStyle}>
                {
                    // TODO: 開心團 search 分頁
                }
            </div>
            <div>
            {showList.map((object: GroupBuyObject)=>
                <GroupBuyListCard
                    key={object.uid}
                    groupBuyObject={object}
                />
            )}
            </div>
        </div>
    )
}