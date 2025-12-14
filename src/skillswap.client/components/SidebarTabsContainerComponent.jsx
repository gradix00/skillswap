import './SidebarTabsContainerComponent.css'; 
import React, { useState } from 'react';
import MatchesSidebarComponent from './MatchesSidebarComponent';
import MessagesSidebarComponent from './MessagesSidebarComponent';

export default function SidebarTabsContainerComponent() {
    const [activeTab, setActiveTab] = useState('matches'); 

    return (
        <div className="sidebar-tabs-container">
            
            <div className="tab-navigation-header">
                <button 
                    className={`tab-button ${activeTab === 'matches' ? 'active' : ''}`}
                    onClick={() => setActiveTab('matches')}
                >
                    Dopasowania
                </button>
                <button 
                    className={`tab-button ${activeTab === 'messages' ? 'active' : ''}`}
                    onClick={() => setActiveTab('messages')}
                >
                    Wiadomości
                </button>
            </div>

            <div className="sidebar-content-area-wrapper">
                <div 
                    className={`sidebar-content-area ${activeTab}`} 
                >
                    <div className="tab-content matches">
                         <MatchesSidebarComponent />
                    </div>

                    <div className="tab-content messages">
                        <MessagesSidebarComponent />
                    </div>
                </div>
            </div>
        </div>
    );
}