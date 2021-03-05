import {useRootSelector} from "../../shared";

export const useShellMessage = () => useRootSelector(s => s.shell.message);