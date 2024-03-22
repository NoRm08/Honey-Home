import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { MasterSliceState, MasterType } from '../../types/auth';
import {
  editImgMasterThunk,
  editMasterThanck,
  loadMastersThanck,
  signupMasterThanck,
} from './masterThanck';

const initialState: MasterSliceState = {
  originalMasters: [],
  masters: [],
  MasterSkills: [],
};

export const masterSlice = createSlice({
  name: 'masterSlice',
  initialState,
  reducers: {
    setMasters: (state, action: PayloadAction<MasterType[]>) => {
      state.originalMasters = action.payload; // сохраняем оригинальный массив мастеров
      state.masters = action.payload;
    },
    filterByName: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      if (searchTerm === '') {
        state.masters = state.originalMasters;
        return;
      }
      state.masters = state.originalMasters.filter((master) =>
        master.name.toLowerCase().includes(searchTerm),
      );
    },
    filterByOption: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case 'raitingAsc':
          state.masters = state.masters.sort((a, b) => a.raiting - b.raiting);
          break;

        case 'raitingDesc':
          state.masters = state.masters.sort((a, b) => b.raiting - a.raiting);
          break;
        case 'expAsc':
          state.masters = state.masters.sort((a, b) => a.experience < b.experience);
          break;
        case 'expDesc':
          state.masters = state.masters.sort((a, b) => b.experience < a.experience);
          break;
        default:
          state.masters = state.originalMasters;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupMasterThanck.fulfilled, (state, action) => {
      state.masters.push(action.payload);
    });
    builder.addCase(signupMasterThanck.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(loadMastersThanck.fulfilled, (state, action) => {
      state.masters = action.payload;
      state.originalMasters = action.payload;
    });
    builder.addCase(editMasterThanck.fulfilled, (state, action) => {
      // console.log('BROOOOO', action.payload);
      const index = state.masters.findIndex((master) => master.id === action.payload.id);
      if (index !== -1) {
        // state.masters[index].MasterSkills = action.payload.telephone;
        state.masters[index].telephone = action.payload.telephone
        state.masters[index].name = action.payload.name
        state.masters[index].experience = action.payload.experience
      };
    });
    builder.addCase(editImgMasterThunk.fulfilled, (state, action) => {
      const curMaster = state.masters.find((master) => master.id === action.payload.id);
      if (curMaster) curMaster.img = action.payload.img;
    });
  },
});
export const { filterByName, setMasters, filterByOption } = masterSlice.actions;

export default masterSlice.reducer;
