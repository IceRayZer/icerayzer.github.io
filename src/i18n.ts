import { createI18n } from 'vue-i18n';

const defaultLocale = navigator.language?.split('-')?.[0] ?? 'en';

const i18n = createI18n({
  locale: defaultLocale,
  messages: {},
  legacy: false,
});

const languagesImports = import.meta.glob(`./assets/locales/*.json`);
const languagesKeys = Object.keys(languagesImports);
for (const langKey of languagesKeys) {
  const lang = langKey.match(/([^/]+)\.json$/)?.[1] ?? '';
  const messages = ((await languagesImports[langKey]()) as { default: Record<string, string> }).default;
  i18n.global.setLocaleMessage(lang, messages);
  if (lang === defaultLocale) {
    i18n.global.locale.value = lang;
  }
}

export default i18n;
