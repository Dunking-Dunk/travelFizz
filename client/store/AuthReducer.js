import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const authReducer = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        location: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setUserLocation: (state,action) => {
            state.location = action.payload
        }
    }
})

export const { setUser, setUserLocation } = authReducer.actions
export default authReducer.reducer