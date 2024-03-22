import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import {
  thunkAcceptOrders,
  thunkAcceptStatus,
  thunkAddOrder,
  thunkDeleteOrder,
  thunkEditOrder,
  thunkGetOrders,
} from './orderThunk';
import type { OrderAcceptData, OrderSliceType, OrderType } from '../../types/order';

const initialState: OrderSliceType = [];

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    addMaster: (state, action: PayloadAction<OrderAcceptData>) => {
      const { masterName, orderId, dateExp, masterId } = action.payload;

      // Используем функцию findIndex для поиска индекса элемента с нужным orderId
      const orderIndex = state.findIndex((order) => order.id === orderId);

      if (orderIndex !== -1) {
        // Создаем копию объекта, чтобы избежать мутации
        const updatedOrder = {
          ...state[orderIndex],
          Master: { name: masterName },
          dateExp,
          masterId,
        };

        // Используем Immer для обновления массива
        state.splice(orderIndex, 1, updatedOrder);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkAddOrder.fulfilled, (state, action: PayloadAction<OrderType>) => {
      state.unshift(action.payload);
    });
    builder.addCase(
      thunkGetOrders.fulfilled,
      (state, action: PayloadAction<OrderSliceType>) => action.payload,
    );

    builder.addCase(thunkEditOrder.fulfilled, (state, action) => {
      const index = state.findIndex((order) => order.id === action.payload.id);
      if (index !== -1) {
        state[index].comment = action.payload.comment;
      }
    });

    builder.addCase(thunkAcceptStatus.fulfilled, (state, action) => {
      const indexOrder = state.findIndex((order) => order.id === action.payload.id);
      if (indexOrder !== -1) {
        state[indexOrder] = action.payload;
      }
    });
    
    builder.addCase(thunkAcceptOrders.fulfilled, (state, action: PayloadAction<OrderType>) => {
      const index = state.findIndex((order) => order.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    });

    builder.addCase(thunkDeleteOrder.fulfilled,(state,action)=> {
      const index = state.findIndex((order)=> order.id === action.payload)
      state.splice(index,1)
    });
  },
  });
  

export const { addMaster } = orderSlice.actions;

export default orderSlice.reducer;
