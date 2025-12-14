import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MockMessageData } from './../../skillswap.shared/data/MessagesData'; 
import { MockMatchData } from './../../skillswap.shared/data/UsersData'; 

const getUserName = (guid) => {
    const user = MockMatchData.AllMatches.find(u => u.guid === guid) || 
                 MockMatchData.AllSwipeUsers.find(u => u.guid === guid);
    return user ? user.name : 'Nieznany Użytkownik';
};

const formatTimeDifference = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));

    if (diffInMinutes < 60) {
        return `${diffInMinutes}m temu`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours}h temu`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d temu`;
};

const UnansweredNotificationItem = ({ partnerGuid, partnerName, lastMessageText, timestamp, onClose }) => {
    const navigate = useNavigate();
    const partnerImage = MockMessageData.getUserImage(partnerGuid); 
    
    const handleNavigate = () => {
        navigate(`/app/profile/${partnerGuid}`); 
        onClose(); 
    };

    return (
        <div className="notification-dropdown-item" onClick={handleNavigate}>
            <img src={partnerImage || "https://via.placeholder.com/40"} alt={`Avatar ${partnerName}`} className="notification-avatar" />
            <div className="notification-details">
                <p className="notification-partner-name">
                    {partnerName}
                </p>
                <p className="notification-message-text">
                    {lastMessageText.length > 50 ? lastMessageText.substring(0, 50) + '...' : lastMessageText}
                </p>
            </div>
            <span className="notification-time-ago">{formatTimeDifference(timestamp)}</span>
        </div>
    );
};


export default function NotificationDropdown({ piotrGuid, onClose }) {
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                if (!event.target.closest('.notification-button')) {
                    onClose();
                }
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const getUnansweredConversations = (chats, currentUserId) => {
        const unanswered = [];
        chats.forEach(chat => {
            if (chat.messages.length > 0) {
                const lastMessage = chat.messages[chat.messages.length - 1];
                
                if (lastMessage.senderId !== currentUserId) {
                    const partnerGuid = (chat.matchGuid === currentUserId) ? chat.partnerGuid : chat.matchGuid;
                    const partnerName = getUserName(partnerGuid);

                    unanswered.push({
                        partnerGuid: partnerGuid,
                        partnerName: partnerName,
                        lastMessageText: lastMessage.text,
                        timestamp: lastMessage.timestamp
                    });
                }
            }
        });
        return unanswered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    };

    const allChats = piotrGuid ? MockMessageData.getChats() : [];
    const unansweredConversations = getUnansweredConversations(allChats, piotrGuid);


    return (
        <div className="notification-dropdown-overlay">
            <div className="notification-dropdown-panel" ref={dropdownRef}>
                <h4 className="dropdown-title">🔔 Wiadomości oczekujące na odpowiedź</h4>
                <hr />
                {unansweredConversations.length > 0 ? (
                    unansweredConversations.map((conv, index) => (
                        <UnansweredNotificationItem 
                            key={index}
                            partnerGuid={conv.partnerGuid}
                            partnerName={conv.partnerName}
                            lastMessageText={conv.lastMessageText}
                            timestamp={conv.timestamp}
                            onClose={onClose} 
                        />
                    ))
                ) : (
                    <p className="dropdown-empty">
                        🎉 Wszystkie wiadomości odpisane!
                    </p>
                )}
                <div 
                    className="dropdown-footer" 
                >
                    Wiadomości, na które nie odpowiedziałeś
                </div>
            </div>
        </div>
    );
}