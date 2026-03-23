import type React from '../../lib/teact/teact';
import { memo, useState } from '../../lib/teact/teact';
import type { FC } from '../../lib/teact/teact';

import { getPremiumStatus, getTrialDaysRemaining } from '../../api/gramjs/helpers/premium';

import MenuItem from '../ui/MenuItem';
import PremiumBetaModal from './PremiumBetaModal';

const PremiumBetaButton: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const status = getPremiumStatus();
  const daysRemaining = getTrialDaysRemaining();

  return (
    <>
      <MenuItem
        icon="premium"
        onClick={() => setIsModalOpen(true)}
      >
        <span style={{
          background: status.isActive 
            ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 600,
        } as React.CSSProperties}
        >
          ⭐ {status.isActive ? `Premium (${daysRemaining}д)` : 'Premium Beta'}
        </span>
      </MenuItem>

      <PremiumBetaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default memo(PremiumBetaButton);
