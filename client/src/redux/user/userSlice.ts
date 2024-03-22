import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UserSliceType, UserType } from '../../types/auth';
import { userEditThunk, usersGetThunk } from './userThunk';
import { act } from 'react-dom/test-utils';

const initialState: UserSliceType = {
  originalUsers: [],
  users: [],
  dateExp: new Date(),
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserType[]>) => {
      state.originalUsers = action.payload; // сохраняем оригинальный массив users
      state.users = action.payload;
    },
    userFilterByName: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      if (searchTerm === '') {
        state.users = state.originalUsers;
        return;
      }
      state.users = state.originalUsers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm),
      );
    },
    userFilterByOption: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case 'subsAsc':
          state.users = state.users.sort((a, b) => Number(a.subscribeLevl) - Number(b.subscribeLevl));
          break;

        case 'subsDesc':
          state.users = state.users.sort((a, b) => Number(b.subscribeLevl) - Number(a.subscribeLevl));
          break;
        default:
          state.users = state.originalUsers;
      }
    },
    setDateExp: (state, action: PayloadAction<Date>) => {
      state.dateExp = action.payload;
  },
},
  extraReducers: (builder) => {
    builder.addCase(usersGetThunk.fulfilled, (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
      state.originalUsers = action.payload;
    });
  },
});

export const { setUsers, userFilterByName, userFilterByOption, setDateExp } = userSlice.actions;

export default userSlice.reducer;
