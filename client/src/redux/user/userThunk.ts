import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../services/userService';


export const usersGetThunk = createAsyncThunk('userSlice/getUsers', () =>
  UserService.getAllUsers(),
);

export const a = 4;

