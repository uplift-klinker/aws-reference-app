import {useAppDispatch} from "../../shared";
import {useEffect} from "react";
import {ShellActions} from "../state";
import {useShellMessage} from "../state/shell-selectors";

export const Shell = () => {
    const dispatch = useAppDispatch();
    const message = useShellMessage();
    const text = message ? message : 'loading...';
    useEffect(() => {
        dispatch(ShellActions.loadMessageRequest());
    });
    return (
        <div aria-label="welcome">
            {text}
        </div>
    )
}