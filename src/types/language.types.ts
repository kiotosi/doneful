import ru from '../locales/ru.json';
import en from '../locales/en.json';
import ua from '../locales/ua.json';
import ja from '../locales/ja.json';

export type DictionarySchema  = typeof en | typeof ru | typeof ja | typeof ua;
export type SupportedLanguages = 'en-US' | 'ja-JP' | 'ru-RU' | 'ua-UA';