import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import es from './es.json';

const resources = { en, es };

export const availableLanguages = Object.keys(resources);

i18n.use(initReactI18next).init({
  resources,
  defaultNS: 'translation',
  fallbackLng: 'en'
});
