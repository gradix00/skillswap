import './HomeView.css';
import { motion } from 'framer-motion';
import PeopleBackground from '../../resources/images/people-background.jpeg';
import TasksBackground from '../../resources/images/tasks.png';
import PeopleTargetBackground from '../../resources/images/people-target.jpg';

const sectionVariants = {
    hidden: {
        opacity: 0,
        y: 50
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut'
        }
    }
};

export function HomeView() {

    const titles = ["Swipuj.", "Dopasuj.", "Ucz się."];

    return (
        <div className="home-view">

            <motion.div
                className="section"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="img-container hover-card">
                    <img src={PeopleBackground} alt="People"/>
                </div>

                <div className="center">
                    <div className="looping-title">
                        {titles.map((line, idx) => (
                            <span key={idx} className="animated-line">
                                {line}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="section"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="left">
                    <div className="title-50">
                        Dostosuj swoje preferencje. Znajdź idealną osobę.
                    </div>
                    <div className="description">
                        Wybierz, czego chcesz się uczyć i czym możesz się podzielić.
                        Platforma połączy Cię z kimś, kto pasuje do Twoich celów.
                    </div>
                </div>

                <div className="img-container hover-card">
                    <img src={PeopleTargetBackground} alt="People Target"/>
                </div>
            </motion.div>

            <motion.div
                className="section reverse"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="left">
                    <div className="title-50">
                        Twórz zadania, ucz się w praktyce.
                    </div>
                    <div className="description">
                        Dawaj i otrzymuj zadania od swojego matcha, ucząc się
                        poprzez realne mini-wyzwania.
                    </div>
                </div>

                <div className="img-container hover-card">
                    <img src={TasksBackground} alt="Tasks"/>
                </div>
            </motion.div>

        </div>
    );
}

export default HomeView;