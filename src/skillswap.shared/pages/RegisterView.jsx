import './RegisterView.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RoundedButton from '../components/RoundedButton'; 
import { RoundedTextBox } from '../components/RoundedTextBox'; 
import PeopleLearn from '../../resources/images/people-learn.png'; 

export function RegisterView() {
    document.title = "Rejestracja - SkillSwap";
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        skillsToTeach: '',
        skillsToLearn: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => {
        setStep(prev => prev + 1);
    };

    const prevStep = () => {
        setStep(prev => prev - 1);
    };

    const handleSubmit = () => {
        console.log("Dane do wysłania:", formData);
        alert('Rejestracja zakończona pomyślnie!');
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <h2>Zarejestrujmy Cię!</h2>
                        <p>Zacznijmy od Twoich podstawowych danych.</p>

                        <RoundedTextBox 
                            type="text" 
                            placeholder="Imię" 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleInputChange}
                        />
                        <RoundedTextBox 
                            type="text" 
                            placeholder="Nazwisko" 
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleInputChange}
                        />
                        <RoundedTextBox 
                            type="email" 
                            placeholder="Adres E-mail" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange}
                        />
                        <RoundedTextBox 
                            type="password" 
                            placeholder="Ustaw Hasło (min. 8 znaków)" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleInputChange}
                        />

                        <RoundedButton text='Dalej' onClick={nextStep} />
                        <span className="register-back" onClick={() => navigate('/shared/login')}>
                            Wróć do Logowania
                        </span>
                    </>
                );
            case 2:
                return (
                    <>
                        <h2>Teraz Twój profil.</h2>
                        <p>Jakimi umiejętnościami możesz się podzielić? (np. JavaScript, Gotowanie, Gitara)</p>

                        <textarea
                            className="register-textarea"
                            placeholder="Wymień umiejętności, których możesz nauczyć (oddzielone przecinkami)"
                            name="skillsToTeach"
                            value={formData.skillsToTeach}
                            onChange={handleInputChange}
                            rows="4"
                        ></textarea>

                        <div className="register-actions">
                            <RoundedButton text='Wstecz' onClick={prevStep} secondary={true} />
                            <RoundedButton text='Dalej' onClick={nextStep} />
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <h2>Twoje oczekiwania.</h2>
                        <p>Czego chcesz się nauczyć od społeczności SkillSwap? (np. Język hiszpański, SEO, Figma)</p>

                        <textarea
                            className="register-textarea"
                            placeholder="Wymień umiejętności, których oczekujesz (oddzielone przecinkami)"
                            name="skillsToLearn"
                            value={formData.skillsToLearn}
                            onChange={handleInputChange}
                            rows="4"
                        ></textarea>

                        <div className="register-actions">
                            <RoundedButton text='Wstecz' onClick={prevStep} secondary={true} />
                            <RoundedButton text='Zarejestruj się' onClick={handleSubmit} />
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="register-view">
            <div className="register-overlay">
                
                <div className="register-left">
                    <Link to='/'>
                        <img 
                            src={PeopleLearn} 
                            alt="SkillSwap logo" 
                            className="register-icon"
                        />
                    </Link>
                    
                    <h3>Twórz, Ucz, Wymieniaj</h3>
                    <ul className="register-features">
                        <li>Dopasujemy Cię do idealnych partnerów</li>
                        <li>Wypełnienie profilu zwiększy Twoją widoczność</li>
                        <li>To ostatni krok do bezpłatnej wymiany wiedzy</li>
                    </ul>
                </div>

                <div className="register-right">
                    {renderStepContent()}
                </div>

            </div>
        </div>
    );
}

export default RegisterView;