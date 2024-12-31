import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            return { ...action.payload };
        },
        updateUserdetails: (state, action) => {
            return { ...state, ...action.payload };
        },
        logout: () => {
            return initialState
        }
    }
})
export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
