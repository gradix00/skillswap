import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useRef, useState } from "react";
import LoadingIndicator from "../commons/LoadingIndicator";

const SessionContext = createContext();

export const useAuth = () => {
    return useContext(SessionContext);
};

export const AuthContext = ({ children }) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const sessionFetched = useRef(false); 

    const fetchSession = async () => {
        setLoading(true);
        try {
            const userCookie = Cookies.get('skillswap-user');
            let user = null;

            if (userCookie) {
                try {
                    user = JSON.parse(userCookie);

                    setSession({
                        Id: user.id,
                        Guid: user.guid,
                        FirstName: user.first_name,
                        LastName: user.last_name,
                        Username: user.username,
                        BirthDate: new Date(user.birth_date)
                    });
                } catch (e) {
                    console.error("incorrect cookies format");
                }
            }
            else {
                setSession(null);
                console.error("not exists");
            }
        } catch (error) {
            console.warn("Failed to fetch session:", error);
            setSession(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!sessionFetched.current) {
            fetchSession(); 
            sessionFetched.current = true;
        }
    }, []);

    const refreshSession = async () => {
        await fetchSession();
    };

    if (loading) {
        <LoadingIndicator />
    }

    return (
        <SessionContext.Provider value={{ session, refreshSession }}>
            {children}
        </SessionContext.Provider>
    );
};

export default AuthContext;