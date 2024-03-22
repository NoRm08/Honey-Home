import { createAsyncThunk } from "@reduxjs/toolkit";
import SkillService from "../../services/skillService";


export const thunkGetSkill = createAsyncThunk('skillSlice/thunkGetSkill', () => SkillService.getSkills());



export const a = 4;








