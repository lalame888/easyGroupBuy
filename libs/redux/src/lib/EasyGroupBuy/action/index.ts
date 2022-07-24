import { AppDispatch } from "../store"
import {ServerUtils } from '@easy-group-buy/features';
import { ChildPage, PageState } from "@easy-group-buy/data";


export const SET_USER_INFO = 'SET_USER_INFO' 

export const Action = {
    checkLogin(){
        return (async (dispatch: AppDispatch)=>{
            const userInfo = await new ServerUtils().checkLogin();
            dispatch({type: SET_USER_INFO , payload:{userInfo}})
        })
    }
    

}