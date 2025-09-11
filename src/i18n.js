import { createI18n } from "vue-i18n";

function loadLocaleMessages() {
  const locales = import.meta.glob("./locales/*/*.json", { eager: true });
  const messages = {};

  for (const path in locales) {
    const matched = path.match(
      /\.\/locales\/([a-zA-Z0-9-_]+)\/([a-zA-Z0-9-_]+)\.json$/
    );
    if (matched) {
      const locale = matched[1];
      const key = matched[2];

      if (!messages[locale]) {
        messages[locale] = {};
      }
      messages[locale][key] = locales[path];
    }
  }

  return messages;
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("lang") || "ar",
  fallbackLocale: "en",
  messages: loadLocaleMessages(),
});

export default i18n;
