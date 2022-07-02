

import {UserInfo} from '@easy-group-buy/data'


export class ServerUtils {
  constructor(
      public apiUrl = './api/'
  ) {
    
  }
  checkLogin(): Promise<UserInfo> {
    return Promise.resolve(new UserInfo('韻儒','lalame888'));
}
};


export default ServerUtils;
