import {combineEpics} from "redux-observable";
import {messageEpic} from "../../shell";

export const rootEpic = combineEpics(
    messageEpic
);