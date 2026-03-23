import type React from '../../lib/teact/teact';
import { memo, useState, useEffect } from '../../lib/teact/teact';
import type { FC } from '../../lib/teact/teact';

import { PRESET_THEMES, AVAILABLE_FONTS } from '../../api/types/customization';
import {
  getCustomizationSettings,
  setActiveTheme,
  setFont,
  setCompactMode,
  setFocusMode,
  uploadCustomBackground,
  createCustomTheme,
} from '../../api/gramjs/helpers/customization';

import Modal from '../ui/Modal';
import Button from '../ui/Button';

import './ThemeCustomizer.scss';

interface OwnProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeCustomizer: FC<OwnProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState(getCustomizationSettings());
  const [activeTab, setActiveTab] = useState<'themes' | 'background' | 'font' | 'modes'>('themes');
  const [uploadingBg, setUploadingBg] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSettings(getCustomizationSettings());
    }
  }, [isOpen]);

  const handleThemeSelect = (themeId: string) => {
    setActiveTheme(themeId);
    setSettings(getCustomizationSettings());
  };

  const handleFontSelect = (fontId: string) => {
    setFont(fontId);
    setSettings(getCustomizationSettings());
  };

  const handleCompactModeToggle = () => {
    const newValue = !settings.compactMode;
    setCompactMode(newValue);
    setSettings(getCustomizationSettings());
  };

  const handleFocusModeToggle = () => {
    const newValue = !settings.focusMode;
    setFocusMode(newValue);
    setSettings(getCustomizationSettings());
  };

  const handleBackgroundUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingBg(true);
    try {
      const dataUrl = await uploadCustomBackground(file);
      const themeId = createCustomTheme({
        name: 'Моя тема',
        colors: PRESET_THEMES[0].colors,
        chatBackground: {
          type: 'image',
          value: dataUrl,
        },
      });
      setActiveTheme(themeId);
      setSettings(getCustomizationSettings());
    } catch (error) {
      console.error('Error uploading background:', error);
    } finally {
      setUploadingBg(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="ThemeCustomizer">
      <div className="theme-customizer-content">
        <h2>🎨 Кастомизация</h2>

        <div className="tabs">
          <button
            className={activeTab === 'themes' ? 'active' : ''}
            onClick={() => setActiveTab('themes')}
          >
            Темы
          </button>
          <button
            className={activeTab === 'background' ? 'active' : ''}
            onClick={() => setActiveTab('background')}
          >
            Фон
          </button>
          <button
            className={activeTab === 'font' ? 'active' : ''}
            onClick={() => setActiveTab('font')}
          >
            Шрифт
          </button>
          <button
            className={activeTab === 'modes' ? 'active' : ''}
            onClick={() => setActiveTab('modes')}
          >
            Режимы
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'themes' && (
            <div className="themes-grid">
              {PRESET_THEMES.map((theme) => (
                <div
                  key={theme.id}
                  className={`theme-card ${settings.activeTheme === theme.id ? 'active' : ''}`}
                  onClick={() => handleThemeSelect(theme.id)}
                >
                  <div
                    className="theme-preview"
                    style={{
                      background: theme.chatBackground?.type === 'gradient'
                        ? `linear-gradient(135deg, ${(theme.chatBackground.value as string[]).join(', ')})`
                        : theme.colors.primary,
                    }}
                  />
                  <div className="theme-name">{theme.name}</div>
                  {settings.activeTheme === theme.id && (
                    <div className="theme-check">✓</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'background' && (
            <div className="background-section">
              <h3>Загрузить свой фон</h3>
              <p className="description">
                Загрузи свою картинку или GIF для фона чатов
              </p>
              <label className="upload-button">
                <input
                  type="file"
                  accept="image/*,image/gif"
                  onChange={handleBackgroundUpload}
                  style={{ display: 'none' }}
                />
                <Button isLoading={uploadingBg}>
                  {uploadingBg ? 'Загрузка...' : '📁 Выбрать файл'}
                </Button>
              </label>

              <div className="live-backgrounds">
                <h3>Живые обои</h3>
                <div className="live-bg-grid">
                  {PRESET_THEMES.filter((t) => t.chatBackground?.type === 'animated').map((theme) => (
                    <div
                      key={theme.id}
                      className="live-bg-card"
                      onClick={() => handleThemeSelect(theme.id)}
                    >
                      <div className="live-bg-preview">
                        <span className="live-icon">🌊</span>
                      </div>
                      <div className="live-bg-name">{theme.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'font' && (
            <div className="font-section">
              <h3>Выбор шрифта</h3>
              <div className="font-list">
                {AVAILABLE_FONTS.map((font) => (
                  <div
                    key={font.id}
                    className={`font-item ${settings.font === font.id ? 'active' : ''}`}
                    onClick={() => handleFontSelect(font.id)}
                    style={{ fontFamily: font.value }}
                  >
                    <span className="font-name">{font.name}</span>
                    <span className="font-sample">Пример текста АБВ 123</span>
                    {settings.font === font.id && <span className="check">✓</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'modes' && (
            <div className="modes-section">
              <div className="mode-item">
                <div className="mode-info">
                  <h3>📐 Компактный режим</h3>
                  <p>Уменьшенные отступы для большего контента на экране</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.compactMode}
                    onChange={handleCompactModeToggle}
                  />
                  <span className="slider" />
                </label>
              </div>

              <div className="mode-item">
                <div className="mode-info">
                  <h3>🎯 Режим фокуса</h3>
                  <p>Скрывает отвлекающие элементы для концентрации на чатах</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.focusMode}
                    onChange={handleFocusModeToggle}
                  />
                  <span className="slider" />
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="customizer-footer">
          <Button onClick={onClose}>Закрыть</Button>
        </div>
      </div>
    </Modal>
  );
};

export default memo(ThemeCustomizer);
