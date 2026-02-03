import './ChatComponent.css';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MessageBubbleComponent from '../components/MessageBubbleComponent';

const messagesContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06 }
    },
    exit: { opacity: 0 }
};

export default function ChatComponent({
    matchData,
    messages,
    chatKey,
    currentUser,
    currentUserId
}) {
    return (
        <div className="profile-view-chat">
            <div className="chat-header">
                <h3>
                    Konwersacja z <b>{matchData.name}</b>
                </h3>
                <Link to="/app" className="back-to-swipe-link">
                    &times;
                </Link>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={chatKey}
                    className="chat-messages"
                    variants={messagesContainerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <MessageBubbleComponent
                                key={index}
                                message={msg}
                                isMine={msg.senderId === currentUserId}
                                partnerData={matchData}
                                currentUser={currentUser}
                            />
                        ))
                    ) : (
                        <p className="empty-chat-state">
                            To początek Waszej konwersacji.
                        </p>
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="chat-input-area">
                <input disabled placeholder="Mock czatu" />
                <button disabled>Wyślij</button>
            </div>
        </div>
    );
}
