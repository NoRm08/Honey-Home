import type { SkillType } from '../skills';

export type UserType = {
  id: number;
  name: string;
  email: string;
  role: string;
  img: string;
  address: string;
  telephone: string;
  subscribeLevl: string;
};

export type EditUserFormData = {
  id: number;
  name: string;
  img: string;
  address: string;
  telephone: string;
};

export type EditImgFormData = {
  id: number;
  img: string;
};

export type MasterType = {
  id: number;
  name: string;
  email: string;
  telephone: string;
  img: string;
  experience: string;
  raiting: string;
  MasterSkills: MasterSkills[];
};

export type EditMasterFormData = {
  id: HTMLInputElement;
  name: HTMLInputElement;
  telephone: HTMLInputElement;
  experience: HTMLInputElement;
};

export type EditMasterImgThanck = {
  id: number;
  img: string;
  MasterSkills: SkillType[];
};

export type Skill = {
  id: number;
  name: string;
};

export type MasterSkills = {
  id: number;
  masterId: number;
  skillId: number;
  Skill: Skill;
};

export type MasterSliceState = {
  originalMasters: MasterType[];
  masters: MasterType[];
  MasterSkills: MasterSkills[];
};

export type UserState =
  | { status: 'pending' }
  | { status: 'guest' }
  | ({ status: 'authenticated' } & UserType);

export type AuthState = {
  user: UserState;
  accessToken: string;
};

export type BackendAuth = {
  user: UserType;
  accessToken: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupMasterFormData = {
  email: string;
  name: string;
  password: string;
  expreience: string;
};

export type SignupFormData = {
  email: string;
  name: string;
  password: string;
};

export type AuthSliceState = AuthState;

export type PayForm = {
  card: string;
  month: string;
  year: string;
  cvv: string;
};

export type SubscribePayResponseType = {
  subscribeLevl: string;
};

export type UserSliceType = {
  originalUsers: UserType[];
  users: UserType[];
  dateExp: Date;
};
