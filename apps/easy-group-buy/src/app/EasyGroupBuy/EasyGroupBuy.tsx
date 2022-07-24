import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Action, useReduxSelector } from '@easy-group-buy/redux'
import { Introduction } from './Introduction/Introduction';
import { Container } from 'react-bootstrap';
import { Header } from './Header/Header';
import { ContactUsPage, HelpPage, InfoPage, OpenGroupPage } from './WorkSpace/WorkSpace';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PageState } from '@easy-group-buy/data';

 export function EasyGroupBuy() {
    // 去確認有沒有登入，如果有登入直接去會員的主畫面，沒有的話就先到導航頁
    const hasCheck = useReduxSelector((state)=> state.hasCheckUserInfo);
    const userInfo = useReduxSelector((state)=> state.userInfo);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(Action.checkLogin())
    },[])

    return(
        <>
        <Header/>
        <Container style={{maxWidth: '900px'}}>
            {
                (!hasCheck)?  // LOADING畫面或是沒有畫面
                    <div></div>:

                (userInfo)? 
                    <div>
                        <Routes>
                            <Route path="/" element={<Navigate to={`/${PageState['開團']}`} />} />
                            <Route path={`/${PageState['開團']}/*`} element={<OpenGroupPage/>} />
                            <Route path={`/${PageState['使用說明']}/*`} element={<HelpPage/>} />
                            <Route path={`/${PageState['關於輕鬆開好團']}/*`} element={<InfoPage/>} />
                            <Route path={`/${PageState['聯絡我們']}/*`} element={<ContactUsPage/>} />
                        </Routes>
                    </div>
                :
                    <Introduction/> // 還要看是不是有訂單編號、邀請之類的，都沒有才是介紹頁

                }
            
        </Container>
        </>

    )
}
export default EasyGroupBuy;