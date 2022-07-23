
import { GroupBuyObject, PageMap, PageState, THEME, UserInfo } from "@easy-group-buy/data";
import { serverUtils } from "@easy-group-buy/features";
import { useReduxSelector } from "@easy-group-buy/redux"
import { MyHoverButton, SearchInput } from "@easy-group-buy/ui";
import { toSBC } from "@easy-group-buy/utils";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useEffect, useMemo, useState } from "react"
import { Form, FormControl } from "react-bootstrap";
import { GroupBuyListCard } from "./GroupBuyListCard";

export function NowGroup(){
    
    const userInfo: UserInfo = useReduxSelector((state)=> state.userInfo) as UserInfo;
    const [groupBuyList, setGroupBuyList] = useState<GroupBuyObject[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [searchInput , setSearchInput] = useState<string>('');

    const pageNation = 10; // 10筆一頁
    const maxPage = Math.ceil(groupBuyList.length / pageNation)

    useEffect(()=>{
        loadGroupBuyList(userInfo);
    },[userInfo]);

    const showList = useMemo(()=>{
        return groupBuyList.filter((object: GroupBuyObject)=> {
            if (searchInput === '') return true;
            const title = toSBC(object.title).toLowerCase();
            const storeName = toSBC(object.store.name).toLowerCase();
            const searchText = toSBC(searchInput).toLowerCase();
            return title.includes(searchText) || storeName.includes(searchText)
        }).slice((pageNumber-1) * pageNation, pageNumber * pageNation);

    },[groupBuyList,pageNumber,searchInput]);

    async function loadGroupBuyList(userInfo: UserInfo){
        try {
            // TODO loaging畫面、錯誤訊息防呆要做
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
        justifyContent: 'space-between',
        marginBottom: '15px'
    }
    
    
    
    const selectorStyle: CSSProperties = {
        marginLeft: '20px',
        textAlign: 'center',
        width: '170px'
    }
    // TODO 頁面連結的方式還要再想
    return(
        <div style={style}>
            <div style={searchDivStyle}>
                <MyHoverButton
                    style={{backgroundColor: '#7acac554',padding:'6px 20px', borderColor:'#489A81',minWidth:'110px',marginRight:'20px'}}
                    hoverStyle={{backgroundColor: '#7acac5ad'}}
                >
                    ＋開新團
                </MyHoverButton>
                <div style={{display: 'flex'}}>
                    <SearchInput onChange={(newValue: string)=> setSearchInput(newValue)}/>
                    <Form.Select
                        value={pageNumber}
                        onChange={(e)=>{
                            const value = parseInt(e.target.value)
                            if (!isNaN(value)) setPageNumber(value)
                        }}
                        style={selectorStyle}
                    >
                        {Array.from(Array(maxPage)).map((value,index)=>
                            <option key={index} value={index+1}>第 {index+1} 頁</option>
                        )}    
                    </Form.Select>
                </div>
                    

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