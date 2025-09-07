import koTranslations from '../i18n/ko.json';

/**
 * Type definition for a constant option with category and id
 */
type ConstantOption = {
  id: string;
  category: string;
  defaultCode: string;
};

/**
 * Gets the translated text for a constant option
 * @param option The constant option containing id and category
 * @returns The translated text, or the defaultCode if no translation is found
 */
export function getTranslatedText(option: ConstantOption): string {
  if (!option || !option.category || !option.id) {
    return '';
  }

  const translationKey = `${option.category}.${option.id}`;
  const translation = (koTranslations as Record<string, string>)[translationKey];

  // Return the translation if found, otherwise fall back to defaultCode
  return translation || option.defaultCode;
}

/**
 * Gets the translated text for a constant option by its id and category
 * @param id The id of the constant option
 * @param category The category of the constant option
 * @param defaultText The default text to return if no translation is found
 * @returns The translated text, or the defaultText if no translation is found
 */
export function getTranslatedTextById(id: string, category: string, defaultText: string = ''): string {
  if (!id || !category) {
    return defaultText;
  }

  const translationKey = `${category}.${id}`;
  const translation = (koTranslations as Record<string, string>)[translationKey];

  // Return the translation if found, otherwise fall back to defaultText
  return translation || defaultText;
}
