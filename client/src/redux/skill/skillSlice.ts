import { createSlice } from '@reduxjs/toolkit';
import type { SkillSliceType } from '../../types/skills';
import { thunkAddOrder, thunkAddSkill, thunkGetSkill } from './skillThunk';

const initialState: SkillSliceType = [];

export const skillSlice = createSlice({
  name: 'skillSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunkGetSkill.fulfilled, (state, action) => action.payload);
  },
});

export default skillSlice.reducer;
