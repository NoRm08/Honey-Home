import axios from 'axios';
import type { PayForm, UserType } from '../types/auth';
import type { PayForm, UserType } from '../types/auth';

export const apiInstance = axios.create({
  baseURL: 'http://localhost:3001/',
  withCredentials: true,
});

class ApiServices {
  static async subscribePay(formData:PayForm): Promise<AuthState>{
    const respons = await apiInstance.post('/api/subscribe', formData);
    return respons.data;
  }
}

export default ApiServices;

