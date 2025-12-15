import './MyProfileView.css';
import Cookies from 'js-cookie';
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { MockMatchData } from './../../../skillswap.shared/data/UsersData';
import { Edit2, LogOut, ArrowLeft, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const findPiotr = MockMatchData.AllMatches.find(u => u.name === 'Piotr') ||
                 MockMatchData.AllSwipeUsers.find(u => u.name === 'Piotr');
                 
const currentUserId = findPiotr?.guid;


const TagEditor = ({ tags, onTagsChange }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = inputValue.trim().replace(/,/g, '');
            if (newTag && !tags.includes(newTag)) {
                onTagsChange([...tags, newTag]);
            }
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove) => {
        onTagsChange(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="tag-editor-container">
            <div className="current-tags-display">
                {tags.map((tag, index) => (
                    <span key={index} className="preference-tag-edit">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="remove-tag-button">
                            <X size={14} />
                        </button>
                    </span>
                ))}
            </div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Dodaj tag (Enter lub ,)"
                className="tag-input-field"
            />
            <small>Kliknij tag, aby go usunąć, lub dodaj nowy, wciskając Enter.</small>
        </div>
    );
};


const MyProfileDetailsComponent = ({ initialUserData, onSave }) => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserData, setEditedUserData] = useState(initialUserData);

    useEffect(() => {
        setEditedUserData(initialUserData);
    }, [initialUserData]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setEditedUserData(initialUserData);
        setIsEditing(false);
    };

    const handleSave = () => {
        onSave(editedUserData);
        setIsEditing(false);
    };

    const handleChange = useCallback((section, field, value) => {
        setEditedUserData(prevData => {
            if (section === 'learningStyle') {
                return {
                    ...prevData,
                    learningStyle: {
                        ...prevData.learningStyle,
                        [field]: value
                    }
                };
            }
            if (section === 'main') {
                return {
                    ...prevData,
                    [field]: value
                };
            }
            if (section === 'preferences') {
                return {
                    ...prevData,
                    preferences: value 
                };
            }
            return prevData;
        });
    }, []);

    const handleSignOut = () => {
        Cookies.remove('skillswap-user');
        const delayInMilliseconds = 300; 

        setTimeout(() => {
            window.location.reload();
        }, delayInMilliseconds);
    };

    const handleGoBack = () => {
        navigate('/app'); 
    };

    const modeOptions = ['Online', 'Stacjonarnie', 'Hybryda'];
    const paceOptions = ['Luzne', 'Zadaniowe', 'Intensywne']; 
    const methodOptions = ['Chcę uczyć', 'Chcę się uczyć', 'Oba'];


    return (
        <div className={`my-profile-details-card ${isEditing ? 'is-editing' : ''}`}>
            <div className="profile-header">
                <button className="icon-action-button" onClick={handleGoBack} title="Wróć">
                    <ArrowLeft size={24} />
                </button>
                <h3 className="profile-title">{isEditing ? 'Edytuj Profil' : `Twój Profil - ${initialUserData.name}`}</h3>
                
                {isEditing ? (
                    <div className="edit-actions">
                        <button className="icon-action-button save-button" onClick={handleSave} title="Zapisz zmiany">
                            <Check size={24} />
                        </button>
                        <button className="icon-action-button cancel-button" onClick={handleCancel} title="Anuluj edycję">
                            <X size={24} />
                        </button>
                    </div>
                ) : (
                    <button className="icon-action-button primary-edit" onClick={handleEdit} title="Edytuj Profil">
                        <Edit2 size={24} />
                    </button>
                )}
            </div>
            
            <div className="profile-main-image-container">
                <img 
                    src={initialUserData.imageUrl} 
                    alt={`Zdjęcie profilowe ${initialUserData.name}`}
                    className="profile-main-image"
                />
                <div className="image-overlay">
                    <span className="profile-name-overlay">{initialUserData.name}, {initialUserData.age}</span>
                </div>
            </div>

            <div className="profile-section">
                <h4>O mnie (Bio):</h4>
                {isEditing ? (
                    <textarea 
                        className="profile-edit-textarea"
                        value={editedUserData.bio}
                        onChange={(e) => handleChange('main', 'bio', e.target.value)}
                        placeholder="Napisz coś o sobie..."
                        rows={4}
                    />
                ) : (
                    <p className="profile-bio-text">{editedUserData.bio}</p>
                )}
            </div>
            
            <div className="profile-section">
                <h4>Szukam wiedzy w:</h4>
                {isEditing ? (
                    <TagEditor 
                        tags={editedUserData.preferences}
                        onTagsChange={(newTags) => handleChange('preferences', null, newTags)}
                    />
                ) : (
                    <ul className="profile-preference-list">
                        {editedUserData.preferences.map((pref, index) => (
                            <li key={index}>⭐ {pref}</li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="profile-section">
                <h4>Moje Style Nauki:</h4>
                <div className="profile-learning-style-grid">
                    
                    <label>Tryb:</label>
                    {isEditing ? (
                        <select 
                            value={editedUserData.learningStyle.mode}
                            onChange={(e) => handleChange('learningStyle', 'mode', e.target.value)}
                            className="profile-edit-select"
                        >
                            {modeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    ) : (
                        <span className="style-mode-display">{editedUserData.learningStyle.mode}</span>
                    )}

                    <label>Tempo:</label>
                    {isEditing ? (
                        <select 
                            value={editedUserData.learningStyle.pace}
                            onChange={(e) => handleChange('learningStyle', 'pace', e.target.value)}
                            className="profile-edit-select"
                        >
                            {paceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    ) : (
                        <span className="style-pace-display">{editedUserData.learningStyle.pace}</span>
                    )}
                    
                    <label>Metoda:</label>
                    {isEditing ? (
                        <select 
                            value={editedUserData.learningStyle.method}
                            onChange={(e) => handleChange('learningStyle', 'method', e.target.value)}
                            className="profile-edit-select"
                        >
                            {methodOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    ) : (
                        <span className="style-method-display">{editedUserData.learningStyle.method}</span>
                    )}
                    
                </div>
            </div>
            
            <button className="action-button logout-button" onClick={handleSignOut}>
                <LogOut size={20} style={{marginRight: '8px'}} /> Wyloguj się
            </button>
        </div>
    );
};

export function MyProfileView(){
    const [userData, setUserData] = useState(() => {
        return MockMatchData.getByGuid(currentUserId);
    });

    const handleProfileSave = (newUserData) => {
        setUserData(newUserData); 
    };

    if (!currentUserId || !userData) {
        return <div className="my-profile-view-error">Błąd: Nie można załadować własnego profilu. Upewnij się, że jesteś zalogowany.</div>;
    }

    return(
        <div className="my-profile-view-container">
            <MyProfileDetailsComponent 
                initialUserData={userData} 
                onSave={handleProfileSave}
            />
        </div>
    );
}

export default MyProfileView;