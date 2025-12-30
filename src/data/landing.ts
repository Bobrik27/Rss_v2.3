import { 
  Server, Workflow, Database, BrainCircuit, 
  MessageCircle, ShieldCheck, Zap, Bot, Brain, Wrench,
  User, Target, Rocket, CheckCircle, Clock, BarChart, Mail
} from 'lucide-react';

export const getLandingData = (lang: string) => {
  const isRu = lang === 'ru';

  const t = {
    competenciesTitle: isRu ? "Компетенции" : "Core Competencies",
    competenciesSub: isRu ? "Ключевые технологии и области экспертизы" : "Enterprise-grade skills for building robust systems",
    solutionsTitle: isRu ? "Решения" : "Solutions",
    solutionsSub: isRu ? "Решения и услуги для бизнеса" : "Real-world automation systems",
    aboutTitle: isRu ? "О студии" : "About the Studio",
    aboutSub: isRu ? "Создаем сложные автоматизированные системы, которые работают без сбоев" : "We build complex automation systems that run flawlessly",
    aboutText: isRu ? [
      "Run Swift Studio — это команда инженеров, которые проектируют и внедряют автоматизацию уровня enterprise.",
      "Мы не просто «делаем ботов». Мы строим целые экосистемы, где каждый компонент — от базы данных до интерфейса — работает как единый механизм.",
      "Наша специализация: сложные сценарии, требующие высокой надежности, интеграции с внешними API и обработки больших объемов данных."
    ] : [
      "Run Swift Studio is a team of engineers designing and implementing enterprise‑grade automation.",
      "We don't just 'make bots'. We build entire ecosystems where every component—from database to UI—works as a single mechanism.",
      "Our specialty: complex scenarios that demand high reliability, external API integrations, and large‑scale data processing."
    ],
    approachTitle: isRu ? "Подход" : "Our Approach",
    approachSub: isRu ? "Принципы, по которым мы работаем" : "Principles that guide our work",
    ctaTitle: isRu ? "Готовы автоматизировать бизнес?" : "Ready to automate your business?",
    ctaSub: isRu ? "Обсудим вашу задачу и предложим решение" : "Let's discuss your challenge and propose a solution",
    ctaButton: isRu ? "Начать диалог" : "Start a conversation"
  };

  // TECHNICAL STACK (The Manifesto)
  const competencies = [
    {
      title: isRu ? "Архитектура и Автоматизация" : "Architecture & Automation",
      icon: Server,
      items: isRu ? [
        "Event-Driven архитектура",
        "Паттерны Orchestrator / Worker",
        "State Machines (FSM)",
        "Отказоустойчивые пайплайны"
      ] : ["Event-Driven Architecture", "Orchestrator patterns", "State Machines (FSM)", "Fault-tolerant pipelines"]
    },
    {
      title: isRu ? "Движок n8n Expert" : "n8n Automation Engine",
      icon: Workflow,
      items: isRu ? [
        "Сложные сценарии (ветвления, циклы)",
        "Глобальная обработка ошибок",
        "Кастомная логика (Code Nodes)",
        "Webhooks, Queues & Batching"
      ] : ["Complex workflows", "Global Error Handling", "Custom Code Logic", "Webhooks & Batching"]
    },
    {
      title: isRu ? "Backend и Инфраструктура" : "Backend & Infrastructure",
      icon: Database,
      items: isRu ? [
        "PostgreSQL / Redis / Qdrant",
        "Очереди сообщений RabbitMQ",
        "Docker / Docker Compose",
        "S3 Storage (MinIO)"
      ] : ["PostgreSQL / Redis", "RabbitMQ queues", "Docker / Compose", "S3 Storage"]
    },
    {
      title: isRu ? "AI / LLM Интеграции" : "AI / LLM Integration",
      icon: BrainCircuit,
      items: isRu ? [
        "OpenAI, Ollama, Anthropic",
        "RAG системы (Vector Search)",
        "Structured Output (JSON Repair)",
        "Генерация медиа (ComfyUI)"
      ] : ["OpenAI, Ollama, Anthropic", "RAG systems", "Structured Output", "Media Gen (ComfyUI)"]
    },
    {
      title: isRu ? "Экосистема Telegram" : "Telegram Ecosystem",
      icon: MessageCircle,
      items: isRu ? [
        "Telegram Bot API (Deep Dive)",
        "Mini Apps / Web Apps",
        "Прием платежей и подписки",
        "Безопасность токенов и данных"
      ] : ["Bot API expertise", "Mini Apps / Web Apps", "Payments", "Security"]
    },
    {
      title: isRu ? "Надежность (Reliability)" : "Reliability Engineering",
      icon: ShieldCheck,
      items: isRu ? [
        "Стратегии Retry и Idempotency",
        "Мониторинг состояний",
        "Root Cause Analysis",
        "Автоматическое восстановление"
      ] : ["Retry strategies", "State monitoring", "Root Cause Analysis", "Self-healing systems"]
    }
  ];

  // BUSINESS SOLUTIONS
  const solutions = [
    {
      title: isRu ? "Автономные SMM Экосистемы" : "Autonomous SMM Ecosystems",
      icon: Zap,
      description: isRu 
        ? "Полная автоматизация контент-маркетинга. Планирование, копирайтинг, генерация картинок/видео, согласование и постинг без участия человека."
        : "Complete social media automation. Planning, copywriting, media generation, approval workflows, and publishing."
    },
    {
      title: isRu ? "Сложные Telegram Платформы" : "Complex Telegram Platforms",
      icon: Bot,
      description: isRu
        ? "Enterprise-решения в мессенджере. HR-сервисы, доски объявлений, закрытые сообщества с платной подпиской и личными кабинетами."
        : "Enterprise-grade solutions. HR services, job boards, community portals with monetization."
    },
    {
      title: isRu ? "AI Ассистенты и Агенты" : "AI Assistants & Agents",
      icon: Brain,
      description: isRu
        ? "Кастомные нейро-сотрудники на базе ваших данных (RAG). Работают по четкой бизнес-логике, не выдумывают факты, интегрированы в CRM."
        : "Custom AI agents on company data (RAG). Business logic integration. No hallucinations—just results."
    },
    {
      title: isRu ? "Аудит и Рефакторинг" : "System Audits & Refactoring",
      icon: Wrench,
      description: isRu
        ? "Лечение автоматизаций, которые «постоянно падают». Анализ архитектуры, поиск узких мест и пересборка в стабильную систему."
        : "Fixing automations that constantly crash. Architecture review and transformation into stable systems."
    }
  ];

  // ABOUT SECTION
  const about = {
    title: t.aboutTitle,
    subtitle: t.aboutSub,
    paragraphs: t.aboutText,
    stats: [
      { label: isRu ? "Проектов" : "Projects", value: "50+", icon: Target },
      { label: isRu ? "Клиентов" : "Clients", value: "30+", icon: User },
      { label: isRu ? "Надежность" : "Reliability", value: "99.9%", icon: CheckCircle },
      { label: isRu ? "Опыт" : "Experience", value: "5 лет", icon: Clock }
    ]
  };

  // APPROACH SECTION
  const approach = [
    {
      title: isRu ? "Глубокий анализ" : "Deep Analysis",
      icon: BarChart,
      description: isRu
        ? "Изучаем бизнес-процессы, выявляем узкие места и определяем точки для автоматизации."
        : "We study business processes, identify bottlenecks, and pinpoint automation opportunities."
    },
    {
      title: isRu ? "Прототипирование" : "Rapid Prototyping",
      icon: Rocket,
      description: isRu
        ? "Быстро создаем рабочий прототип, чтобы проверить гипотезу и получить обратную связь."
        : "We build a working prototype quickly to validate the hypothesis and gather feedback."
    },
    {
      title: isRu ? "Инженерная реализация" : "Engineering Implementation",
      icon: Workflow,
      description: isRu
        ? "Разрабатываем полноценную систему с отказоустойчивостью, мониторингом и документацией."
        : "We develop a full‑fledged system with fault‑tolerance, monitoring, and documentation."
    },
    {
      title: isRu ? "Поддержка и развитие" : "Support & Evolution",
      icon: ShieldCheck,
      description: isRu
        ? "Обеспечиваем долгосрочную поддержку, масштабирование и адаптацию под меняющиеся требования."
        : "We provide long‑term support, scaling, and adaptation to changing requirements."
    }
  ];

  // CTA SECTION
  const cta = {
    title: t.ctaTitle,
    subtitle: t.ctaSub,
    buttonText: t.ctaButton,
    buttonIcon: Mail
  };

  return { texts: t, competencies, solutions, about, approach, cta };
};