import {useContext, createContext, Dispatch, SetStateAction} from "react";

interface IAppContext {
    isAuthenticated: boolean;
    setUserHasAuthenticated?: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<IAppContext>({isAuthenticated: false});

export function useAppContext() {
    return useContext(AppContext);
}