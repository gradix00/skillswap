import './ProfileView.css';
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MockMatchData } from './../../../skillswap.shared/data/UsersData'; 
import { MockMessageData } from './../../../skillswap.shared/data/MessagesData';

const findPiotr = MockMatchData.AllMatches.find(u => u.name === 'Piotr') ||
                 MockMatchData.AllSwipeUsers.find(u => u.name === 'Piotr');
                 
const currentUserId = findPiotr?.guid;

const getChatMessages = (partnerGuid) => {
    if (!currentUserId) {
        console.error("ProfileView: currentUserId jest niezdefiniowany w getChatMessages!");
        return undefined;
    }

    const allChats = MockMessageData.getChats();
    
    const chat = allChats.find(
        c => (c.matchGuid === currentUserId && c.partnerGuid === partnerGuid) ||
             (c.partnerGuid === currentUserId && c.matchGuid === partnerGuid)
    );
    
    return chat?.messages;
};

const MessageBubble = ({ message, partnerData, isMine }) => {
    const timeDisplay = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    return (
        <div className={`message-container ${isMine ? 'message-my-container' : 'message-their-container'}`}>
            {!isMine && (
                <img 
                    src={partnerData.imageUrl} 
                    alt={`Avatar ${partnerData.name}`} 
                    className="chat-avatar" 
                />
            )}
            
            <div className={`message ${isMine ? 'message-my' : 'message-their'}`}>
                <p>{message.text}</p>
                <span className="message-time">{timeDisplay}</span>
            </div>
            
            {isMine && (
                <img 
                    src={MockMatchData.getByGuid(currentUserId)?.imageUrl} 
                    alt="Twój Avatar" 
                    className="chat-avatar" 
                />
            )}
        </div>
    );
};


const ChatComponent = ({ matchData }) => {
    const chatHistory = useMemo(() => getChatMessages(matchData.guid), [matchData.guid]);

    return (
        <div className="profile-view-chat">
            <div className="chat-header">
                <h3>Konwersacja z użytkownikiem <b>{matchData.name}</b></h3> 
                <Link to="/app" className="back-to-swipe-link" title="Wróć do swipowania">
                    &times; 
                </Link>
            </div>
            
            <div className="chat-messages">
                {
                    chatHistory && chatHistory.length > 0 ? (
                        chatHistory.map((message, index) => (
                            <MessageBubble 
                                key={index} 
                                message={message} 
                                partnerData={matchData} 
                                isMine={message.senderId === currentUserId} 
                            />
                        ))
                    ) : (
                        <p className="empty-chat-state">
                            To początek Waszej konwersacji! Zacznij pisać.
                        </p>
                    )
                }
            </div>

            <div className="chat-input-area">
                <input type="text" placeholder="Wyślij wiadomość..." disabled />
                <button disabled>Wyślij</button>
            </div>
        </div>
    );
};

const UserProfileComponent = ({ matchData }) => (
    <div className="profile-details-card">
        <h3 className="animated-section delay-00">Profil {matchData.name}</h3>
        
        <div className="profile-section animated-section delay-01">
            <h4>Zdjęcie Główne:</h4>
            <div className="profile-main-image-container">
                <img 
                    src={matchData.imageUrl} 
                    alt={`Zdjęcie profilowe ${matchData.name}`}
                    className="profile-main-image"
                />
            </div>
        </div>
        
        <div className="profile-section animated-section delay-02">
            <h4>Zainteresowania:</h4>
            <ul className="profile-preference-list">
                {matchData.preferences.map((pref, index) => (
                    <li key={index}>⭐ {pref}</li>
                ))}
            </ul>
        </div>

        <div className="profile-section animated-section delay-03">
            <h4>Style Nauki:</h4>
            <ul className="profile-learning-style-list">
                <li>
                    Tryb: <span className="style-mode">{matchData.learningStyle.mode}</span>
                </li>
                <li>
                    Tempo: <span className="style-pace">{matchData.learningStyle.pace}</span>
                </li>
                <li>
                    Metoda: <span className="style-method">{matchData.learningStyle.method}</span>
                </li>
            </ul>
        </div>
        
        <div className="profile-section animated-section delay-04">
            <h4>Bio Użytkownika:</h4>
            <p className="profile-bio-text">{matchData.bio}</p>
        </div>
        
        <button className="report-button animated-section delay-05">Zgłoś/Zablokuj</button>
    </div>
);

export function ProfileView(){
    const { guid } = useParams();
    const matchedUser = MockMatchData.getByGuid(guid); 

    if (!guid || !matchedUser) {
        return <div className="profile-view-error">Nie znaleziono użytkownika.</div>;
    }

    return(
        <div className="profile-view"> 
            <section className="profile-view-left">
                <ChatComponent matchData={matchedUser} />
            </section>
            <aside className="profile-view-right">
                <UserProfileComponent matchData={matchedUser} />
            </aside>
        </div>
    );
}

export default ProfileView;