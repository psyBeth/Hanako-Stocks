import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: "",
    loading: "",
    error: "",
    token: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        fetchStart: () => {},
        loginSuccess: () => {},
        fetchFail: () => {},
    },
});

export const { fetchStart, loginSuccess, fetchFail } = authSlice.actions;
export default authSlice.reducer;