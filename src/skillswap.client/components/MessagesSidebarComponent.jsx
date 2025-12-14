import './MessagesSidebarComponent.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MockMessageData } from './../../skillswap.shared/data/MessagesData';
import { MockMatchData } from './../../skillswap.shared/data/UsersData';

const findPiotr = MockMatchData.AllMatches.find(u => u.name === 'Piotr') || MockMatchData.AllSwipeUsers.find(u => u.name === 'Piotr');

const currentUserId = findPiotr?.guid; 

function processChatsForSidebar(chats) {
  if (!currentUserId) {
    console.error("MessagesSidebarComponent: currentUserId jest niezdefiniowany!");
    return [];
  }

 return chats.map(chat => {
   const lastMessage = chat.messages[chat.messages.length - 1];

    const partnerGuid = chat.matchGuid === currentUserId ? chat.partnerGuid : chat.matchGuid;
   const partner = MockMatchData.getByGuid(partnerGuid); 

   if (!partner || !lastMessage) return null;

   const senderPrefix = lastMessage.senderId === currentUserId ? 'Ty: ' : '';

   const isYourTurn = lastMessage.senderId !== currentUserId; 

   return {
    guid: partnerGuid,
    senderName: partner.name,
    lastMessage: senderPrefix + lastMessage.text,
    imageUrl: partner.imageUrl,
    timestamp: lastMessage.timestamp,
    isYourTurn: isYourTurn, 
   };
 }).filter(item => item !== null)
 .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

const processedMessages = processChatsForSidebar(MockMessageData.getChats());

export default function MessagesSidebarComponent() {
   const navigate = useNavigate();

  if (!currentUserId) {
    return <p className="empty-state">Błąd: Nie można zidentyfikować zalogowanego użytkownika.</p>;
  }

 if (!processedMessages || processedMessages.length === 0) {
   return <p className="empty-state">Brak otwartych wątków wiadomości.</p>;
 }

 const activeGuid = ''; 

   const handleThreadClick = (guid) => {
      navigate(`/app/profile/${guid}`);
   };

 return (
   <ul className="messages-list">
     {processedMessages.map((thread) => {
       const isActive = thread.guid === activeGuid;
       const isYourTurn = thread.isYourTurn; 
      
       const dateDisplay = new Date(thread.timestamp).toLocaleDateString([], { day: '2-digit', month: 'short' });
      
       return (
         <li
          key={thread.guid}
          className={`message-thread-item ${isActive ? 'active-thread' : ''} ${isYourTurn ? 'your-turn' : ''}`} 
          onClick={() => handleThreadClick(thread.guid)}
         >
          <div className="thread-avatar-wrapper">
            <img
             src={thread.imageUrl}
             alt={`Avatar ${thread.senderName}`}
             className="thread-avatar"
            />
            <span className="thread-date-info">{dateDisplay}</span>
          </div>

          <div className="thread-info">
            <div className="thread-header">
              <span className="thread-sender">{thread.senderName}</span>
                               {isYourTurn && (
                                   <span className="your-turn-tag">TWÓJ RUCH</span>
                               )}
              <span className="thread-time">{new Date(thread.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <p className={`thread-preview ${isYourTurn ? 'bold-preview' : ''}`}>{thread.lastMessage}</p>
          </div>
         </li>
       );
     })}
   </ul>
 );
}