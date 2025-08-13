import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    isLoading: false,
    addressList:[]
}

export const addNewAddress = createAsyncThunk('/addresses/addnewaddress', async(FormData)=>{
    const response = await axios.post('https://mern-ecommerce-backend-4-rbxc.onrender.com/api/shop/address/add',FormData)
    return response.data;
})
export const fetchAllAddress = createAsyncThunk('/addresses/fetchAllAddress', async(userId)=>{
    const response = await axios.get(`https://mern-ecommerce-backend-4-rbxc.onrender.com/api/shop/address/get/${userId}`)
    return response.data;
})
export const editAddress = createAsyncThunk('/addresses/editAddress', async({userId, addressId, FormData})=>{
    const response = await axios.put(`https://mern-ecommerce-backend-4-rbxc.onrender.com/api/shop/address/update/${userId}/${addressId}`,FormData)
    return response.data;
})
export const deleteAddress = createAsyncThunk('/addresses/deleteAddress', async({userId, addressId})=>{
    const response = await axios.delete(`https://mern-ecommerce-backend-4-rbxc.onrender.com/api/shop/address/delete/${userId}/${addressId}`)
    return response.data;
})


const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addNewAddress.pending, (state)=>{
            state.isLoading = true
        }).addCase(addNewAddress.fulfilled, (state,)=>{
            state.isLoading = false
        }).addCase(addNewAddress.rejected, (state)=>{
            state.isLoading = false;
        }).addCase(fetchAllAddress.pending, (state)=>{
            state.isLoading = true
        }).addCase(fetchAllAddress.fulfilled, (state,action)=>{
            state.isLoading = false
            state.addressList = action.payload.data
        }).addCase(fetchAllAddress.rejected, (state)=>{
            state.isLoading = false;
            state.addressList = []
        })
    }  
})

export default addressSlice.reducer