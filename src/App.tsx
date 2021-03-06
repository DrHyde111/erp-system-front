import React, {useEffect, useState} from 'react';
import './styles/App.css';
import PublicSwitch from "./PublicSwitch";
import {AppContext} from './services/context.services';
import {checkCurrentSession} from "./services/api.services";
import PrivateSwitch from "./PrivateSwitch";
import PublicHeader from "./components/PublicHeader";
import PrivateHeader from './components/PrivateHeader';
import Loading from "./components/Loading";

function App() {
    const [isAuthenticated, setUserHasAuthenticated] = useState(false);
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {
            try {
                const response = await checkCurrentSession();
                setUser(response.employeeInfo);
                setUserHasAuthenticated(true);
            } catch (e) {
                console.log(e);
                setUserHasAuthenticated(false)
            }
            setIsLoading(false)
        }

        const result = onLoad()
    }, [])

    return (
        <>
            {!isLoading ? (
                <>
                    {!isAuthenticated ? (
                        <>
                            <AppContext.Provider value={{isAuthenticated, setUserHasAuthenticated, user, setUser}}>
                                <PublicHeader/>
                                <PublicSwitch/>
                            </AppContext.Provider>
                        </>
                    ) : (
                        <>
                            <AppContext.Provider value={{isAuthenticated, setUserHasAuthenticated, user, setUser}}>
                                <PrivateHeader/>
                                <PrivateSwitch/>
                            </AppContext.Provider>
                        </>
                    )}
                </>
            ) : (
                <Loading/>
            )}
        </>
    );
}

export default App;
