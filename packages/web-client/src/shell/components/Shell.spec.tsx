import {render, screen} from '@testing-library/react';
import React from 'react';
import {Shell} from "./Shell";
import {createFakeStore, renderWithProvider} from "../../testing";
import {ShellActions} from "../state";

describe('Shell', () => {
    test('when rendered then shows loading', () => {
        renderWithProvider(<Shell />);

        expect(screen.getByLabelText('welcome')).toHaveTextContent('loading');
    })

    test('when rendered then loads message', () => {
        const store = createFakeStore();

        renderWithProvider(<Shell />, store);

        expect(store.getActions()).toContainEqual(ShellActions.loadMessageRequest());
    })

    test('when rendered with message text then message text is shown', () => {
        const store = createFakeStore(ShellActions.loadMessageSuccess({message: 'my custom message'}));

        renderWithProvider(<Shell />, store);

        expect(screen.getByLabelText('welcome')).toHaveTextContent('my custom message');
    })
})