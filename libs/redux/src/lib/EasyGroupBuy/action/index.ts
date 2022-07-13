import { AppDispatch } from "../store"
import {ServerUtils } from '@easy-group-buy/features';
import { ChildPage, PageMap, PageState } from "@easy-group-buy/data";


export const SET_USER_INFO = 'SET_USER_INFO' 
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const CHANGE_CHILD_PAGE = 'CHANGE_CHILD_PAGE';

export const Action = {
    checkLogin(){
        return (async (dispatch: AppDispatch)=>{
            const userInfo = await new ServerUtils().checkLogin();
            dispatch({type: SET_USER_INFO , payload:{userInfo}})
        })
    },
    changePage(page: PageState) {
        return ({type: CHANGE_PAGE, payload: {page}})
    },
    changeChildPage( childPage: ChildPage) {
        return ({type: CHANGE_CHILD_PAGE, payload: {childPage}})
    }

}