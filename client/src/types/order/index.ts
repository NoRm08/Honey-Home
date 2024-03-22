import type { MasterType, UserType } from '../auth';
import type { ProblemType } from '../skills';

export type OrderType = {
  id: number;
  status: string;
  dateOpen: string;
  dateExp: string;
  priority: boolean;
  userId: number;
  problemId: number;
  masterId: number;
  userAccept: boolean;
  masterAccept: boolean;
  problemImg: string | null;
  comment: string;
  createdAt: string;
  updatedAt: string;
  User: UserType;
  Problem: ProblemType;
  Master: MasterType;
};

export type OrderAddFormType = {
  problemId: number;
  comment: string;
  userId: number;
  priority: boolean;
};

export type EditOrderType = {
  id: number;
  comment: string;
}

export type OrderAcceptData = {
    id: number;
    masterName: string;
    masterId: number;
    orderId: number;
    dateExp: string;
}

export type OrderSliceType = OrderType[];
