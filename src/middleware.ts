import { defineMiddleware } from 'astro:middleware';

/**
 * Simple pass‑through middleware for manual i18n routing.
 * 
 * In a production site you might want to:
 * - Detect user's preferred locale from `Accept‑Language`
 * - Redirect to the appropriate `/lang/` path
 * - Set a cookie for persistence
 * 
 * For now we just pass the request through.
 */
export const onRequest = defineMiddleware((context, next) => {
  // Example: add a header to indicate i18n is active
  context.locals.i18n = {
    defaultLocale: 'ru',
    locales: ['ru', 'en', 'de'],
  };

  // You could also rewrite the URL based on some logic here
  // if you want to implement automatic locale detection.

  return next();
});