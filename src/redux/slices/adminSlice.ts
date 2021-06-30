import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Admin } from "../../types/Admin";

const initialState: Admin = { };

const adminSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {
        queryMe: (state, action: PayloadAction<Admin>) => {
            if (action.payload) {
                state.email = action.payload.email;
                state.displayName = action.payload.displayName;
                return state;
            }
        },
        logout: (state, action) => {
            state = initialState;
            return state;
        },
        login: (state, action: PayloadAction<Admin>) => {
            if (action.payload) {
                state = action.payload;
                return state;
            }
        }
    }
});

export const { queryMe, login, logout } = adminSlice.actions;
export default adminSlice.reducer;
