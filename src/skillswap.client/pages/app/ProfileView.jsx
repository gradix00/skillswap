import './ProfileView.css';
import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MockMatchData } from './../../../skillswap.shared/data/UsersData';
import { MockMessageData } from './../../../skillswap.shared/data/MessagesData';
import { motion, AnimatePresence } from 'framer-motion';

const currentUser =
    MockMatchData.AllMatches.find(u => u.name === 'Piotr') ||
    MockMatchData.AllSwipeUsers.find(u => u.name === 'Piotr');

const currentUserId = currentUser?.guid;

const getChatMessages = (partnerGuid) => {
    if (!currentUserId) return [];

    const chat = MockMessageData.getChats().find(
        c =>
            (c.matchGuid === currentUserId && c.partnerGuid === partnerGuid) ||
            (c.partnerGuid === currentUserId && c.matchGuid === partnerGuid)
    );

    return chat?.messages || [];
};

const hasMutualMessages = (messages) => {
    const senders = new Set(messages.map(m => m.senderId));
    return senders.size >= 2;
};

const MessageBubble = ({ message, partnerData, isMine }) => {

    const time = new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`message-container ${isMine ? 'message-my-container' : 'message-their-container'}`}
        >

            {!isMine && (
                <img src={partnerData.imageUrl} alt="" className="chat-avatar"/>
            )}

            <div className={`message ${isMine ? 'message-my' : 'message-their'}`}>
                <p>{message.text}</p>
                <span className="message-time">{time}</span>
            </div>

            {isMine && (
                <img src={currentUser.imageUrl} alt="" className="chat-avatar"/>
            )}

        </motion.div>
    );
};

const ChatComponent = ({ matchData, messages, chatKey, openProfile }) => (
    <div className="profile-view-chat">

        <div className="chat-header">
            <h3 onClick={openProfile} className="chat-user-link">
                Konwersacja z <b>{matchData.name}</b>
            </h3>

            <Link to="/app" className="back-to-swipe-link">
                &times;
            </Link>
        </div>

        <div className="chat-messages" key={chatKey}>
            {messages.length > 0 ? (
                messages.map((msg, index) => (
                    <MessageBubble
                        key={index}
                        message={msg}
                        partnerData={matchData}
                        isMine={msg.senderId === currentUserId}
                    />
                ))
            ) : (
                <p className="empty-chat-state">
                    To początek Waszej konwersacji.
                </p>
            )}
        </div>

        <div className="chat-input-area">
            <input disabled placeholder="Mock czatu"/>
            <button disabled>Wyślij</button>
        </div>

    </div>
);

const TasksSection = ({ enabled }) => {

    if (!enabled) {
        return (
            <div className="tasks-locked">
                🔒 Zadania odblokują się po wymianie pierwszych wiadomości.
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
        >
            <div className="tasks-section">

                <h4 className="tasks-title">Zadania w tej relacji</h4>

                <div className="tasks-grid">

                    <div className="tasks-card your-tasks">
                        <h5>Twoje zadania</h5>
                        <ul>
                            <li>📘 Przygotować materiały</li>
                            <li>🧠 Omówić zagadnienia</li>
                        </ul>
                    </div>

                    <div className="tasks-card partner-tasks">
                        <h5>Zadania matcha</h5>
                        <ul>
                            <li>🎨 Zaprojektować interfejs</li>
                        </ul>
                    </div>

                </div>

                <button className="add-task-btn">
                    ➕ Dodaj zadanie dla matcha
                </button>

            </div>
        </motion.div>
    );
};

const UserProfileComponent = ({ matchData, canUseTasks, closeProfile }) => {

    const [showTasks, setShowTasks] = useState(false);

    return (
        <div className="profile-details-card">

            <button className="mobile-back" onClick={closeProfile}>
                ← Wróć do czatu
            </button>

            <h3 className='profile-title-person'>Profil {matchData.name}</h3>

            <div className="profile-main-image-container">
                <img src={matchData.imageUrl} alt="" className="profile-main-image"/>
            </div>

            <div className="profile-section">
                <h4>Zainteresowania</h4>
                <ul className="profile-preference-list">
                    {matchData.preferences.map((pref, i) => (
                        <li key={i}>⭐ {pref}</li>
                    ))}
                </ul>
            </div>

            <div className="profile-section">
                <h4>Styl nauki</h4>
                <ul className="profile-learning-style-list">
                    <li>Tryb: <b>{matchData.learningStyle.mode}</b></li>
                    <li>Tempo: <b>{matchData.learningStyle.pace}</b></li>
                    <li>Metoda: <b>{matchData.learningStyle.method}</b></li>
                </ul>
            </div>

            <div className="profile-section">
                <h4>Bio</h4>
                <p className="profile-bio-text">{matchData.bio}</p>
            </div>

            <button
                className={`toggle-tasks-btn ${showTasks ? 'active' : ''}`}
                onClick={() => setShowTasks(!showTasks)}
            >
                {showTasks ? 'Ukryj zadania' : 'Pokaż zadania'}
            </button>

            <AnimatePresence>
                {showTasks && <TasksSection enabled={canUseTasks}/>}
            </AnimatePresence>

            <button className="report-button">
                Zgłoś / Zablokuj
            </button>

        </div>
    );
};

export function ProfileView() {

    const { guid } = useParams();
    const matchedUser = MockMatchData.getByGuid(guid);

    const [showProfile, setShowProfile] = useState(false);

    const messages = useMemo(() => getChatMessages(guid), [guid]);
    const canUseTasks = hasMutualMessages(messages);

    if (!matchedUser) {
        return (
            <div className="profile-view-error">
                Nie znaleziono użytkownika.
            </div>
        );
    }

    return (
        <div className="profile-view">

            <section className="profile-view-left">
                <ChatComponent
                    matchData={matchedUser}
                    messages={messages}
                    chatKey={guid}
                    openProfile={() => setShowProfile(true)}
                />
            </section>

            <aside className={`profile-view-right ${showProfile ? 'mobile-show' : ''}`}>
                <UserProfileComponent
                    matchData={matchedUser}
                    canUseTasks={canUseTasks}
                    closeProfile={() => setShowProfile(false)}
                />
            </aside>

        </div>
    );
}

export default ProfileView;
