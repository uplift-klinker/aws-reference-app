import {createStore, applyMiddleware} from "redux";
import {createEpicMiddleware} from "redux-observable";
import { ajax } from 'rxjs/ajax';
import {SettingsModel} from "../settings";
import {rootReducer} from "./root-reducer";
import {rootEpic} from "./root-epic";

export function configureStore(settings: SettingsModel) {
    const epicMiddleware = createEpicMiddleware({
        dependencies: {ajax: ajax, apiUrl: settings.apiUrl}
    });
    const store = createStore(
        rootReducer,
        applyMiddleware(
            epicMiddleware
        )
    );

    // @ts-ignore
    epicMiddleware.run(rootEpic);
    return store;
}