import './AppLayout.css';
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Bell, LogOut } from "lucide-react"; 
import { useAuth } from '../../skillswap.shared/components/authentication/AuthContext';
import WebLogo from '../../resources/images/skillswap.png';
import RoundedButton from '../../skillswap.shared/components/RoundedButton';
import NotificationDropdown from './../components/NotificationDropdown'; 
import { MockMessageData } from './../../skillswap.shared/data/MessagesData'; 
import { MockMatchData } from './../../skillswap.shared/data/UsersData'; 

export function AppLayout() {
    document.title = "Ucz się od innych zupełnie za darmo - SkillSwap";
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth(); 

    const [user, setUser] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false); 

    const piotr = useMemo(() => MockMatchData.AllMatches.find(u => u.name === 'Piotr'), []);
    
    const piotrGuid = piotr ? piotr.guid : null; 

    const getUnansweredCount = () => {
        const currentUserId = auth?.session?.Guid || piotrGuid; 

        if (!currentUserId) return 0;
        
        const chats = MockMessageData.getChats();
        let count = 0;
        
        chats.forEach(chat => {
            if (chat.messages.length > 0) {
                const lastMessage = chat.messages[chat.messages.length - 1];
                
                if (lastMessage.senderId !== currentUserId) {
                    count++;
                }
            }
        });
        return count;
    };
    
    const unansweredCount = getUnansweredCount(); 

    const toggleNotifications = (e) => {
        e.stopPropagation(); 
        setShowNotifications(prev => !prev);
    };


    const navigateToView = (url) => {
        navigate(url);
    };

    const navigateToMyAccount = () => {
        navigate('/app/my/account');
    };

    useEffect(() => {
        if (!auth) {
            setIsLoading(false);
            return;
        }

        let isMounted = true;
        
        const checkAuthStatus = async () => {
            setIsLoading(true);
            try {
                const userGuid = auth.session?.Guid; 
                
                let loadedUser = null;

                if (userGuid) {
                    loadedUser = MockMatchData.getByGuid(userGuid); 
                }
                
                if (isMounted) {
                    setUser(loadedUser);
                }

            } catch (error) {
                console.error("Błąd ładowania sesji/danych użytkownika:", error);
                if (isMounted) {
                    setUser(null); 
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        checkAuthStatus();
        
        return () => {
            isMounted = false; 
        };
        
    }, [auth]); 

    useEffect(() => {
        window.scrollTo(0, 0);
        setShowNotifications(false); 
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
            
            {showNotifications && (
                <NotificationDropdown 
                    piotrGuid={piotrGuid} 
                    onClose={() => setShowNotifications(false)}
                />
            )}

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
                        <div className="notifications-container"> 
                            <button 
                                className="icon-button notification-button"
                                onClick={toggleNotifications}
                                aria-label="Powiadomienia"
                            >
                                <Bell size={20} />
                                {unansweredCount > 0 && (
                                    <span className="notification-badge">{unansweredCount}</span>
                                )}
                            </button>
                        </div>
                        
                        <button
                            className="profile-icon-button"
                            onClick={navigateToMyAccount}
                            aria-label="Mój profil"
                        >
                            <img src={user.imageUrl} alt="Avatar użytkownika" className="user-avatar-small" />
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
                         <div className="notifications-container">
                            <button 
                                className="icon-button notification-button"
                                onClick={toggleNotifications}
                                aria-label="Powiadomienia"
                            >
                                <Bell size={20} />
                                {unansweredCount > 0 && (
                                    <span className="notification-badge">{unansweredCount}</span>
                                )}
                            </button>
                        </div>
                        <button
                            className="profile-icon-button"
                            onClick={navigateToMyAccount}
                            aria-label="Mój profil"
                        >
                            <img src={user.imageUrl} alt="Avatar użytkownika" className="user-avatar-small" />
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