import { ChildPage, PageState, UserInfo } from '@easy-group-buy/data'
import { SET_USER_INFO } from '../action/index'
type StateType = {
  userInfo: UserInfo | undefined,
  hasCheckUserInfo: boolean
  errorMessage: string
}

const initState: StateType = {
  userInfo: undefined,
  hasCheckUserInfo: false,
  errorMessage: ''
};

type ActionType = {
    type: string,
    payload: any
}

  export function easyGroupBuyReducer(state = initState, action: ActionType): StateType {
    switch (action.type) {
      case SET_USER_INFO: {
        const userInfo:UserInfo = action.payload.userInfo;
        return {...state, userInfo,hasCheckUserInfo: true};
      }
      
      

      default:
        return state;
    }
}
  
