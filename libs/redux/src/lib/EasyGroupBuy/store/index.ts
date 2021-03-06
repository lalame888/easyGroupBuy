import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk'

import { easyGroupBuyReducer} from '../reducer/index';



  
export const easyGroupBuyStore = createStore(easyGroupBuyReducer,
    undefined,
    applyMiddleware(
      thunkMiddleware,  
    )
  );


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof easyGroupBuyStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof easyGroupBuyStore.dispatch


export const useReduxDispatch: () => AppDispatch = useDispatch
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector

