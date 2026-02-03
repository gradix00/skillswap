import './UserProfileComponent.css';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TasksSectionComponent from '../components/TasksSectionComponent';

export default function UserProfileComponent({ matchData, canUseTasks }) {
    const [showTasks, setShowTasks] = useState(false);

    return (
        <div className="profile-details-card">
            <h3>Profil {matchData.name}</h3>

            <div className="profile-main-image-container">
                <img src={matchData.imageUrl} className="profile-main-image" />
            </div>

            <button
                className={`toggle-tasks-btn ${showTasks ? 'active' : ''}`}
                onClick={() => setShowTasks(!showTasks)}
            >
                {showTasks ? 'Ukryj zadania' : 'Pokaż zadania'}
            </button>

            <AnimatePresence>
                {showTasks && (
                    <TasksSectionComponent enabled={canUseTasks} />
                )}
            </AnimatePresence>

            <button className="report-button">
                Zgłoś / Zablokuj
            </button>
        </div>
    );
}
