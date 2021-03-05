import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState} from "./root-state";

export const useAppDispatch = () => useDispatch();
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;