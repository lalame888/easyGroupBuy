import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Action, RootState } from '@easy-group-buy/redux'
import { Introduction } from './Introduction/Introduction';
import { Container } from 'react-bootstrap';
import { Header } from './Header/Header';
import { WorkSpace } from './WorkSpace/WorkSpace';

 export function EasyGroupBuy() {
    // 去確認有沒有登入，如果有登入直接去會員的主畫面，沒有的話就先到導航頁
    const hasCheck = useSelector((state: RootState)=> state.hasCheckUserInfo);
    const userInfo = useSelector((state: RootState)=> state.userInfo);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(Action.checkLogin())
    },[])

    return(
        <>
        <Header/>
        <Container>
            {
                (!hasCheck)? 
                    <div></div>:

                (userInfo)? 
                    <WorkSpace/>
                
                :
                    <Introduction/>

                }
            
        </Container>
        </>

    )
}
export default EasyGroupBuy;