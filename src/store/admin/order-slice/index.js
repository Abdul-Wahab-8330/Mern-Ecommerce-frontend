import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


const initialState = {
    orderList: [],
    orderDetails:null
}



export const getAllOrdersForAdmin = createAsyncThunk('/order/getAllOrdersForAdmin', async()=>{

    const response = await axios.get(`https://mern-ecommerce-backend-4-rbxc.onrender.com/api/admin/orders/get`)

    return response.data;
})

export const getOrderDetailsForAdmin = createAsyncThunk('/order/getOrderDetailsForAdmin', async(id)=>{

    const response = await axios.get(`https://mern-ecommerce-backend-4-rbxc.onrender.com/api/admin/orders/details/${id}`)

    return response.data;
})


export const updateOrderStatus = createAsyncThunk('/order/updateOrderStatus', async({id, orderStatus})=>{

    const response = await axios.put(`https://mern-ecommerce-backend-4-rbxc.onrender.com/api/admin/orders/update/${id}`,
        {
            orderStatus
        }
    )

    return response.data;
})



const adminOrderSlice = createSlice({
    name: 'adminOrderSlice',
    initialState,
    reducers:{ 
        resetOrderDetails:(state)=>{
            state.orderDetails = null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllOrdersForAdmin.pending, (state)=>{
                    state.isLoading = true
                }).addCase(getAllOrdersForAdmin.fulfilled, (state,action)=>{
                    state.isLoading = true
                    state.orderList = action.payload.data 
                }).addCase(getAllOrdersForAdmin.rejected, (state)=>{
                    state.isLoading = true
                    state.orderList = []
                }).addCase(getOrderDetailsForAdmin.pending, (state)=>{
                    state.isLoading = true
                }).addCase(getOrderDetailsForAdmin.fulfilled, (state,action)=>{
                    state.isLoading = true
                    state.orderDetails = action.payload.data 
                }).addCase(getOrderDetailsForAdmin.rejected, (state)=>{
                    state.isLoading = true
                    state.orderDetails = null
                })
    }
})


export const {resetOrderDetails} = adminOrderSlice.actions

export default adminOrderSlice.reducer