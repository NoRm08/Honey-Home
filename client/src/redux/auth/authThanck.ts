import { createAsyncThunk } from '@reduxjs/toolkit';
import type { EditImgFormData, EditUserFormData, LoginFormData, PayForm, SignupFormData } from '../../types/auth';
import { SignupMasterFormData } from '../../types/auth';
import AuthService from '../../services/authService';
import ApiServices from '../../services/apiService';

export const loginThanck = createAsyncThunk('authSlice/loginThanck', (formData: LoginFormData) =>
  AuthService.login(formData),
);

export const signupThanck = createAsyncThunk('authSlice/signupThanck', (formData: SignupFormData) =>
  AuthService.signup(formData),
);

export const logoutThanck = createAsyncThunk('authSlice/logoutThanck', () => AuthService.logout());

export const checkThanck = createAsyncThunk('authSlice/checkAuth', () => AuthService.check());

export const refreshThanck = createAsyncThunk('authSlice/refreshThanck', () =>
  AuthService.refresh(),
);

export const payThanck = createAsyncThunk('authSlice/payThanck', async (formData: PayForm) => {
  const respons = await ApiServices.subscribePay(formData);
  return respons;
});

export const userEditThunk = createAsyncThunk(
  'userSlice/userEditThunk',
  (formData: EditUserFormData) => AuthService.editUser(formData),
);

export const editImgThunk = createAsyncThunk(
  'userSlice/editImgThunk',
  (formData: EditImgFormData) => AuthService.editImg(formData),
);

export const confirmThanck = createAsyncThunk('authSlice/confirmThanck', async (formData) => {
  // console.log('------->>>>>>>',formData)
  const response = await AuthService.confirm(formData);
});
