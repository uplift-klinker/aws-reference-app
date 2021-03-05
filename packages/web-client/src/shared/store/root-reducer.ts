import {combineReducers} from "redux";
import {shellReducer} from "../../shell";
import {RootState} from "./root-state";

export const rootReducer = combineReducers<RootState>({
    shell: shellReducer
})