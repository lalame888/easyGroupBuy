import { PageState, UserInfo } from '@easy-group-buy/data'
import { CHANGE_PAGE, SET_USER_INFO } from '../action/index'
type StateType = {
  userInfo: UserInfo | undefined,
  hasCheckUserInfo: boolean
  pageState: PageState,
  errorMessage: string
}

const initState: StateType = {
  userInfo: undefined,
  hasCheckUserInfo: false,
  pageState: PageState['開團'],
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
      case CHANGE_PAGE : {
        const page: PageState = action.payload.page;

        return {...state,pageState: page}
      }

      default:
        return state;
    }
}
  
