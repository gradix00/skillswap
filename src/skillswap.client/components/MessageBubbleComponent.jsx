import './MessageBubbleComponent.css';
import { motion } from 'framer-motion';

const messageVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.25, ease: 'easeOut' }
    }
};

export default function MessageBubbleComponent({
    message,
    isMine,
    partnerData,
    currentUser
}) {
    const time = new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <motion.div
            variants={messageVariants}
            className={`message-container ${isMine ? 'message-my-container' : 'message-their-container'}`}
        >
            {!isMine && (
                <img src={partnerData.imageUrl} className="chat-avatar" />
            )}

            <div className={`message ${isMine ? 'message-my' : 'message-their'}`}>
                <p>{message.text}</p>
                <span className="message-time">{time}</span>
            </div>

            {isMine && (
                <img src={currentUser.imageUrl} className="chat-avatar" />
            )}
        </motion.div>
    );
}
