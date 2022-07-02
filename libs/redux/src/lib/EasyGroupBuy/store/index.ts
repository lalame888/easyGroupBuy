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