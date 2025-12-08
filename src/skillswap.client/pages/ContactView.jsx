import './ContactView.css';
import { useEffect } from 'react';

export function ContactView() {
    document.title = "Kontakt - SkillSwap";

    useEffect(() => {
        const revealElements = document.querySelectorAll('.reveal');

        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            revealElements.forEach(el => {
                const top = el.getBoundingClientRect().top;
                if (top < windowHeight - 100) {
                    el.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll();

        return () => window.removeEventListener('scroll', revealOnScroll);
    }, []);

    return (
        <div className="contact-view">

            <div className="animated-background">
                <span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span>
            </div>

            <div className="contact-wrapper">

                <div className="contact-header reveal">
                    <h1>Skontaktuj się z nami</h1>
                    <p>Masz pytania? Chcesz dołączyć do Skill Swap? Napisz do nas!</p>
                </div>

                <div className="contact-cards">

                    <div className="contact-card reveal">
                        <h2>Email</h2>
                        <p>kontakt@skillswap.pl</p>
                    </div>

                    <div className="contact-card reveal">
                        <h2>Telefon</h2>
                        <p>+48 123 123 123</p>
                    </div>

                    <div className="contact-card reveal">
                        <h2>Social Media</h2>
                        <p>Instagram / LinkedIn / Twitter</p>
                    </div>

                </div>

                <div className="contact-footer reveal">
                    <p>
                        Odpowiadamy szybko i z entuzjazmem.  
                        Twoja nauka i wymiana umiejętności są dla nas najważniejsze!
                    </p>
                </div>

            </div>
        </div>
    )
}

export default ContactView;
