import {GroupBuyObject, UserInfo} from '@easy-group-buy/data'
export * from './ApiRequestInterface'
export * from './ApiRquestAndResponse'
export interface ServerUtilsInterface {
     apiUrl: string;
     checkLogin(): Promise<UserInfo> ;
     loadPersonalGroupBuyList(userInfo: UserInfo): Promise<Array<GroupBuyObject>>
}

