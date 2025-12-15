import './LoginView.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
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

        window.location.replace('/app');
    };

    return (
        <div className="login-view">
            <div className="login-overlay">

                <div className="login-left">
                    <a href='/'>
                        <img 
                            src={PeopleLearn} 
                            alt="SkillSwap logo" 
                            className="login-icon"
                        />
                    </a>

                    <ul className="login-features">
                        <li>Ucz się od innych – zupełnie za darmo</li>
                        <li>Zdobywaj praktyczne umiejętności w realnym czasie</li>
                        <li>Otwarty dostęp do talentów z całego świata</li>
                        <li>Znajdź partnera do nauki pod swoje cele</li>
                        <li>Ucz się na dowolnym urządzeniu</li>
                    </ul>
                </div>

                <div className="login-right">
                    <a href='/'><h2>SkillSwap</h2></a>
                    <p>Zaloguj się, aby mieć pełne możliwości!</p>

                    <RoundedTextBox type="email" placeholder="user@example.com"/>
                    <RoundedTextBox type="password" placeholder="********"/>

                    <RoundedButton text='Zaloguj się' onClick={loginFunc}/>

                    <span className="login-register">
                        Nie masz konta? <a href='/shared/register'><b>Zarejestruj się</b></a>
                    </span>
                </div>

            </div>
        </div>
    );
}

export default LoginView;