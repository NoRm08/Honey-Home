import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth/authSlice';
import masterSlice from './master/masterSlice';
import skillSlice from './skill/skillSlice';
import orderSlice from './order/orderSlice';
import userSlice from './user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    masters: masterSlice,
    skills: skillSlice,
    orders: orderSlice,
    users: userSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
