import axios from 'axios';
import type { OrderSliceType } from '../types/orders';
import { OrderAddFormType, OrderAcceptData, OrderType, EditOrderType } from '../types/order';

export const orderInstance = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

class OrderService {
  static async getOrders(): Promise<OrderSliceType[]> {
    const response = await orderInstance.get<OrderSliceType[]>('/api/order/');
    return response.data;
  }

  static async addNewOrder(formData: any): Promise<OrderType> {
    const response = await orderInstance.post<OrderType>('api/order/', formData);
    if (response.status === 201) return response.data;
    return Promise.reject(new Error('adding product server error'));
  }

  static async acceptOrder(date: OrderAcceptData): Promise<OrderType> {
    const response = await orderInstance.patch<OrderType>('api/order/accept', date);
    if (response.status === 200) return response.data;
    return Promise.reject(new Error('accepting order server error'));
}

  static async deleteOrder(orderId: OrderType['id']): Promise<OrderType['id']>{
    const response = await orderInstance.delete(`/api/order/${orderId}`);
    if (response.status !== 200) return Promise.reject(new Error('Error deleting from server'));
    return orderId;
  }

  static async editOrder(formData: EditOrderType): Promise<OrderType>{
    const response = await orderInstance.put<OrderType>(`/api/order/${formData.id}`, formData);
    if(response.status === 200) return response.data;
    return Promise.reject(new Error('Error editing on server'));
  }
  
  static async acceptStatus(id:OrderType['id']): Promise<OrderType>{
    const response = await orderInstance.patch<OrderType>(`/api/order/${id}`) 
    if(response.status === 200) return response.data;
    return Promise.reject(new Error('Error editing on server'));
  }
}



export default OrderService;
