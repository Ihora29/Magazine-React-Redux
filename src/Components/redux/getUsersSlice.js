import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";




const initialUser = {
    users: []
};

export const fetchUsers = createAsyncThunk('getUsers', async () => {

    const response = await axios.get('http://localhost:3001/users-login');

    return (response.data)

});

export const sliceUsers = createSlice({
    name: 'userSlice',
    initialState: initialUser,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
    }
});

export default sliceUsers.reducer;