import {Epic} from "redux-observable";
import {Action} from "redux";
import {ajax} from 'rxjs/ajax';
import {RootState} from "./root-state";

export type EpicDependencies = { ajax: typeof ajax, apiUrl: string };
export type AppEpic<Input extends Action = Action, Output extends Input = Input> = Epic<Input, Output, RootState, EpicDependencies>;