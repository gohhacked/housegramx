import { memo, useState } from '../../lib/teact/teact';
import type { FC } from '../../lib/teact/teact';

import MenuItem from '../ui/MenuItem';
import ThemeCustomizer from './ThemeCustomizer';

const ThemeCustomizerButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MenuItem
        icon="palette"
        onClick={() => setIsOpen(true)}
      >
        🎨 Кастомизация
      </MenuItem>

      <ThemeCustomizer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default memo(ThemeCustomizerButton);
