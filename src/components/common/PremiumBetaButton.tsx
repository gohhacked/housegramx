import { memo, useState } from '../../lib/teact/teact';
import type { FC } from '../../lib/teact/teact';

import { getPremiumStatus, getTrialDaysRemaining } from '../../api/gramjs/helpers/premium';
import buildClassName from '../../util/buildClassName';

import Button from '../ui/Button';
import PremiumBetaModal from './PremiumBetaModal';

import './PremiumBetaButton.scss';

const PremiumBetaButton: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const status = getPremiumStatus();
  const daysRemaining = getTrialDaysRemaining();

  return (
    <>
      <Button
        className={buildClassName(
          'premium-beta-button',
          status.isActive && 'active',
        )}
        onClick={() => setIsModalOpen(true)}
        title={status.isActive ? `Premium активен (${daysRemaining} дней)` : 'Получить Premium'}
      >
        <span className="premium-icon">⭐</span>
        <span className="premium-text">
          {status.isActive ? `Premium (${daysRemaining}д)` : 'Premium'}
        </span>
      </Button>

      <PremiumBetaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default memo(PremiumBetaButton);
