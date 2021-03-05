import React from 'react';
import {Provider} from "react-redux";
import {Action, Store} from "redux";
import {render} from "@testing-library/react";
import {RootState} from "../shared";
import {createFakeStore} from "./doubles";

export function renderWithProvider(component: JSX.Element, store?: Store<RootState, Action>) {
    store = store || createFakeStore();
    return render(
        <Provider store={store}>
            {component}
        </Provider>
    )
}