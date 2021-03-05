import {createReducer} from "@reduxjs/toolkit";
import {ShellState} from "./shell-state";
import {ShellActions} from "./shell-actions";

const initialState: ShellState = {
    message: null
}

export const shellReducer = createReducer(initialState, builder => {
    builder.addCase(ShellActions.loadMessageSuccess, (state, action) => {
        state.message = action.payload.message
    })
})
