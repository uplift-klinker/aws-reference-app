import {ofType} from "redux-observable";
import {ShellActions} from "../state";
import {catchError, map, mergeMap} from "rxjs/operators";
import {AppEpic} from "../../shared/store/app-epic";
import {MessageModel} from "../models";
import {of} from "rxjs";

export const messageEpic: AppEpic = (action$, state$, {ajax, apiUrl}) => action$.pipe(
    ofType(ShellActions.loadMessageRequest.type),
    mergeMap(() => ajax.getJSON<MessageModel>(`${apiUrl}`).pipe(
        map(model => ShellActions.loadMessageSuccess(model)),
        catchError(err => of(ShellActions.loadMessageFailed(err)))
    ))
)