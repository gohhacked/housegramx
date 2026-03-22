import type { FC } from '../../lib/teact/teact';
import {
  memo, useState, useCallback, useRef, useEffect,
} from '../../lib/teact/teact';

import buildClassName from '../../util/buildClassName';

import './ResetLinkButton.scss';

type OwnProps = {
  onReset: NoneToVoidFunction;
};

// Random channel names for animation
const CHANNEL_NAMES = [
  'HouseGramX Official',
  'Tech Updates',
  'Community Hub',
  'News Channel',
  'Announcements',
  'Feature Releases',
  'Support Center',
  'Developer Blog',
  'Security Updates',
  'Beta Testing',
  'User Stories',
  'Tips & Tricks',
  'Product Roadmap',
  'Community Events',
  'Feedback Forum',
];

const ResetLinkButton: FC<OwnProps> = ({ onReset }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedName, setDisplayedName] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const animationIntervalRef = useRef<NodeJS.Timeout>();
  const completeTimeoutRef = useRef<NodeJS.Timeout>();

  const getRandomChannelName = useCallback(() => {
    return CHANNEL_NAMES[Math.floor(Math.random() * CHANNEL_NAMES.length)];
  }, []);

  const handleResetLink = useCallback(() => {
    setIsAnimating(true);
    setIsComplete(false);
    setDisplayedName('');

    let currentIndex = 0;
    const randomName = getRandomChannelName();
    const chars = randomName.split('');

    // Animate text appearance
    animationIntervalRef.current = setInterval(() => {
      if (currentIndex <= chars.length) {
        setDisplayedName(chars.slice(0, currentIndex).join(''));
        currentIndex += 1;
      } else {
        if (animationIntervalRef.current) {
          clearInterval(animationIntervalRef.current);
        }
        // Show complete state after animation
        completeTimeoutRef.current = setTimeout(() => {
          setIsAnimating(false);
          setIsComplete(true);
          onReset();
        }, 1500);
      }
    }, 50);
  }, [getRandomChannelName, onReset]);

  useEffect(() => {
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
      if (completeTimeoutRef.current) {
        clearTimeout(completeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={buildClassName('ResetLinkButton', isAnimating && 'animating', isComplete && 'complete')}>
      {!isAnimating && !isComplete && (
        <button className="reset-btn" onClick={handleResetLink}>
          <span className="icon">🔄</span>
          <span className="text">Reset Link</span>
        </button>
      )}

      {(isAnimating || isComplete) && (
        <div className="animation-container">
          <div className="channel-info">
            <div className="channel-icon">
              <span className="icon-inner">📢</span>
            </div>
            <div className="channel-details">
              <div className="channel-label">Channel Link:</div>
              <div className={buildClassName('channel-name', isComplete && 'complete')}>
                {displayedName}
                {isAnimating && <span className="cursor">|</span>}
              </div>
            </div>
          </div>

          {isComplete && (
            <div className="success-message">
              <span className="checkmark">✓</span>
              <span className="text">Link Generated</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(ResetLinkButton);
