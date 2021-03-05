import {Action} from "redux";
import {RootState, rootReducer} from "../shared";
import {initAction} from "./init-action";

export function createRootState(...actions: Array<Action>): RootState {
    const initialState = rootReducer(undefined, initAction());
    return actions.reduce((state: RootState, action: Action) => rootReducer(state, action), initialState);
}