import { GroupBuyObject, GroupBuyStatus, StoreData, UserInfo } from "@easy-group-buy/data";

export const myStore: StoreData = new StoreData('商家1','台中市','0412345678',[{day: 1, openTime: ['08:00 ~ 14:00','17:00 ~ 20:00']}]) ;
export const myUser: UserInfo = new UserInfo('韻儒','lalame888');
export const anothorUser: UserInfo = new UserInfo('使用者A','groupbuy123');

const groupBuy1 = new GroupBuyObject('開團1',myUser,myStore);
groupBuy1.endTime = new Date('2022/07/23 23:59:59');
const groupBuy2 = new GroupBuyObject('開團2',myUser,myStore);
groupBuy2.statues = GroupBuyStatus['等待到貨中'];
const groupBuy3 = new GroupBuyObject('開團3',anothorUser,myStore);

const odtherGroups = Array.from(Array(34)).map((v,index)=>
    new GroupBuyObject(`開團${index+4}`,anothorUser,myStore)
)
export const myGroupBuyList: Array<GroupBuyObject> = [
    groupBuy1,
    groupBuy2,
    groupBuy3,
    ...odtherGroups

]