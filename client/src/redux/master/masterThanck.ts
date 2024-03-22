import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  AddMasterSkills,
  EditMasterFormData,
  EditMasterImgThanck,
  MasterType,
  SignupMasterFormData,
} from '../../types/auth';
import MasterService from '../../services/masterService';

export const loadMastersThanck = createAsyncThunk('masterSlice/loadMastersThabck', () =>
  MasterService.loadMasters(),
);


export const signupMasterThanck = createAsyncThunk(
  'masterSlice/signupMasterThanck',
  async (formData: SignupMasterFormData) => {
    const response = await MasterService.signupMaster(formData);
    response.MasterSkills = [];
    return response;
  },
);

export const editMasterThanck = createAsyncThunk(
  'masterSlice/editMasterThanck',
  async ({ formData, id }: { formData: EditMasterFormData; id: MasterType['id'] }) => {
    const response = await MasterService.editMaster(id, formData);
    return response;
  },
);

export const editImgMasterThunk = createAsyncThunk(
  'masterSlice/editImgMasterThunk',
  (formData: EditMasterImgThanck) => MasterService.editImg(formData),
);
