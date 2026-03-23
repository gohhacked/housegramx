import { memo, useState } from '../../lib/teact/teact';
import type { FC } from '../../lib/teact/teact';

import { activateFreeTrial, getPremiumStatus } from '../../api/gramjs/helpers/premium';
import buildClassName from '../../util/buildClassName';
import useLang from '../../hooks/useLang';

import Modal from '../ui/Modal';
import Button from '../ui/Button';

import './PremiumBetaModal.scss';

interface OwnProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumBetaModal: FC<OwnProps> = ({ isOpen, onClose }) => {
  const lang = useLang();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const status = getPremiumStatus();

  const handleActivateTrial = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const success = activateFreeTrial();
      if (success) {
        setShowConfirm(true);
        setTimeout(() => {
          onClose();
          setShowConfirm(false);
          setIsLoading(false);
          // Reload to apply premium features
          window.location.reload();
        }, 2000);
      } else {
        setIsLoading(false);
        alert('Вы уже использовали бесплатный тест!');
      }
    }, 500);
  };

  if (showConfirm) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} className="PremiumBetaModal">
        <div className="premium-modal-content success">
          <div className="success-icon">✨</div>
          <h2>Поздравляем!</h2>
          <p>Premium активирован на 5 дней</p>
          <p className="subtitle">Наслаждайтесь всеми премиум функциями</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="PremiumBetaModal">
      <div className="premium-modal-content">
        <div className="premium-header">
          <div className="premium-badge">BETA</div>
          <h2>HouseGramX Premium</h2>
          <p className="subtitle">Получи доступ ко всем премиум функциям</p>
        </div>

        <div className="features-list">
          <div className="feature-item">
            <span className="feature-icon">✨</span>
            <span className="feature-text">Премиум эмодзи и стикеры</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📁</span>
            <span className="feature-text">Больший лимит загрузки файлов</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎨</span>
            <span className="feature-text">Кастомные темы оформления</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🔍</span>
            <span className="feature-text">Расширенный поиск</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💬</span>
            <span className="feature-text">Приоритетная поддержка</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📤</span>
            <span className="feature-text">Экспорт чатов</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🔔</span>
            <span className="feature-text">Кастомные уведомления</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🚫</span>
            <span className="feature-text">Без рекламы</span>
          </div>
        </div>

        <div className="trial-info">
          <div className="trial-badge">БЕСПЛАТНЫЙ ТЕСТ</div>
          <p className="trial-text">5 дней полного доступа</p>
          <p className="trial-note">Только один раз на аккаунт</p>
        </div>

        {status.hasUsedFreeTrial && (
          <div className="already-used">
            <p>Вы уже использовали бесплатный тест</p>
          </div>
        )}

        <div className="modal-actions">
          <Button
            onClick={onClose}
            className="cancel-btn"
          >
            Отмена
          </Button>
          <Button
            onClick={handleActivateTrial}
            disabled={status.hasUsedFreeTrial || isLoading}
            isLoading={isLoading}
            className="activate-btn"
          >
            {isLoading ? 'Активирую...' : 'Получить бесплатно'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default memo(PremiumBetaModal);
