/**
 * UI dictionary for Run Swift Studio v3.
 * Keys are consistent across languages.
 */

export type Lang = 'ru' | 'en' | 'de';

export type Dictionary = {
  nav: {
    home: string;
    about: string;
    portfolio: string;
    blog: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  footer: {
    copyright: string;
    madeWith: string;
    links: {
      privacy: string;
      terms: string;
      github: string;
    };
  };
  theme: {
    dark: string;
    light: string;
    toggle: string;
  };
};

export const ui: Record<Lang, Dictionary> = {
  ru: {
    nav: {
      home: 'Главная',
      about: 'О студии',
      portfolio: 'Портфолио',
      blog: 'Блог',
      contact: 'Контакты',
    },
    hero: {
      title: 'Run Swift Studio',
      subtitle: 'Создаём цифровые продукты с фокусом на скорость и качество.',
      cta: 'Обсудить проект',
    },
    footer: {
      copyright: '© 2025 Run Swift Studio. Все права защищены.',
      madeWith: 'Сделано с ❤️ в Барнауле.',
      links: {
        privacy: 'Политика конфиденциальности',
        terms: 'Условия использования',
        github: 'GitHub',
      },
    },
    theme: {
      dark: 'Тёмная',
      light: 'Светлая',
      toggle: 'Переключить тему',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      portfolio: 'Portfolio',
      blog: 'Blog',
      contact: 'Contact',
    },
    hero: {
      title: 'Run Swift Studio',
      subtitle: 'We build digital products with a focus on speed and quality.',
      cta: 'Discuss a project',
    },
    footer: {
      copyright: '© 2025 Run Swift Studio. All rights reserved.',
      madeWith: 'Made with ❤️ in Barnaul.',
      links: {
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        github: 'GitHub',
      },
    },
    theme: {
      dark: 'Dark',
      light: 'Light',
      toggle: 'Toggle theme',
    },
  },
  de: {
    nav: {
      home: 'Startseite',
      about: 'Über uns',
      portfolio: 'Portfolio',
      blog: 'Blog',
      contact: 'Kontakt',
    },
    hero: {
      title: 'Run Swift Studio',
      subtitle: 'Wir entwickeln digitale Produkte mit Fokus auf Geschwindigkeit und Qualität.',
      cta: 'Projekt besprechen',
    },
    footer: {
      copyright: '© 2025 Run Swift Studio. Alle Rechte vorbehalten.',
      madeWith: 'Hergestellt mit ❤️ in Barnaul.',
      links: {
        privacy: 'Datenschutzrichtlinie',
        terms: 'Nutzungsbedingungen',
        github: 'GitHub',
      },
    },
    theme: {
      dark: 'Dunkel',
      light: 'Hell',
      toggle: 'Thema wechseln',
    },
  },
};

/**
 * Helper to get dictionary for a given language.
 */
export function getDictionary(lang: Lang): Dictionary {
  return ui[lang];
}

/**
 * Get available languages with their native names.
 */
export const languages: { code: Lang; name: string; flag: string }[] = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];