import configureMockStore, {MockStore} from 'redux-mock-store';
import {Action} from "redux";
import {RootState} from "../../shared";
import {createRootState} from "../create-state";

export type FakeStore = MockStore<RootState, Action>;

export function createFakeStore(...actions: Array<Action>): FakeStore {
    const initialState = createRootState(...actions);
    return configureMockStore<RootState, Action>([])(initialState);
}
