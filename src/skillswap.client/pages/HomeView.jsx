import './HomeView.css';
import { useEffect } from 'react';
import PeopleBackground from '../../resources/images/people-background.jpeg';
import TasksBackground from '../../resources/images/tasks.png';
import PeopleTargetBackground from '../../resources/images/people-target.jpg';

export function HomeView() {
    useEffect(() => {
        const sections = document.querySelectorAll('.section');

        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            sections.forEach(section => {
                const top = section.getBoundingClientRect().top;
                if (top < windowHeight - 100) {
                    section.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); 

        return () => window.removeEventListener('scroll', revealOnScroll);
    }, []);

    const titles = ["Swipuj.", "Dopasuj.", "Ucz się."];

    return (
        <div className="home-view">
            {/* Section 1 */}
            <div className='section'>
                <div className='img-container hover-card'>
                    <img src={PeopleBackground} alt="People"/>
                </div>
                <div className='center'>
                    <div className='title-65 looping-title'>
                        {titles.map((line, idx) => (
                            <span key={idx} className="animated-line">{line}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section 2 */}
            <div className='section'>
                <div className='left'>
                    <div className='title-50'>Dostosuj swoje preferencje. Znajdź idealną osobę.</div>
                    <div className='description'>
                        Wybierz, czego chcesz się uczyć i czym możesz się podzielić. 
                        Platforma połączy Cię z kimś, kto idealnie pasuje do Twoich celów - 
                        tak, aby nauka była naturalna, skuteczna i przyjemna.
                    </div>
                </div>
                <div className='img-container hover-card'>
                    <img src={PeopleTargetBackground} alt="People Target"/>
                </div>
            </div>

            {/* Section 3 */}
            <div className='section reverse'>
                <div className='left'>
                    <div className='title-50'>Twórz zadania, ucz się w praktyce.</div>
                    <div className='description'>
                        Dawaj i otrzymuj taski od swojego matcha, wykonujcie je wzajemnie 
                        i rozwijajcie umiejętności w realnych mini-wyzwaniach. 
                        Akceptuj, oceniaj i wysyłaj kolejne - wszystko w jednym czacie, na bieżąco.
                    </div>
                </div>
                <div className='img-container hover-card'>
                    <img src={TasksBackground} alt="Tasks"/>
                </div>
            </div>
        </div>
    );
}

export default HomeView;