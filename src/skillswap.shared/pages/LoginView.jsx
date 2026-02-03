import './LoginView.css';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RoundedTextBox } from '../components/RoundedTextBox';
import RoundedButton from '../components/RoundedButton';
import PeopleLearn from '../../resources/images/people-learn.png';
import { MockMatchData } from './../data/UsersData';

export function LoginView() {
    document.title = "Logowanie - SkillSwap";
    const navigate = useNavigate();

    const loginFunc = () => {
         const userData = MockMatchData.getByGuid('c1r1s1-m4n-4a7b-8c9d-0e1f2a3b4c5d');

        Cookies.set('skillswap-user', JSON.stringify(userData), {
            expires: 365, 
            sameSite: 'strict'
        });

        navigate('/app', { replace: true }); 
    };

    return (
        <div className="login-view">
            <div className="login-overlay">

                <div className="login-left">
                    <Link to='/'>
                        <img 
                            src={PeopleLearn} 
                            alt="SkillSwap logo" 
                            className="login-icon"
                        />
                    </Link>

                    <ul className="login-features">
                        <li>Ucz się od innych – zupełnie za darmo</li>
                        <li>Zdobywaj praktyczne umiejętności w realnym czasie</li>
                        <li>Otwarty dostęp do talentów z całego świata</li>
                        <li>Znajdź partnera do nauki pod swoje cele</li>
                        <li>Ucz się na dowolnym urządzeniu</li>
                    </ul>
                </div>

                <div className="login-right">
                    <Link to='/'><h2>SkillSwap</h2></Link>
                    <p>Zaloguj się, aby mieć pełne możliwości!</p>

                    <RoundedTextBox type="email" placeholder="user@example.com"/>
                    <RoundedTextBox type="password" placeholder="********"/>

                    <RoundedButton text='Zaloguj się' onClick={loginFunc}/>

                    <span className="login-register">
                        Nie masz konta? <Link to='/shared/register'><b>Zarejestruj się</b></Link>
                    </span>
                </div>

            </div>
        </div>
    );
}

export default LoginView;