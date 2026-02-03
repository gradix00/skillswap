import './MatchesSidebarComponent.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MockMatchData } from '../../skillswap.shared/data/UsersData'; 

export default function MatchesSidebarComponent() {
  const navigate = useNavigate();
  
  const matches = MockMatchData.getAllMatches(); 

  const handleMatchClick = (match) => {
    navigate(`/app/profile/${match.guid}`);
    
    console.log(`Przekierowanie do profilu: ${match.name} (id: ${match.guid})`);
  };

  if (!matches || matches.length === 0) {
    return <p className="empty-state">Brak nowych dopasowań. Zacznij swipować!</p>;
  }

 return (
    <ul className="matches-grid">
        {matches.map((match) => (
        <li 
            key={match.id} 
            className="match-tile"
            onClick={() => handleMatchClick(match)} 
            title={match.name}
        >
            <div className="match-image-container">
                <img 
                    src={match.imageUrl} 
                    alt={`Avatar ${match.name}`} 
                    className="match-image"
                />
            </div>
            <span className="match-name-small">{match.name}</span>
        </li>
        ))}
    </ul>
 );
}