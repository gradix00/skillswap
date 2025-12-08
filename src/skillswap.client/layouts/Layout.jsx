import './Layout.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Facebook, Instagram, Youtube, X as IconX, Menu } from "lucide-react";
import { BiNotepad, BiWrench, BiUser } from 'react-icons/bi';
import { useAuth } from '../../skillswap.shared/components/authentication/AuthContext';
import WebLogo from '../../resources/images/skillswap.png';
import WebLogo_OnlyIcon from '../../resources/images/skillswap_only_icon.png';
import RoundedButton from '../../skillswap.shared/components/RoundedButton';
import AccountIcon from '../../resources/images/account-icon.png';
import ButtonOnlyText from '../../skillswap.shared/components/ButtonOnlyText';

export function Layout() {
    document.title = "Ucz się od innych zupełnie za darmo - SkillSwap";
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState();
    const [profile, setProfile] = useState();

    const toggleMenu = () => setMenuOpen(v => !v);

    const navigateToView = (url) => {
        navigate(url);
        setMenuOpen(false);
    };

    const navigateToMyAccount = () => {
        navigate('/account/details');
        setMenuOpen(false);
    };

    useEffect(() => {
        const updateUI = async () => {
            try {
                if (auth?.session == null) {
                    setUser(null);
                    return;
                }
                setUser(auth.session.user);
            } catch {
                setUser(null);
            }
        };

        const fetchData = async () => {
            try {
                if (auth?.session == null) return;

                navigate('/app');
            } catch {
                // ignore
            }
        };

        updateUI();
        fetchData();
    }, [auth]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        document.body.classList.toggle('no-scroll', menuOpen);
        return () => document.body.classList.remove('no-scroll');
    }, [menuOpen]);

    return (
        <div id="layout" className={menuOpen ? 'shifted' : ''}>
            {/* Desktop header */}
            <header className="desktop-header">
                <div className="left-section">
                    <button
                        className="logo-container"
                        onClick={() => navigateToView('/')}
                    >
                        <img src={WebLogo} alt="SkillSwap Logo" id="logo" />
                    </button>
                </div>

                <div className="right-section">
                    <nav>
                        <ul className="nav-links">
                            <li>
                                <ButtonOnlyText
                                    navigationUrl='/about'
                                    onClick={() => navigate('/about')}
                                    text='O nas'
                                />
                            </li>
                            <li>
                                <ButtonOnlyText
                                    navigationUrl='/contact'
                                    onClick={() => navigate('/contact')}
                                    text='Kontakt'
                                />
                            </li>
                        </ul>
                    </nav>

                    {user ? (
                        <RoundedButton
                            navigationUrl='/profile'
                            text='Mój profil'
                            onClick={() => navigateToMyAccount()}
                        />
                    ) : (
                        <RoundedButton
                            navigationUrl='/shared/login'
                            text='Zaloguj się'
                            onClick={() => navigateToView('/shared/login')}
                        />
                    )}
                </div>
            </header>

            {/* Mobile header */}
            <header className="mobile-header">
                <button
                    className="logo-container mobile-logo"
                    onClick={() => navigateToView('/')}
                >
                    <img src={WebLogo} alt="SkillSwap Logo" id="logo" />
                </button>
                <button
                    className="menu-button"
                    onClick={toggleMenu}
                    aria-label="Otwórz nawigację"
                    aria-controls="mobile-sidebar"
                    aria-expanded={menuOpen}
                >
                    <Menu size={28} />
                </button>
            </header>

            {/* Mobile sidebar */}
            <nav
                id="mobile-sidebar"
                className={`sidebar-nav ${menuOpen ? 'open' : ''}`}
                role="dialog"
                aria-modal="true"
            >
                <div className="sidebar-header">
                    {user ? (
                        <div className="user-info-mobile">
                            <img src={AccountIcon} alt="Avatar" className="user-avatar" />
                            <span>{user?.first_name} {user?.last_name}</span>
                        </div>
                    ) : (
                        <RoundedButton
                            text="Zaloguj się"
                            onClick={() => navigateToView('/shared/login')}
                        />
                    )}

                    <button
                        onClick={toggleMenu}
                        className="close-button"
                        aria-label="Zamknij nawigację"
                    >
                        <IconX size={24} />
                    </button>
                </div>

                <ul className="sidebar-links">
                    <li>
                        <button onClick={() => navigateToView('/about')}>
                            <BiNotepad size={22} /><span>O nas</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => navigateToView('/contact')}>
                            <BiWrench size={22} /><span>Kontakt</span>
                        </button>
                    </li>
                    {user && (
                        <li>
                            <button onClick={() => navigateToView('/profile')}>
                                <BiUser size={22} /><span>Mój profil</span>
                            </button>
                        </li>
                    )}
                </ul>
            </nav>

            {menuOpen && (
                <div
                    className="overlay"
                    onClick={toggleMenu}
                    aria-hidden="true"
                />
            )}

            {/* Main content */}
            <div className="main">
                <div className="content">
                    <Outlet />
                </div>
            </div>

            {/* Flat footer */}
            <footer className="footer">
                <div className="footer-inner">

                    <div className="footer-top">
                        <div className="footer-company">
                            <img src={WebLogo_OnlyIcon} alt="SkillSwap Logo" />
                            <h2>SkillSwap</h2>
                        </div>

                        <div className="social-links">
                            <a href="https://www.facebook.com/profile.php?id=61583351083758" target="_blank" aria-label="Facebook" rel="noopener noreferrer"><Facebook /></a>
                            <a href="https://www.instagram.com/inforower.pl/" target="_blank" aria-label="Instagram" rel="noopener noreferrer"><Instagram /></a>
                            <a href="https://www.youtube.com/@inforower" target="_blank" aria-label="YouTube" rel="noopener noreferrer"><Youtube /></a>
                            <a href="https://x.com" target="_blank" aria-label="Twitter (X)" rel="noopener noreferrer"><IconX /></a>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>© 2025 SkillSwap – Wszystkie prawa zastrzeżone</p>

                        <div className="footer-bottom-links">
                            <a href="/shared/statute" target="_blank" rel="noopener noreferrer">Regulamin</a>
                            <span>•</span>
                            <a href="/shared/privacy-policy/user" target="_blank" rel="noopener noreferrer">Polityka prywatności</a>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    );
}

export default Layout;