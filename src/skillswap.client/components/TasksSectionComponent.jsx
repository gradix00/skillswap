import './TasksSectionComponent.css';
import { motion } from 'framer-motion';

export default function TasksSectionComponent({ enabled }) {
    if (!enabled) {
        return (
            <div className="tasks-locked">
                🔒 Zadania odblokują się po wymianie pierwszych wiadomości.
            </div>
        );
    }

    return (
        <motion.div
            className="tasks-section"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
        >
            <h4 className="tasks-title">Zadania w tej relacji</h4>
        </motion.div>
    );
}
