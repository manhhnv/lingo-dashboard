import { combineReducers } from "redux";
import adminReducer from "./adminSlice";

const rootReducer = combineReducers({
    admin: adminReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
