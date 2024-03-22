import axios from 'axios';
import type {
  AuthState,
  BackendAuth,
  EditImgFormData,
  EditUserFormData,
  LoginFormData,
  SignupFormData,
  UserType,
} from '../types/auth';

export const authInstance = axios.create({
  baseURL: 'http://localhost:3002',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

class AuthService {
  static async refresh(): Promise<AuthState> {
    const respons = await authInstance.get<AuthState>('/tokens/refresh');
    return respons.data;
  }

  static async login(formData: LoginFormData): Promise<AuthState> {
    const respons = await authInstance.post<BackendAuth>('/auth/login', formData);
    const authState: AuthState = {
      ...respons.data,
      user: { ...respons.data.user, status: 'authenticated' },
    };
    return authState;
  }

  static async signup(formData: SignupFormData): Promise<AuthState> {
    const respons = await authInstance.post<{ user: UserType; accessToken: string }>(
      '/auth/signup',
      formData,
    );
    const authState: AuthState = {
      ...respons.data,
      user: { ...respons.data.user, status: 'authenticated' },
    };
    return authState;
  }

  static async logout(): Promise<void> {
    try {
      await authInstance.post('/auth/logout');
    } catch (error) {
      console.log(error);
    }
  }

  static async check(): Promise<AuthState> {
    const respons = await authInstance.get<{ user: UserType; accessToken: string }>('/auth/check');
    const authState: AuthState = {
      ...respons.data,
      user: { ...respons.data.user, status: 'authenticated' },
    };
    return authState;
  }

  static async editUser(formData:EditUserFormData): Promise<AuthState> {
    const response = await authInstance.put<BackendAuth>(`/auth/${formData.id}`, formData);
    const authState: AuthState = {
      ...response.data,
      user: { ...response.data.user, status: 'authenticated' },
    };
    if (response.status === 200) return authState;
    return Promise.reject(new Error('Error editing on server'));
  }

  static async editImg(formData:EditImgFormData): Promise<AuthState> {
    const response = await authInstance.patch<BackendAuth>(`/auth/${formData.id}`, formData);
    const authState: AuthState = {
      ...response.data,
      user: { ...response.data.user, status: 'authenticated' },
    };
    if (response.status === 200) return authState;
    return Promise.reject(new Error('Error editing on server'));
  }

  static async confirm(formData: SignupFormData): Promise<void> {
   const respons = await authInstance.post('/auth/confirm', formData);
   console.log('RESPONS CONFIRM SERVICES',respons)
  }
}

export default AuthService;
