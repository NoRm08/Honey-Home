import { createAsyncThunk } from '@reduxjs/toolkit';
import OrderService from '../../services/orderService';
import type { EditOrderType, OrderAcceptData, OrderAddFormType, OrderType } from '../../types/order';

export const thunkAddOrder = createAsyncThunk(
  'orderSlice/thunkAddOrder',
  (formData: OrderAddFormType) => OrderService.addNewOrder(formData),
);
export const thunkGetOrders = createAsyncThunk('orderSlice/getOrders', () =>
  OrderService.getOrders(),
);

export const thunkAcceptOrders = createAsyncThunk(
  'orderSlice/acceptOrder',
  (data: OrderAcceptData) => OrderService.acceptOrder(data),
);


export const thunkEditOrder = createAsyncThunk('orderSlice/thunkEditOrder',(formData:EditOrderType)=> OrderService.editOrder(formData))

export const thunkAcceptStatus = createAsyncThunk('orderSlice/thunkAcceptStatus', (id: OrderType['id']) => OrderService.acceptStatus(id))


export const thunkDeleteOrder = createAsyncThunk('orderSlice/thunkDeleteOrder', (id: OrderType['id'])=> OrderService.deleteOrder(id))