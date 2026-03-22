import type { FC } from '../../../lib/teact/teact';
import {
  memo, useState, useCallback, useRef, useEffect,
} from '../../../lib/teact/teact';

import type { TextCorrectionResult } from '../../../api/gramjs/helpers/textCorrection';
import { correctTextWithAI } from '../../../api/gramjs/helpers/textCorrection';
import buildClassName from '../../../util/buildClassName';
import useLang from '../../../hooks/useLang';

import './TextCorrectionButton.scss';

type OwnProps = {
  text: string;
  onCorrected: (correctedText: string) => void;
  onClose: NoneToVoidFunction;
};

const TextCorrectionButton: FC<OwnProps> = ({
  text,
  onCorrected,
  onClose,
}) => {
  const lang = useLang();
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [correctionResult, setCorrectionResult] = useState<TextCorrectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout>();

  const handleCorrectText = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsAnimating(true);

    try {
      const result = await correctTextWithAI(text);
      setCorrectionResult(result);

      // Animation duration
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsAnimating(false);
    } finally {
      setIsLoading(false);
    }
  }, [text]);

  const handleApplyCorrection = useCallback(() => {
    if (correctionResult?.corrected) {
      onCorrected(correctionResult.corrected);
      onClose();
    }
  }, [correctionResult, onCorrected, onClose]);

  const handleCancel = useCallback(() => {
    setCorrectionResult(null);
    setError(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  if (error) {
    return (
      <div className="TextCorrectionButton error">
        <div className="error-message">
          {error}
        </div>
        <button className="error-close" onClick={handleCancel}>✕</button>
      </div>
    );
  }

  if (correctionResult) {
    return (
      <div className={buildClassName('TextCorrectionButton result', isAnimating && 'animating')}>
        <div className="correction-header">
          <span className="correction-title">✓ Text Corrected</span>
        </div>
        <div className="correction-content">
          <div className="original-text">
            <span className="label">Original:</span>
            <p>{correctionResult.original}</p>
          </div>
          <div className="corrected-text">
            <span className="label">Corrected:</span>
            <p>{correctionResult.corrected}</p>
          </div>
        </div>
        <div className="correction-actions">
          <button className="btn-apply" onClick={handleApplyCorrection}>
            Apply
          </button>
          <button className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={buildClassName('TextCorrectionButton', isLoading && 'loading')}>
      <button
        className="correction-btn"
        onClick={handleCorrectText}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner" />
            Correcting...
          </>
        ) : (
          <>
            <span className="icon">✨</span>
            Correct with AI
          </>
        )}
      </button>
    </div>
  );
};

export default memo(TextCorrectionButton);
