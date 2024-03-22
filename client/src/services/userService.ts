import axios from 'axios';
import type { EditUserFormData, UserSliceType, UserType } from '../types/auth';

export const userInstance = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

class UserService {
  static async getAllUsers(): Promise<UserType[]> {
    const response = await userInstance.get<UserType[]>('/api/user/');
    if (response.status === 200) return response.data;
    return Promise.reject(new Error('get users server error'));
  }


}


export default UserService;
