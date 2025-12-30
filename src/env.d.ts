/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    i18n?: {
      defaultLocale: string;
      locales: string[];
    };
  }
}