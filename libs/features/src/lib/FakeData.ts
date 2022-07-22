import { GroupBuyObject, StoreData, UserInfo } from "@easy-group-buy/data";

export const myStore: StoreData = new StoreData('商家1','台中市','0412345678',[{day: 1, openTime: ['08:00 ~ 14:00','17:00 ~ 20:00']}]) ;
export const myUser: UserInfo = new UserInfo('韻儒','lalame888');
export const myGroupBuyList: Array<GroupBuyObject> = [
    new GroupBuyObject('開團1',myUser,myStore)
]