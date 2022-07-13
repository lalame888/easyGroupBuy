import { ChildPage, PageMap, PageState, UserInfo } from '@easy-group-buy/data'
import { CHANGE_CHILD_PAGE, CHANGE_PAGE, SET_USER_INFO } from '../action/index'
type StateType = {
  userInfo: UserInfo | undefined,
  hasCheckUserInfo: boolean
  pageSelect: PageMap,
  errorMessage: string
}

const initState: StateType = {
  userInfo: undefined,
  hasCheckUserInfo: false,
  pageSelect: new PageMap(PageState['開團']),
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
        const newPage = new PageMap(page)

        return {...state,pageSelect: newPage}
      }
      case CHANGE_CHILD_PAGE: {
        const childPage: ChildPage = action.payload.childPage;
        if (state.pageSelect.childPage.pageName === childPage.pageName) {
          return state
        } else {
          const newPage = state.pageSelect.clone();
          newPage.childPage = childPage;
          return {...state,pageSelect: newPage}
        }
      }

      default:
        return state;
    }
}
  
