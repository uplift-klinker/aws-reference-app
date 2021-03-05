import * as React from 'react';
import {render} from 'react-dom';
import './index.css';
import {Shell} from "./shell";
import {configureStore, loadSettings, SettingsModel} from "./shared";
import {Provider} from "react-redux";

function startApp(settings: SettingsModel) {
    const store = configureStore(settings);
    render(
        <Provider store={store}>
            <Shell/>
        </Provider>,
        document.getElementById('root')
    );
}

async function main() {
    const settings = await loadSettings();
    startApp(settings);
}

main()
    .catch(err => console.error(err));

