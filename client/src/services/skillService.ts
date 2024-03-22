import axios from 'axios';
import type { SkillSliceType } from '../types/skills';

export const skillInstance = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

class SkillService {
  static async getSkills(): Promise<SkillSliceType[]> {
    const response = await skillInstance.get<SkillSliceType[]>('/api/skill/');
    return response.data;
  }

}

export default SkillService;
