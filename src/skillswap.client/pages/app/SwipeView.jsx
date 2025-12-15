import './SwipeView.css';
import React, { useState, useMemo, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import { MockMatchData } from './../../../skillswap.shared/data/UsersData';
import { useAuth } from '../../../skillswap.shared/components/authentication/AuthContext';

const ICON_DISLIKE = '✖';
const ICON_LIKE = '📚';

const MAX_DISTANCE_X = 120;
const SWIPE_THRESHOLD = window.innerWidth * 0.25;
const SWIPE_OUT_DURATION = 300;

const MatchOverlay = ({ matchedUser, onContinue }) => {
    const { session } = useAuth();
    
    const currentUser = MockMatchData.getByGuid(session?.Guid);
    
    const currentUserImage = currentUser?.imageUrl || 'https://i.ibb.co/b3j6Y33/default-user-icon.jpg'; 

    return (
        <div className="match-overlay-container">
            <div className="match-overlay-backdrop"></div>
            <div className="match-overlay-content">
                <div className="match-celebration">
                    <span role="img" aria-label="Celebration" className="match-icon">💥</span>
                    <h1>🎉 Dopasowano! 🎉</h1>
                </div>
                <div className="match-info">
                    <p>Udało Ci się! Dopasowanie z <span className="matched-user-name">{matchedUser.name}</span>.</p>
                    <div className="match-photos">
                        <img src={currentUserImage} alt="Twój Profil" className="profile-photo"/> 
                        <img src={matchedUser.imageUrl} alt={matchedUser.name} className="matched-photo"/>
                    </div>
                </div>
                <button className="match-continue-button" onClick={onContinue}>
                    Super! Dalej.
                </button>
            </div>
        </div>
    );
};

const SwipeCard = forwardRef(({ user, isTop, onSwipe }, ref) => {
    const cardRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    const dragStart = useRef({ clientX: 0, clientY: 0, offsetX: 0, offsetY: 0 });
    const animationRef = useRef(null);

    const [translation, setTranslation] = useState({ x: 0, y: 0, rotation: 0 });

    const calculateStyles = () => {
        const percentage = Math.min(Math.abs(translation.x) / MAX_DISTANCE_X, 1);

        return {
            transform: `translate(${translation.x}px, ${translation.y}px) rotate(${translation.rotation}deg)`,
            transition: isDragging ? 'none' : `transform ${SWIPE_OUT_DURATION}ms ease-out, box-shadow 0.3s ease`,
            boxShadow: translation.x > 0
                ? `0 0 40px rgba(0, 71, 171, ${percentage * 0.5})`
                : translation.x < 0
                ? `0 0 40px rgba(255, 0, 0, ${percentage * 0.5})`
                : '0 10px 30px rgba(0, 0, 0, 0.2)',
        };
    };

    const triggerSwipe = useCallback((action) => {
        const directionX = action === 'LIKE' ? window.innerWidth * 1.5 : -window.innerWidth * 1.5;
        const rotation = action === 'LIKE' ? 20 : -20;

        setTranslation({ x: directionX, y: 0, rotation });
        onSwipe(user, action);

    }, [onSwipe, user]);

    useImperativeHandle(ref, () => ({ triggerSwipe }));

    const updatePosition = useCallback((newX, newY, newRotation) => {
        setTranslation({ x: newX, y: newY, rotation: newRotation });
        animationRef.current = null;
    }, []);

    const handleStart = useCallback((clientX, clientY) => {
        if (!isTop) return;
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
        dragStart.current = { clientX, clientY, offsetX: translation.x, offsetY: translation.y };
        setIsDragging(true);
        setIsScrolling(false);
        document.body.style.overflow = 'hidden';
    }, [isTop, translation.x, translation.y]);

    const handleMove = useCallback((clientX, clientY, e) => {
        if (!isDragging || !isTop) return;

        const deltaX = clientX - dragStart.current.clientX;
        const deltaY = clientY - dragStart.current.clientY;

        if (!isScrolling && Math.abs(deltaY) > 5 && Math.abs(deltaY) > Math.abs(deltaX * 2)) {
            setIsScrolling(true);
            setIsDragging(false);
            document.body.style.overflow = '';
            return;
        }

        if (isScrolling) return;

        e.preventDefault();
        const newX = dragStart.current.offsetX + deltaX;
        const newY = dragStart.current.offsetY + deltaY;
        const newRotation = newX / 15;

        if (!animationRef.current) {
            animationRef.current = requestAnimationFrame(() => {
                updatePosition(newX, newY, newRotation);
            });
        }
    }, [isDragging, isTop, isScrolling, updatePosition]);

    const handleEnd = useCallback(() => {
        if ((!isDragging && !isScrolling) || !isTop) return;

        document.body.style.overflow = '';
        setIsDragging(false);
        setIsScrolling(false);
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }

        const { x, y, rotation } = translation;
        const shouldSwipe = Math.abs(x) > SWIPE_THRESHOLD;

        if (shouldSwipe) {
            const swipeAction = x > 0 ? 'LIKE' : 'DISLIKE';
            const directionX = x > 0 ? window.innerWidth * 1.5 : -window.innerWidth * 1.5;

            setTranslation({ x: directionX, y, rotation: rotation * 2 });
            onSwipe(user, swipeAction);
        } else {
            setTranslation({ x: 0, y: 0, rotation: 0 });
        }
    }, [isDragging, isScrolling, isTop, translation, user, onSwipe]);

    React.useEffect(() => {
        if (isDragging || isScrolling) {
            window.addEventListener('mouseup', handleEnd);
            window.addEventListener('touchend', handleEnd);
            window.addEventListener('mouseleave', handleEnd);
        } else {
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchend', handleEnd);
            window.removeEventListener('mouseleave', handleEnd);
        }
        return () => {
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchend', handleEnd);
            window.removeEventListener('mouseleave', handleEnd);
        };
    }, [isDragging, isScrolling, handleEnd]);

    const onMouseDown = (e) => handleStart(e.clientX, e.clientY);
    const onMouseMove = (e) => handleMove(e.clientX, e.clientY, e);
    const onTouchStart = (e) => {
        e.stopPropagation();
        handleStart(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchMove = (e) => handleMove(e.touches[0].clientX, e.touches[0].clientY, e);

    return (
        <div
            ref={cardRef}
            className={`swipe-card ${isTop ? 'is-top' : 'is-under'} ${isScrolling ? 'is-scrolling' : ''}`}
            style={{ zIndex: isTop ? 10 : 5, ...calculateStyles() }}
            onMouseDown={isTop ? onMouseDown : null}
            onMouseMove={isTop ? onMouseMove : null}
            onTouchStart={isTop ? onTouchStart : null}
            onTouchMove={isTop ? onTouchMove : null}
        >
            <div className={`swipe-label swipe-label-dislike ${translation.x < -40 ? 'visible' : ''}`} style={{ opacity: Math.min(Math.abs(translation.x) / MAX_DISTANCE_X, 1) }}>NIE</div>
            <div className={`swipe-label swipe-label-like ${translation.x > 40 ? 'visible' : ''}`} style={{ opacity: Math.min(Math.abs(translation.x) / MAX_DISTANCE_X, 1) }}>TAK</div>

            <div className="card-content-wrapper">
                <div className="card-photo-container">
                    <img
                        src={user.imageUrl}
                        alt={`Zdjęcie ${user.name}`}
                        className="card-photo"
                        draggable="false"
                    />
                </div>

                <div className="card-scroll-content">
                    <div className="info-header">
                        <h2>{user.name}, <span className="user-age">{user.age}</span></h2>
                    </div>
                    <div className="info-section">
                        <h4 className="section-title">O mnie:</h4>
                        <p className="bio-text">{user.bio}</p>
                    </div>
                    <div className="info-section">
                        <h4 className="section-title">Szukam wiedzy w:</h4>
                        <div className="preferences-tags">
                            {user.preferences.map((pref, index) => (
                                <span key={index} className="preference-tag-mini">⭐ {pref}</span>
                            ))}
                        </div>
                    </div>
                    <div className="info-section style-section">
                        <h4 className="section-title">Style Nauki:</h4>
                        <div className="style-details">
                            <span className="style-detail-item">Tryb: <span className="style-value">{user.learningStyle.mode}</span></span>
                            <span className="style-detail-item">Tempo: <span className="style-value">{user.learningStyle.pace}</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
SwipeCard.displayName = 'SwipeCard';


export function SwipeView(){
    const initialCandidates = useMemo(() => MockMatchData.getSwipeUsers(), []);
    const [candidates, setCandidates] = useState(initialCandidates);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMatch, setIsMatch] = useState(false);
    const topCardRef = useRef(null);

    const currentCandidate = candidates[currentIndex];
    const nextCandidate = candidates[currentIndex + 1];
    const isStackEmpty = currentIndex >= candidates.length;

    const handleContinue = () => {
        setIsMatch(false);

        setTimeout(() => {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }, 50);
    }

    const handleSwipe = (user, action) => {
        if (isStackEmpty) return;

        if (action === 'LIKE' && user.name === 'Kinga') {
            setIsMatch(true);
            return;
        }

        setTimeout(() => {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }, SWIPE_OUT_DURATION);
    };

    const handleButtonClick = (action) => {
        if (isStackEmpty || !topCardRef.current || isMatch) return;
        topCardRef.current.triggerSwipe(action);
    };

    return(
        <div className='swipe-view-container'>
            <div className='swipe-view-stack'>

                {isStackEmpty ? (
                    <div className="empty-swipe-card">
                        <div className="empty-state-content">
                            <span style={{fontSize: '4rem'}}>🎉</span>
                            <h2>To już wszyscy!</h2>
                            <p>Nie ma więcej kandydatów w Twojej okolicy.</p>
                            <p className="empty-hint">Wróć później lub zmień filtry wyszukiwania.</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {nextCandidate && (
                             <SwipeCard
                                 key={nextCandidate.guid}
                                 user={nextCandidate}
                                 isTop={false}
                                 onSwipe={()=>{}}
                             />
                        )}
                        <SwipeCard
                            ref={topCardRef}
                            key={currentCandidate.guid}
                            user={currentCandidate}
                            isTop={true}
                            onSwipe={handleSwipe}
                        />
                        <div className="swipe-controls-overlay">
                            <button
                                className="swipe-button dislike"
                                onClick={() => handleButtonClick('DISLIKE')}
                                disabled={isStackEmpty || isMatch}
                                title="Pomiń"
                            >
                                <span role="img" aria-label="Pomiń">{ICON_DISLIKE}</span>
                            </button>
                            <button
                                className="swipe-button like"
                                onClick={() => handleButtonClick('LIKE')}
                                disabled={isStackEmpty || isMatch}
                                title="Dopasuj"
                            >
                                <span role="img" aria-label="Dopasuj">{ICON_LIKE}</span>
                            </button>
                        </div>
                    </>
                )}

                {isMatch && currentCandidate && (
                    <MatchOverlay
                        matchedUser={currentCandidate}
                        onContinue={handleContinue}
                    />
                )}
            </div>
        </div>
    )
}

export default SwipeView;