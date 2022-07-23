/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Cloneable, UserInfo } from "./data";
import { changeWeekToCh, generateUUID } from '@easy-group-buy/utils'


type BusinessHours = {
  day: 1 | 2| 3| 4| 5| 6| 7,
  openTime: Array<string>  // ['0800~1200','1400~2000']
}
// 定義店家資訊物件
export class StoreData extends Cloneable{
  public menu: Array<GoodsData> = []; // 儲存的店家菜單
  public menuImage: Array<string> | undefined = undefined; // 菜單，可以有多張
  public storeImage: string | undefined = undefined;   // 店家照片
  constructor(
    public name: string,
    public address: string | undefined,
    public phone: string | undefined,
    private _businessHours : Array<BusinessHours>
  ){
    super();
  }

  get businessHours(): Array<string> {
    if (this._businessHours.length === 0) return ['無資訊'];
    return this._businessHours.sort((a,b)=> a.day - b.day)
      .map((b)=>`${changeWeekToCh(b.day)} ${b.openTime.join('、')}`);
  }

  public updateBusinessHours(data: BusinessHours): void{
    const index = this._businessHours.findIndex((b)=> b.day === data.day);
    this._businessHours = [...this._businessHours]

    if (index === -1) this._businessHours.push(data);
    else this._businessHours[index] = data;
  }
}

class GoodsData extends Cloneable{
  constructor(
    public name: string,
    public money: number,
    public number: number = 1, //數量
    public note: string = "",
    public appendTermList: Array<{name: string, money: number}> = []
  ){
    super();
  }
  get totalMoney (): number {
    if (this.appendTermList.length === 0) return this.money * this.number;
      else {
        return  (this.money + this.appendTermList.map((append)=> append.money).reduce((a,b)=> a+b))* this.number;
      }
  }

  
  
}


export enum GroupBuyStatus {
  '開放跟團中', // 大家都可以編輯
  '團單編輯結束等待團主與店家下單', // 結束編輯但是團主還沒下訂
  '等待到貨中', // 團主已經訂了
  '已到貨', // 要給大家確認自己有繳錢、有拿到東西
  '結束' 
}


export class OrderData  extends Cloneable  {
  public orderList: Array<GoodsData> = [];
  public payMoney: number =0 ; // 已經付款的金額
  public receipt: boolean = false; // 是否簽收/取得貨品
  public orderNote: string = ''; //訂單備註
  public appendMoney: number = 0 ; //額外費用 ex: 運費之類的
  public uid: string = generateUUID();

  constructor (
    public user: UserInfo,
    public readonly groupBuyUid: string,
    uid?: string
  ) {
    super();
    if (uid) this.uid = uid;
  }

  get totalMenoy(): number {  // 回傳總金額
    let result: number = this.appendMoney;
    if (this.orderList.length === 0) return result;

    result += this.orderList.map((order)=> order.totalMoney).reduce((a,b)=> a+b);

    return result;
  }

}

type GroupSaveData = {
  uid: string,
  statues: GroupBuyStatus
  joinList: Array<UserInfo>,
  userOrder: Array<OrderData> ,
  openOrderView: boolean,
  endTime: Date | undefined,
  appendMoney: number
}
export class GroupBuyObject extends Cloneable {
  public statues: GroupBuyStatus = GroupBuyStatus['開放跟團中']; // 預設開放
  private joinUserList: Array<UserInfo> = []; // 參團者
  private userOrder: Array<OrderData> = []; //目前提交的團單
  public openOrderView: boolean = true; // 開放別人觀看團單
  public endTime: Date | undefined = undefined; // 結束時間
  public deleteTime: Date | undefined = undefined; // 被刪除的時間

  public uid: string = generateUUID();
  public appendMoney: number = 0 ; //額外費用 ex: 運費之類的
   
  constructor(
    public title: string,  // 開團的title
    public readonly builder: UserInfo, // 開團者 
    public store: StoreData  // 所選的店家 不可為空
  ){ 
    super();
  }

  public setData(saveData: GroupSaveData){
    // 把資料庫的儲存資料塞進去
    this.uid = saveData.uid;
    this.statues = saveData.statues;
    this.joinUserList = saveData.joinList;
    this.userOrder = saveData.userOrder;
    this.openOrderView = saveData.openOrderView;
    this.endTime = saveData.endTime;
    this.appendMoney = saveData.appendMoney;
  }

  public newUserOrder(user: UserInfo):OrderData  {
    const order = new OrderData(user, this.uid);
    order.appendMoney = this.appendMoney;

    return order;
  }
 

  public deleteOrder(order: OrderData): void {
    const index = this.userOrder.findIndex((o)=> o.uid === order.uid);
    if (index !== -1) {
      this.userOrder = [...this.userOrder];
      this.userOrder.splice(index,1);
    } else {
      throw new Error('刪除團單失敗，找不到對應團單')
    }

  }
  public addOrUpdateOrder(order: OrderData): void {
    const index = this.userOrder.findIndex((o)=> o.uid === order.uid);
    if (index !== -1) {
      this.userOrder = [...this.userOrder];
      this.userOrder[index] = order;
    } else {
      this.userOrder = [...this.userOrder,order];
    }
  }
  get orderList(): Array<OrderData> {
    return this.userOrder
  }


  public join(user: UserInfo): boolean {
    if (this.isUserJoin(user) === false) {
      this.joinUserList = [...this.joinUserList, user];
      return true 
    } 
    else return false;
  }
  public disjoin(user: UserInfo): boolean {
    const index = this.joinUserList.findIndex((u)=> u.loginId === user.loginId)
    if (index !== -1) {
      this.joinUserList = [...this.joinUserList];
      this.joinUserList.splice(index,1);
      return true 
    } 
    else return false;
  }
  public isUserJoin(user: UserInfo) {
    return (this.joinUserList.findIndex((u)=> u.loginId === user.loginId)!== -1)
  }
  get joinList(): Array<UserInfo> {
    return this.joinUserList;
  }
  get joinListLength(): number {
    return this.joinUserList.length
  }

  get endTimeString(): string {
    if (this.endTime === undefined) return ''
    return `${this.endTime.toLocaleDateString()} ${this.endTime.toLocaleTimeString('en-GB')}`
  }
  

}

