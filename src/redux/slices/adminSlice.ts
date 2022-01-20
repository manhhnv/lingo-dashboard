import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Admin } from "../../types/Admin";
import { getProfile } from "../../apis/login";

export const fetchProfile = createAsyncThunk(
    'admin/fetchProfile',
    async () => {
        const cached = localStorage.getItem('persist:root')
        const token = (JSON.parse(JSON.parse(String(cached))['admin'])['token']);
        if (token) {
            const data = await getProfile(token);
            return data;
        }
    }
)


const initialState: Admin = {};

const adminSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {
        queryMe: (state, action: PayloadAction<Admin>) => {
            if (action.payload) {
                state.email = action.payload.email;
                state.displayName = action.payload.displayName;
                state.avatar = action.payload.avatar;
                return state;
            }
        },
        logout: (state, _) => {
            state = initialState;
            return state;
        },
        login: (state, action: PayloadAction<Admin>) => {
            if (action.payload) {
                state = action.payload;
                return state;
            }
        }
    },
    extraReducers: (builder) => [
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            if (action.payload) {
                state.email = action.payload.email;
                state.displayName = action.payload.displayName;
                state.avatar = action.payload.avatar;
            }
            else {
                state = initialState;
            }
            return state;
        }),
        builder.addCase(fetchProfile.rejected, (state, action) => {
            state = initialState;
            return state;
        })
    ]
});

export const { queryMe, login, logout } = adminSlice.actions;
export default adminSlice.reducer;
