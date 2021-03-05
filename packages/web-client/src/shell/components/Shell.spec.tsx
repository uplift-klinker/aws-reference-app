import {render, screen} from '@testing-library/react';
import React from 'react';
import {Shell} from "./Shell";

describe('Shell', () => {
    test('when rendered then shows welcome message', () => {
        render(<Shell />);

        expect(screen.getByLabelText('welcome')).toBeInTheDocument();
    })
})