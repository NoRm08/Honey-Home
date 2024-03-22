import axios from 'axios';
import type {
  EditMasterFormData,
  EditMasterImgThanck,
  MasterSkills,
  MasterType,
  SignupMasterFormData,
} from '../types/auth';

export const masterInstance = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

class MasterService {
  static async signupMaster(formData: SignupMasterFormData): Promise<MasterType> {
    const respons = await masterInstance.post<MasterType>('/api/masters/signupMaster/', formData);
    return respons.data;
  }

  static async loadMasters(): Promise<MasterType[]> {
    const respons = await masterInstance.get<MasterType[]>('/api/masters/');
    return respons.data;
  }

  static async addSkill(masterId: number, skillId: number): Promise<MasterSkills> {
    try {
      const response = await masterInstance.post<MasterSkills>('/api/masters/addSkill', {
        masterId,
        skillId,
      });
      return response.data;
    } catch (error) {
      throw new Error('Ошибка добавления навыка');
    }
  }

  static async editMaster(id: number, formData: EditMasterFormData): Promise<EditMasterFormData> {
    try {
      const response = await masterInstance.patch<EditMasterFormData>(
        `/api/masters/${id}`,
        formData,
      );
      return response.data;
    } catch (error) {
      throw new Error('Ошибка редактирования данных');
    }
  }

  static async editImg(formData: EditMasterImgThanck): Promise<MasterType> {
    const response = await masterInstance.put<MasterType>(`/api/masters/${formData.id}`, formData);
    // const authState: AuthState = {
    //   ...response.data,
    //   user: { ...response.data.user, status: 'authenticated' },
    // };

    console.log(response.data);
    if (response.status === 200) return response.data;
    return Promise.reject(new Error('Error editing on server'));
  }
}

export default MasterService;
