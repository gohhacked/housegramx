let RE_NOT_LETTER: RegExp;

try {
  RE_NOT_LETTER = /[^\p{L}\p{M}]+/ui;
} catch (e) {
  // Support for older versions of firefox
  RE_NOT_LETTER = /[^\wа-яёґєії]+/i;
}

// Normalize RTL text (Arabic, Hebrew, etc.) for proper search
function normalizeRtlText(text: string): string {
  // Remove RTL marks and normalize spacing
  return text
    .replace(/[\u200E\u200F\u202A-\u202E]/g, '') // Remove RTL/LTR marks
    .replace(/\u0640/g, '') // Remove Arabic Tatweel
    .trim();
}

export default function searchWords(haystack: string, needle: string | string[]) {
  if (!haystack || !needle) {
    return false;
  }

  // Normalize RTL text for both haystack and needle
  const normalizedHaystack = normalizeRtlText(haystack);
  const normalizedNeedle = typeof needle === 'string' ? normalizeRtlText(needle) : needle;

  const needleWords = typeof normalizedNeedle === 'string' 
    ? normalizedNeedle.toLowerCase().split(RE_NOT_LETTER).filter(Boolean)
    : normalizedNeedle;
  const haystackLower = normalizedHaystack.toLowerCase();

  // @optimization
  if (needleWords.length === 1 && !haystackLower.includes(needleWords[0])) {
    return false;
  }

  let haystackWords: string[];

  return needleWords.every((needleWord) => {
    if (!haystackLower.includes(needleWord)) {
      return false;
    }

    if (!haystackWords) {
      haystackWords = haystackLower.split(RE_NOT_LETTER).filter(Boolean);
    }

    return haystackWords.some((haystackWord) => haystackWord.startsWith(needleWord));
  });
}

export function prepareSearchWordsForNeedle(needle: string) {
  const needleWords = needle.toLowerCase().split(RE_NOT_LETTER);

  return (haystack: string) => searchWords(haystack, needleWords);
}
