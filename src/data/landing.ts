import {
  Server,
  Workflow,
  Database,
  BrainCircuit,
  MessageCircle,
  ShieldCheck,
  Zap,
  Bot,
  Brain,
  Wrench,
} from 'lucide-react';

export const getLandingData = (lang: string) => {
  // Translations dictionary
  const translations = {
    ru: {
      competenciesTitle: 'Компетенции',
      competenciesSub: 'Ключевые технологии и области экспертизы',
      solutionsTitle: 'Решения',
      solutionsSub: 'Решения и услуги для бизнеса',
      archDesc: 'Event-Driven, Dispatcher/Worker, Microservices, Serverless',
      n8nDesc: 'Сложные workflow, Error Handling, Webhooks, API Integrations',
      backendDesc: 'Node.js, Python, Go, High‑Load Systems, Database Design',
      aiDesc: 'LLM Integration, RAG, Fine‑Tuning, NLP, Computer Vision',
      commDesc: 'Telegram Bots, Slack Apps, Discord Bots, Notifications',
      securityDesc: 'Audit, Pen‑Testing, Secure Architecture, Compliance',
      saasDesc: 'Полный цикл разработки SaaS‑продуктов: от идеи до масштабирования.',
      automationDesc: 'Автоматизация бизнес‑процессов с помощью n8n, Make, Zapier.',
      aiSolutionsDesc: 'Внедрение AI‑моделей в продукты, чат‑боты, аналитика.',
      consultingDesc: 'Технический консалтинг, архитектурный аудит, DevOps.',
    },
    en: {
      competenciesTitle: 'Competencies',
      competenciesSub: 'Core technologies and expertise areas',
      solutionsTitle: 'Solutions',
      solutionsSub: 'Business-focused solutions and services',
      archDesc: 'Event-Driven, Dispatcher/Worker, Microservices, Serverless',
      n8nDesc: 'Complex workflows, Error Handling, Webhooks, API Integrations',
      backendDesc: 'Node.js, Python, Go, High‑Load Systems, Database Design',
      aiDesc: 'LLM Integration, RAG, Fine‑Tuning, NLP, Computer Vision',
      commDesc: 'Telegram Bots, Slack Apps, Discord Bots, Notifications',
      securityDesc: 'Audit, Pen‑Testing, Secure Architecture, Compliance',
      saasDesc: 'Full‑cycle SaaS product development: from idea to scaling.',
      automationDesc: 'Business process automation with n8n, Make, Zapier.',
      aiSolutionsDesc: 'AI model integration into products, chatbots, analytics.',
      consultingDesc: 'Technical consulting, architecture audit, DevOps.',
    },
    de: {
      competenciesTitle: 'Kompetenzen',
      competenciesSub: 'Kernkompetenzen und Technologiebereiche',
      solutionsTitle: 'Lösungen',
      solutionsSub: 'Lösungen und Dienstleistungen für Unternehmen',
      archDesc: 'Event-Driven, Dispatcher/Worker, Microservices, Serverless',
      n8nDesc: 'Komplexe Workflows, Error Handling, Webhooks, API-Integrationen',
      backendDesc: 'Node.js, Python, Go, Hochlastsysteme, Datenbankdesign',
      aiDesc: 'LLM-Integration, RAG, Fine‑Tuning, NLP, Computer Vision',
      commDesc: 'Telegram Bots, Slack Apps, Discord Bots, Benachrichtigungen',
      securityDesc: 'Audit, Pen‑Testing, Sichere Architektur, Compliance',
      saasDesc: 'Full‑Cycle SaaS‑Produktentwicklung: von der Idee zur Skalierung.',
      automationDesc: 'Automatisierung von Geschäftsprozessen mit n8n, Make, Zapier.',
      aiSolutionsDesc: 'KI‑Modellintegration in Produkte, Chatbots, Analytik.',
      consultingDesc: 'Technische Beratung, Architekturaudit, DevOps.',
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  return {
    competencies: [
      {
        title: lang === 'ru' ? 'Архитектура' : 'Architecture',
        icon: Server,
        description: t.archDesc,
      },
      {
        title: lang === 'ru' ? 'n8n Expert' : 'n8n Expert',
        icon: Workflow,
        description: t.n8nDesc,
      },
      {
        title: lang === 'ru' ? 'Backend Development' : 'Backend Development',
        icon: Database,
        description: t.backendDesc,
      },
      {
        title: lang === 'ru' ? 'AI & Machine Learning' : 'AI & Machine Learning',
        icon: BrainCircuit,
        description: t.aiDesc,
      },
      {
        title: lang === 'ru' ? 'Communication Bots' : 'Communication Bots',
        icon: MessageCircle,
        description: t.commDesc,
      },
      {
        title: lang === 'ru' ? 'Security & Audit' : 'Security & Audit',
        icon: ShieldCheck,
        description: t.securityDesc,
      },
    ],
    solutions: [
      {
        title: lang === 'ru' ? 'SaaS Ecosystems' : 'SaaS Ecosystems',
        icon: Zap,
        description: t.saasDesc,
      },
      {
        title: lang === 'ru' ? 'Process Automation' : 'Process Automation',
        icon: Bot,
        description: t.automationDesc,
      },
      {
        title: lang === 'ru' ? 'AI Solutions' : 'AI Solutions',
        icon: Brain,
        description: t.aiSolutionsDesc,
      },
      {
        title: lang === 'ru' ? 'Technical Consulting' : 'Technical Consulting',
        icon: Wrench,
        description: t.consultingDesc,
      },
    ],
    texts: {
      competenciesTitle: t.competenciesTitle,
      competenciesSub: t.competenciesSub,
      solutionsTitle: t.solutionsTitle,
      solutionsSub: t.solutionsSub,
    },
  };
};