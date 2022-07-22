

import {GroupBuyObject, UserInfo} from '@easy-group-buy/data'
import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import { ApiRequestInterface, ApiResponseInterface, ServerUtilsInterface } from '@easy-group-buy/interface'
import { myGroupBuyList, myUser } from './FakeData';


export class ServerUtils implements ServerUtilsInterface{
  constructor(
      public apiUrl = './api/'
  ) {
    
  }
  loadPersonalGroupBuyList(userInfo: UserInfo): Promise<GroupBuyObject[]> {
    return Promise.resolve(myGroupBuyList);
  }

  checkLogin(): Promise<UserInfo> {
    return Promise.resolve(myUser);  
  }


protected axiosPost(method: string, postData: ApiRequestInterface,cancelTonken?: CancelTokenSource): Promise<AxiosResponse<ApiResponseInterface>>{
  return axios.post(this.apiUrl + '/' + method,
  {
      cancelTonken: cancelTonken?.token,
      apiToken: '', // TODO: token
      ...postData,

  })
}
};


export default ServerUtils;


export const serverUtils = new ServerUtils();
