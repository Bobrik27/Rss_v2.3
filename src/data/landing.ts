import { 
  Server, Workflow, Database, BrainCircuit, 
  MessageCircle, ShieldCheck, Zap, Bot, Brain, Wrench,
  User, Target, Rocket, CheckCircle, Clock, BarChart, Mail
} from 'lucide-react';

export const getLandingData = (lang: string) => {
  const isRu = lang === 'ru';
  const isDe = lang === 'de';

  const t = {
    competenciesTitle: isRu ? "Компетенции" : isDe ? "Kompetenzen" : "Core Competencies",
    competenciesSub: isRu ? "Ключевые технологии и области экспертизы" : isDe ? "Schlüsseltechnologien und Fachgebiete" : "Enterprise-grade skills for building robust systems",
    solutionsTitle: isRu ? "Решения" : isDe ? "Lösungen" : "Solutions",
    solutionsSub: isRu ? "Решения и услуги для бизнеса" : isDe ? "Automatisierungssysteme, die messbaren Geschäftswert liefern" : "Real-world automation systems",
    aboutTitle: isRu ? "О студии" : isDe ? "Über das Studio" : "About the Studio",
    aboutSub: isRu ? "Создаем сложные автоматизированные системы, которые работают без сбоев" : isDe ? "Wir bauen komplexe Automatisierungssysteme, die fehlerfrei laufen" : "We build complex automation systems that run flawlessly",
    aboutText: isRu ? [
      "Run Swift Studio — это команда инженеров, которые проектируют и внедряют автоматизацию уровня enterprise.",
      "Мы не просто «делаем ботов». Мы строим целые экосистемы, где каждый компонент — от базы данных до интерфейса — работает как единый механизм.",
      "Наша специализация: сложные сценарии, требующие высокой надежности, интеграции с внешними API и обработки больших объемов данных."
    ] : isDe ? [
      "Run Swift Studio ist ein Team von Ingenieuren, die Enterprise‑Automatisierung entwerfen und implementieren.",
      "Wir machen nicht nur 'Bots'. Wir bauen ganze Ökosysteme, in denen jede Komponente – von der Datenbank bis zur Benutzeroberfläche – als ein einziger Mechanismus funktioniert.",
      "Unsere Spezialität: komplexe Szenarien, die hohe Zuverlässigkeit, Integration externer APIs und die Verarbeitung großer Datenmengen erfordern."
    ] : [
      "Run Swift Studio is a team of engineers designing and implementing enterprise‑grade automation.",
      "We don't just 'make bots'. We build entire ecosystems where every component—from database to UI—works as a single mechanism.",
      "Our specialty: complex scenarios that demand high reliability, external API integrations, and large‑scale data processing."
    ],
    approachTitle: isRu ? "Подход" : isDe ? "Unser Ansatz" : "Our Approach",
    approachSub: isRu ? "Принципы, по которым мы работаем" : isDe ? "Prinzipien, die unsere Arbeit leiten" : "Principles that guide our work",
    ctaTitle: isRu ? "Готовы автоматизировать бизнес?" : isDe ? "Bereit, Ihr Geschäft zu automatisieren?" : "Ready to automate your business?",
    ctaSub: isRu ? "Обсудим вашу задачу и предложим решение" : isDe ? "Lassen Sie uns Ihre Herausforderung besprechen und eine Lösung vorschlagen" : "Let's discuss your challenge and propose a solution",
    ctaButton: isRu ? "Начать диалог" : isDe ? "Gespräch beginnen" : "Start a conversation"
  };

  // BUSINESS‑FOCUSED COMPETENCIES (Benefits‑driven)
  const competencies = [
    {
      title: isRu ? "Надёжная архитектура, которая масштабируется" : isDe ? "Zuverlässige Architektur, die skaliert" : "Reliable Architecture That Scales",
      icon: Server,
      items: isRu ? [
        "Снижаем риски сбоев",
        "Ускоряем обработку данных",
        "Обеспечиваем отказоустойчивость",
        "Автоматизируем рутину"
      ] : isDe ? [
        "Reduzieren Ausfallrisiken",
        "Beschleunigen Datenverarbeitung",
        "Sichern Fehlertoleranz",
        "Automatisieren Routine"
      ] : ["Reduce failure risks", "Speed up data processing", "Ensure fault tolerance", "Automate routine tasks"]
    },
    {
      title: isRu ? "Автоматизация сложных бизнес‑процессов" : isDe ? "Automatisierung komplexer Geschäftsprozesse" : "Automation of Complex Business Processes",
      icon: Workflow,
      items: isRu ? [
        "Сокращаем время на ручные операции",
        "Увеличиваем точность выполнения",
        "Интегрируем любые системы",
        "Масштабируем под рост бизнеса"
      ] : isDe ? [
        "Reduzieren manuelle Arbeitszeit",
        "Erhöhen Ausführungsgenauigkeit",
        "Integrieren beliebige Systeme",
        "Skalieren mit Unternehmenswachstum"
      ] : ["Cut manual operation time", "Increase execution accuracy", "Integrate any systems", "Scale with business growth"]
    },
    {
      title: isRu ? "Стабильная инфраструктура для ваших данных" : isDe ? "Stabile Infrastruktur für Ihre Daten" : "Stable Infrastructure for Your Data",
      icon: Database,
      items: isRu ? [
        "Гарантируем сохранность данных",
        "Обеспечиваем высокую доступность",
        "Ускоряем обработку запросов",
        "Снижаем затраты на сервера"
      ] : isDe ? [
        "Garantieren Datensicherheit",
        "Sichern hohe Verfügbarkeit",
        "Beschleunigen Anfrageverarbeitung",
        "Senken Serverkosten"
      ] : ["Guarantee data safety", "Ensure high availability", "Speed up request processing", "Reduce server costs"]
    },
    {
      title: isRu ? "Искусственный интеллект, который работает на вас" : isDe ? "KI, die für Sie arbeitet" : "AI That Works for You",
      icon: BrainCircuit,
      items: isRu ? [
        "Увеличиваем конверсию с помощью AI",
        "Сокращаем время на анализ данных",
        "Автоматизируем создание контента",
        "Повышаем точность прогнозов"
      ] : isDe ? [
        "Steigern Konversion durch KI",
        "Reduzieren Datenanalysezeit",
        "Automatisieren Content‑Erstellung",
        "Verbessern Prognosegenauigkeit"
      ] : ["Boost conversion with AI", "Cut data analysis time", "Automate content creation", "Improve prediction accuracy"]
    },
    {
      title: isRu ? "Telegram‑платформы для роста бизнеса" : isDe ? "Telegram‑Plattformen für Geschäftswachstum" : "Telegram Platforms for Business Growth",
      icon: MessageCircle,
      items: isRu ? [
        "Привлекаем новых клиентов через ботов",
        "Увеличиваем продажи через Mini Apps",
        "Автоматизируем поддержку клиентов",
        "Защищаем данные и платежи"
      ] : isDe ? [
        "Gewinnen neue Kunden über Bots",
        "Steigern Verkäufe durch Mini Apps",
        "Automatisieren Kunden‑Support",
        "Schützen Daten und Zahlungen"
      ] : ["Attract new customers via bots", "Increase sales via Mini Apps", "Automate customer support", "Secure data & payments"]
    },
    {
      title: isRu ? "Гарантия бесперебойной работы" : isDe ? "Garantie für unterbrechungsfreien Betrieb" : "Guarantee of Uninterrupted Operation",
      icon: ShieldCheck,
      items: isRu ? [
        "Мониторим систему 24/7",
        "Автоматически восстанавливаем после сбоев",
        "Анализируем причины проблем",
        "Предотвращаем потери данных"
      ] : isDe ? [
        "Überwachen System 24/7",
        "Stellen nach Störungen automatisch wieder her",
        "Analysieren Problemursachen",
        "Verhindern Datenverluste"
      ] : ["Monitor system 24/7", "Automatically recover after failures", "Analyze root causes", "Prevent data loss"]
    }
  ];

  // BUSINESS SOLUTIONS
  const solutions = [
    {
      title: isRu ? "Автономные SMM Экосистемы" : isDe ? "Autonome SMM-Ökosysteme" : "Autonomous SMM Ecosystems",
      icon: Zap,
      description: isRu
        ? "Полная автоматизация контент-маркетинга. Планирование, копирайтинг, генерация картинок/видео, согласование и постинг без участия человека."
        : isDe
        ? "Vollständige Automatisierung des Content-Marketings. Planung, Copywriting, Bild-/Video-Generierung, Freigabe und Posting ohne menschliches Eingreifen."
        : "Complete social media automation. Planning, copywriting, media generation, approval workflows, and publishing."
    },
    {
      title: isRu ? "Сложные Telegram Платформы" : isDe ? "Komplexe Telegram-Plattformen" : "Complex Telegram Platforms",
      icon: Bot,
      description: isRu
        ? "Enterprise-решения в мессенджере. HR-сервисы, доски объявлений, закрытые сообщества с платной подпиской и личными кабинетами."
        : isDe
        ? "Enterprise-Lösungen im Messenger. HR-Dienste, Jobbörsen, geschlossene Communities mit kostenpflichtigen Abonnements und persönlichen Konten."
        : "Enterprise-grade solutions. HR services, job boards, community portals with monetization."
    },
    {
      title: isRu ? "AI Ассистенты и Агенты" : isDe ? "KI-Assistenten & Agenten" : "AI Assistants & Agents",
      icon: Brain,
      description: isRu
        ? "Кастомные нейро-сотрудники на базе ваших данных (RAG). Работают по четкой бизнес-логике, не выдумывают факты, интегрированы в CRM."
        : isDe
        ? "Maßgeschneiderte KI-Mitarbeiter auf Basis Ihrer Daten (RAG). Arbeiten nach klarer Geschäftslogik, erfinden keine Fakten, sind in CRM integriert."
        : "Custom AI agents on company data (RAG). Business logic integration. No hallucinations—just results."
    },
    {
      title: isRu ? "Аудит и Рефакторинг" : isDe ? "Systemaudits & Refactoring" : "System Audits & Refactoring",
      icon: Wrench,
      description: isRu
        ? "Лечение автоматизаций, которые «постоянно падают». Анализ архитектуры, поиск узких мест и пересборка в стабильную систему."
        : isDe
        ? "Sanierung von Automatisierungen, die 'ständig abstürzen'. Architekturanalyse, Engpassidentifikation und Neuaufbau zu einem stabilen System."
        : "Fixing automations that constantly crash. Architecture review and transformation into stable systems."
    }
  ];

  // ABOUT SECTION
  const about = {
    title: t.aboutTitle,
    subtitle: t.aboutSub,
    paragraphs: t.aboutText,
    stats: [
      { label: isRu ? "Проектов" : isDe ? "Projekte" : "Projects", value: "50+", icon: Target },
      { label: isRu ? "Клиентов" : isDe ? "Kunden" : "Clients", value: "30+", icon: User },
      { label: isRu ? "Надежность" : isDe ? "Zuverlässigkeit" : "Reliability", value: "99.9%", icon: CheckCircle },
      { label: isRu ? "Опыт" : isDe ? "Erfahrung" : "Experience", value: "5 лет", icon: Clock }
    ]
  };

  // APPROACH SECTION
  const approach = [
    {
      title: isRu ? "Глубокий анализ" : isDe ? "Tiefgehende Analyse" : "Deep Analysis",
      icon: BarChart,
      description: isRu
        ? "Изучаем бизнес-процессы, выявляем узкие места и определяем точки для автоматизации."
        : isDe
        ? "Wir analysieren Geschäftsprozesse, identifizieren Engpässe und bestimmen Automatisierungspunkte."
        : "We study business processes, identify bottlenecks, and pinpoint automation opportunities."
    },
    {
      title: isRu ? "Прототипирование" : isDe ? "Rapid Prototyping" : "Rapid Prototyping",
      icon: Rocket,
      description: isRu
        ? "Быстро создаем рабочий прототип, чтобы проверить гипотезу и получить обратную связь."
        : isDe
        ? "Wir erstellen schnell einen funktionierenden Prototyp, um die Hypothese zu validieren und Feedback zu erhalten."
        : "We build a working prototype quickly to validate the hypothesis and gather feedback."
    },
    {
      title: isRu ? "Инженерная реализация" : isDe ? "Technische Umsetzung" : "Engineering Implementation",
      icon: Workflow,
      description: isRu
        ? "Разрабатываем полноценную систему с отказоустойчивостью, мониторингом и документацией."
        : isDe
        ? "Wir entwickeln ein vollwertiges System mit Fehlertoleranz, Monitoring und Dokumentation."
        : "We develop a full‑fledged system with fault‑tolerance, monitoring, and documentation."
    },
    {
      title: isRu ? "Поддержка и развитие" : isDe ? "Support & Weiterentwicklung" : "Support & Evolution",
      icon: ShieldCheck,
      description: isRu
        ? "Обеспечиваем долгосрочную поддержку, масштабирование и адаптацию под меняющиеся требования."
        : isDe
        ? "Wir bieten langfristige Unterstützung, Skalierung und Anpassung an sich ändernde Anforderungen."
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