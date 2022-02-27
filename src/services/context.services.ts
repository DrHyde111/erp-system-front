import {useContext, createContext, Dispatch, SetStateAction} from "react";

interface IAppContext {
    isAuthenticated: boolean;
    setUserHasAuthenticated?: Dispatch<SetStateAction<boolean>>;
    user: any;
    setUser?: Dispatch<SetStateAction<any>>;
}

export const AppContext = createContext<IAppContext>({isAuthenticated: false, user: false});

export function useAppContext() {
    return useContext(AppContext);
}