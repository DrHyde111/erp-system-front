import React, {useEffect, useState} from 'react';
import './styles/App.css';
import PublicSwitch from "./PublicSwitch";
import {AppContext} from './services/context.services';
import {checkCurrentSession} from "./services/auth.services";
import PrivateSwitch from "./PrivateSwitch";
import PublicHeader from "./components/PublicHeader";
import PrivateHeader from './components/PrivateHeader';

function App() {
    const [isAuthenticated, setUserHasAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        onLoad()
        setIsLoading(false)
    }, [])

    async function onLoad() {
        try {
            await checkCurrentSession();
            setUserHasAuthenticated(true);
        } catch (e) {
            setUserHasAuthenticated(false)
        }
    }

    return (
        <>
            {!isLoading ? (
                <>

                    {!isAuthenticated ? (
                        <>
                            <AppContext.Provider value={{isAuthenticated, setUserHasAuthenticated}}>
                                <PublicHeader/>
                                <PublicSwitch/>
                            </AppContext.Provider>
                        </>
                    ) : (
                        <>
                            <AppContext.Provider value={{isAuthenticated, setUserHasAuthenticated}}>
                                <PrivateHeader/>
                                <PrivateSwitch/>
                            </AppContext.Provider>
                        </>
                    )}
                </>
            ) : (
                <div>
                    <h1>Loading</h1>
                </div>
            )}
        </>
    );
}

export default App;
