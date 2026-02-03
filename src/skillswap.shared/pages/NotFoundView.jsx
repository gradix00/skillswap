import './NotFoundView.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NotFoundBackground from '../../resources/images/404-background.png';

export function NotFoundView() {
    document.title = "404 - SkillSwap";
    const navigate = useNavigate();

    const revealVariant = {
        hidden: { opacity: 0, y: 40, scale: 0.97 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            transition: { duration: 0.8, ease: "easeOut" } 
        }
    };

    return (
        <div className="not-found-view">
            <div className="not-found-wrapper">
                
                <motion.div
                    className="not-found-content"
                    variants={revealVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="error-code">404</div>
                    <h1>Zgubiłeś się?</h1>
                    <p>
                        Strona, której szukasz, nie istnieje lub została przeniesiona 
                        pod inny adres. Nie martw się, nawet najlepszym zdarza się 
                        zboczyć z kursu podczas nauki.
                    </p>

                    <button className="back-home-btn" onClick={() => navigate('/')}>
                        Strona główna
                    </button>
                </motion.div>

                <motion.div 
                    className="not-found-image-container"
                    variants={revealVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="image-frame">
                        <img src={NotFoundBackground} alt="404 Error" />
                    </div>
                </motion.div>

            </div>
        </div>
    );
}

export default NotFoundView;