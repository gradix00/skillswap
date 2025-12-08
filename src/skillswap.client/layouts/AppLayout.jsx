import './AppLayout.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Bell, LogOut } from "lucide-react"; 
import { BiNotepad, BiWrench, BiUser } from 'react-icons/bi';
import { useAuth } from '../../skillswap.shared/components/authentication/AuthContext';
import WebLogo from '../../resources/images/skillswap.png';
import RoundedButton from '../../skillswap.shared/components/RoundedButton';
import AccountIcon from '../../resources/images/account-icon.png';

const SIMULATED_SESSION = { 
    user: { id: 1, email: 'test@example.com' },
    profile: { firstname: 'Adam', lastname: 'Kowalczuk' }
};

export function AppLayout() {
    document.title = "Ucz się od innych zupełnie za darmo - SkillSwap";
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth(); 

    const [user, setUser] = useState(null); 
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigateToView = (url) => {
        navigate(url);
    };

    const navigateToMyAccount = () => {
        navigate('/account/details');
    };

    const handleSignOut = () => {
        setUser(null);
        setProfile(null);
        navigate('/');
    };

    useEffect(() => {
        let isMounted = true;
        
        const checkAuthStatus = async () => {
            setIsLoading(true);
            try {
                const sessionExists = SIMULATED_SESSION.user;

                if (sessionExists) {
                    if (isMounted) {
                        setUser(SIMULATED_SESSION.user);
                        setProfile(SIMULATED_SESSION.profile);
                    }
                } else {
                    if (isMounted) {
                        setUser(null);
                        setProfile(null);
                    }
                }
            } catch (error) {
                console.error("Błąd ładowania sesji:", error);
                if (isMounted) {
                    setUser(null);
                    setProfile(null);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        checkAuthStatus();
        
        return () => {
            isMounted = false; // Cleanup
        };
        
    }, [auth]); 

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    
    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>
                Ładowanie...
            </div>
        );
    }
    
    return (
        <div id="app-layout">

            <header className="desktop-header minimal-style">
                <div className="left-section">
                    <button
                        className="logo-container"
                        onClick={() => navigateToView('/')}
                        aria-label="Strona główna"
                    >
                        <img src={WebLogo} alt="SkillSwap Logo" id="logo" />
                    </button>
                </div>

                {user ? (
                    <div className="right-section auth-icons">
                        <button 
                            className="icon-button"
                            aria-label="Powiadomienia"
                        >
                            <Bell size={20} />
                        </button>
                        
                        <button
                            className="profile-icon-button"
                            onClick={navigateToMyAccount}
                            aria-label="Mój profil"
                        >
                            <img src={AccountIcon} alt="Avatar użytkownika" className="user-avatar-small" />
                        </button>
                        
                        <button
                            className="icon-button logout-button"
                            onClick={handleSignOut}
                            aria-label="Wyloguj się"
                        >
                            <LogOut size={20} />
                        </button>
                        
                    </div>
                ) : (
                    <div className="right-section">
                        <RoundedButton
                            navigationUrl='/shared/login'
                            text='Zaloguj się'
                            onClick={() => navigateToView('/shared/login')}
                        />
                    </div>
                )}
            </header>

            <header className="mobile-header">
                <button
                    className="logo-container mobile-logo"
                    onClick={() => navigateToView('/')}
                    aria-label="Strona główna"
                >
                    <img src={WebLogo} alt="SkillSwap Logo" id="logo" />
                </button>
                
                {user ? (
                    <div className="mobile-header-right">
                         <button 
                            className="icon-button"
                            aria-label="Powiadomienia"
                        >
                            <Bell size={20} />
                        </button>
                        <button
                            className="profile-icon-button"
                            onClick={navigateToMyAccount}
                            aria-label="Mój profil"
                        >
                            <img src={AccountIcon} alt="Avatar użytkownika" className="user-avatar-small" />
                        </button>

                        <button
                            className="icon-button logout-button"
                            onClick={handleSignOut}
                            aria-label="Wyloguj się"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                ) : (
                    <div className="mobile-header-right">
                        <RoundedButton
                            text="Zaloguj się"
                            onClick={() => navigateToView('/shared/login')}
                        />
                    </div>
                )}
            </header>


            <div className="main">
                <div className="content">
                    <Outlet />
                </div>
            </div>

        </div>
    );
}

export default AppLayout;