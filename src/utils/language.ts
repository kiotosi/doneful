import { SupportedLanguages } from "../types/language.types";

/**
 * Detect user language
 * @returns Language from navigator object
 */
export function detectLanguauge(): SupportedLanguages {
  switch(navigator.language) {
  case 'ua-UA':
  case 'ru-RU':
  case 'en-US':
  case 'ja-JP':
    return navigator.language;
  default:
    return 'en-US';
  }
}