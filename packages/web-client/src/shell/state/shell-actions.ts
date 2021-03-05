import {MessageModel} from "../models";
import {createAction} from "@reduxjs/toolkit";

export const ShellActionTypes = {
    loadMessageRequest: '[Shell] Load Message Request',
    loadMessageSuccess: '[Shell] Load Message Success',
    loadMessageFailed: '[Shell] Load Message Failed'
}

export const ShellActions = {
    loadMessageRequest: createAction(ShellActionTypes.loadMessageRequest),
    loadMessageSuccess: createAction(ShellActionTypes.loadMessageSuccess, (model: MessageModel) => ({payload: model})),
    loadMessageFailed: createAction(ShellActionTypes.loadMessageFailed, (err: any) => ({payload: err}))
}