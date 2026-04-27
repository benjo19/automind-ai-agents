import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type Language = "hr" | "en";

const STORAGE_KEY = "automind_language";

export const translations = {
  hr: {
    nav: {
      links: [
        { label: "Usluge", id: "services" },
        { label: "Rješenja", id: "solutions" },
        { label: "Kako radi", id: "how-it-works" },
        { label: "Reference", id: "testimonials" },
        { label: "FAQ", id: "faq" },
      ],
      cta: "Zatraži demo",
      openMenu: "Otvori meni",
      logoLabel: "Automind - povratak na vrh",
      languageLabel: "Promijeni jezik",
    },
    seo: {
      title: "Automind – Prilagođena AI rješenja za vaš posao",
      description: "Prilagođena AI rješenja za vaš posao — od prvog razgovora do pokretanja. Bez gotovih paketa, s jasnim opsegom i osobnim pristupom.",
      keywords: "AI rješenja, personalizirani pristup, automatizacija, voice agent, chat agent, Hrvatska",
      orgDescription: "AI agenti koji odgovaraju, prodaju, zovu i automatski šalju ponude",
    },
    hero: {
      badges: ["Aktivacija u 24h", "Hrvatski jezik i glas", "GDPR-ready", "Bez tehničkog znanja"],
      tagline: "Automatiziraj. Optimiziraj. Napreduj.",
      title: "AI koji odgovara, zove i šalje ponude za vas.",
      description: "AutoMind hvata upite s weba, maila, WhatsAppa i poziva, odgovara klijentima, dogovara termine i šalje ponude — 24/7.",
      primaryCta: "Zatraži besplatnu AI analizu",
      secondaryCta: "Pogledaj kako radi",
      proof: "Napravljeno za obrte, servise, salone, turizam i lokalne tvrtke u Hrvatskoj.",
    },
    concreteActions: {
      titleStart: "Što AutoMind",
      titleHighlight: "konkretno radi?",
      actions: [
        ["Odgovara na web i WhatsApp upite", "Klijent pošalje upit, AI odmah odgovara i sprema podatke."],
        ["Prima pozive i zapisuje zahtjeve", "AI voice agent razgovara na hrvatskom i šalje vam sažetak poziva."],
        ["Šalje ponude automatski", "Iz upita generira osnovnu ponudu i šalje je vama na pregled ili direktno klijentu."],
        ["Podsjeća na follow-up", "Nijedan lead ne ostaje zaboravljen. Sustav vas podsjeća kada treba nazvati ili poslati poruku."],
        ["Sprema leadove u CRM", "Svi kontakti, upiti i statusi nalaze se na jednom mjestu."],
      ],
    },
    targetIndustries: {
      titleStart: "Za koga je",
      titleHighlight: "AutoMind?",
      labels: ["Automehaničari i servisi", "Frizerski i beauty saloni", "Apartmani i turizam", "Nekretnine", "Građevina i majstori", "Praonice i lokalne usluge"],
    },
    demoForm: {
      titleStart: "Zatraži",
      titleHighlight: "demo",
      subtitle: "Ispunite formu i naš tim će vas kontaktirati u roku 24h",
      step1: "1. Vaši podaci",
      step2: "2. Detalji projekta",
      name: "Ime i prezime *",
      namePlaceholder: "Vaše ime",
      email: "E-mail *",
      emailPlaceholder: "vas@email.com",
      phone: "Telefon",
      phonePlaceholder: "+385 91 000 0000",
      company: "Tvrtka *",
      companyPlaceholder: "Naziv tvrtke",
      next: "Dalje",
      industry: "Djelatnost *",
      industryPlaceholder: "Odaberite djelatnost",
      industries: ["Maloprodaja", "Usluge", "Ugostiteljstvo", "Građevina", "IT/Tehnologija", "Proizvodnja", "Zdravstvo", "Obrazovanje", "Ostalo"],
      budget: "Opseg projekta",
      budgetPlaceholder: "Odaberite opseg",
      budgets: ["Manji projekt", "Srednji projekt", "Veći projekt", "Prilagođeno / dogovor"],
      interestsLabel: "Što vas zanima? *",
      interests: ["Chat bot", "Voice bot", "Auto-ponude", "CRM", "E-mail sekvence"],
      deadline: "Željeni rok implementacije",
      deadlinePlaceholder: "npr. odmah, za 2 tjedna, sljedeći mjesec...",
      message: "Dodatna poruka",
      messagePlaceholder: "Opišite vaše potrebe ili postavite pitanje...",
      gdpr: "Prihvaćam uvjete zaštite podataka i suglasan sam da me Automind kontaktira vezano uz moj upit. *",
      newsletter: "Želim primati newsletter s novostima i ponudama.",
      back: "Natrag",
      sending: "Šaljem...",
      submit: "Pošalji upit",
      requiredError: "Molimo ispunite sva obavezna polja",
      gdprError: "Morate prihvatiti uvjete zaštite podataka",
      submitError: "Greška! Pošaljite e-mail na auto.mind.ai2025@gmail.com",
      submitErrorDescription: "Ispričavamo se zbog neugodnosti.",
    },
    stats: [
      ["Aktivnih korisnika", ""],
      ["Povećanje konverzija", "%"],
      ["Aktivacija sustava", "h"],
      ["Prosječna ocjena klijenata", "★"],
    ],
    marquee: "Integriramo se s alatima koje već koristite",
    services: {
      title: "Naše usluge",
      subtitle: "Razgovaramo, slušamo, predlažemo rješenje koje ima smisla baš za vaš posao.",
      imageAlt: "Profesionalno rješenje za vaš posao",
      cards: [
        { title: "AI Agenti", description: "Chat i voice agenti koji razgovaraju s klijentima na hrvatskom — kad ih trebate.", features: ["Chat na webu i porukama", "Voice agent za pozive", "Prebacivanje na čovjeka"] },
        { title: "Automatizacija prodaje", description: "Ponude, follow-up i evidencija klijenata — automatski, bez gubljenja u administraciji.", features: ["Auto-ponude u vašem stilu", "Pravovremeni follow-up", "Pregled klijenata na jednom mjestu"] },
        { title: "Web stranice", description: "Moderni, brzi i responzivni web — od landing stranica do kompleksnijih projekata.", features: ["Landing stranice", "Web shopovi", "SEO i održavanje"] },
      ],
    },
    solutions: {
      titleStart: "Što",
      titleHighlight: "gradimo za vas",
      subtitle: "Svako rješenje je prilagođeno vašem poslu — bez gotovih paketa.",
      learnMore: "Saznaj više",
      cards: [
        ["Voice agent", "Preuzima pozive umjesto vas i zakazuje sljedeći korak — prirodno, na hrvatskom."],
        ["Chat agent", "Odgovara klijentima na webu i porukama, 24/7, i prebaci razgovor kad treba čovjek."],
        ["Auto-ponude (PDF)", "Profesionalna ponuda u vašem stilu — pripremljena i poslana automatski."],
        ["E-mail follow-up", "Pravovremene poruke koje održavaju razgovor živim i vode klijenta do odluke."],
      ],
    },
    howItWorks: {
      titleStart: "Kako",
      titleHighlight: "radi",
      subtitle: "Tri jednostavna koraka — od prvog razgovora do gotovog rješenja",
      steps: [
        ["Razgovor", "Upoznamo vaš posao, izazove i ciljeve — bez obveza."],
        ["Prijedlog", "Dobivate prilagođeno rješenje s jasnim opsegom i rokovima."],
        ["Pokretanje", "Postavljamo, povezujemo i ostajemo uz vas nakon lansiranja."],
      ],
    },
    beforeAfter: {
      titleStart: "Prije i",
      titleHighlight: "poslije",
      hint: "Povucite ručku lijevo i desno za usporedbu",
      beforeTitle: "Prije",
      afterTitle: "Poslije",
      sliderLabel: "Pomakni klizač",
      before: ["Ručni odgovori na upite", "Izgubljeni leadovi", "Kašnjenje s ponudama", "Zaboravljeni follow-upovi"],
      after: ["AI odgovara 24/7", "Svaki lead bilježen", "Auto-ponuda u minuti", "Follow-up bez zaborava"],
    },
    testimonials: {
      titleStart: "Što kažu",
      titleHighlight: "naši klijenti",
      items: [
        ["Chat na webu hvata upite i navečer i vikendom — više nam ne bježe potencijalni klijenti dok ne stignemo odgovoriti.", "Marko H.", "Frizerski salon · Zagreb"],
        ["Automatske ponude su nam stvarno olakšale dan. Umjesto pola sata, ponuda ode u par minuta i izgleda profesionalno.", "Ana K.", "Građevinska tvrtka · Split"],
        ["Postavili smo sve brzo i bez komplikacija. Tim je bio dostupan za pitanja i prilagodbe nakon pokretanja.", "Ivan N.", "Auto servis · Osijek"],
      ],
    },
    missedLead: {
      titleStart: "Koliko vas košta",
      titleHighlight: "propušten klijent?",
      text: "Ako vam samo 3 klijenta mjesečno ne dobiju odgovor na vrijeme, već gubite više nego što košta automatizacija.",
      cta: "Želim provjeriti koliko upita gubim",
    },
    faq: {
      titleStart: "Često postavljana",
      titleHighlight: "pitanja",
      subtitle: "Odgovori na najčešća pitanja o Automind platformi",
      items: [
        ["Kako izgleda suradnja?", "Nakon kratkog razgovora pripremamo prijedlog rješenja prilagođen vašim potrebama, s jasnim opsegom i rokovima — bez fiksnih paketa."],
        ["Koliko brzo možemo krenuti?", "Najčešće u 24h. Naš tim priprema sve potrebne postavke prema vašim specifikacijama."],
        ["Je li rješenje prilagođeno baš nama?", "Da. Svaki projekt kreće od razgovora — ne nudimo gotove pakete, već rješenje koje ima smisla za vaše poslovanje."],
        ["Što ako trebam podršku?", "Pružamo kontinuiranu podršku putem emaila, a po potrebi i prioritetnu podršku s bržim vremenom odgovora — sve dogovaramo individualno."],
        ["Koliko košta?", "Cijena ovisi o kompleksnosti rješenja. Razgovaramo, slušamo i dajemo ponudu prilagođenu vašem budgetu. Nema skrivenih troškova ni iznenađenja."],
        ["Postoji li ugovor ili obveza?", "Bez dugoročnih obveza. Sve dogovaramo individualno s jasnim uvjetima prije početka suradnje."],
        ["Gdje se pohranjuju moji podaci?", "Infrastruktura je unutar EU, u skladu s GDPR propisima. Vaši podaci nisu dijeljeni s trećim stranama."],
        ["Što ako nisam zadovoljan rezultatom?", "Ostajemo uz vas dok rješenje ne radi kako treba. Prilagodbe i podrška su dio svake suradnje."],
      ],
    },
    footer: {
      tagline: "AI agenti za automatizaciju poslovanja.",
      contact: "Kontakt",
      legal: "Pravno",
      privacy: "Politika privatnosti",
      terms: "Uvjeti korištenja",
      cookies: "Kolačići",
      news: "Novosti",
      newsText: "Povremeni savjeti o AI automatizaciji.",
      emailPlaceholder: "vas@email.hr",
      subscribe: "Prijavi se",
      success: "Hvala! Prijavljeni ste ✅",
      error: "Greška! Pošaljite e-mail na auto.mind.ai2025@gmail.com",
      rights: "© 2026 Automind. Sva prava pridržana.",
    },
    thankYou: {
      titleMeta: "Hvala! Upit je zaprimljen — Automind",
      title: "Hvala! Upit je zaprimljen.",
      text: "Naš tim javit će vam se u roku 24h s personaliziranom ponudom.",
      button: "Povratak na početak",
    },
    chat: {
      greeting: "Bok! 👋 Ja sam Ana, asistentica iz Autominda. Mogu vam reći više o našim AI agentima (chat + voice) ili automatizaciji ponuda. Recite mi — čime se bavite i što vas zanima?",
      rateLimit: "Previše zahtjeva. Pokušajte ponovno za par sekundi.",
      unavailable: "AI je trenutno nedostupan. Molimo koristite formu na dnu stranice.",
      commError: "Greška pri komunikaciji s AI-jem",
      leadFallback: "Hvala! 🙌 Vaši podaci su zaprimljeni. Naš tim javit će vam se uskoro s personaliziranom ponudom.",
      leadError: "Slanje podataka nije uspjelo, pokušajte ponovno.",
      genericError: "Došlo je do greške. Pokušajte ponovno.",
      leadSent: "Vaši podaci su poslani. Tim će vam se javiti uskoro.",
      placeholder: "Napišite poruku...",
      messageLabel: "Chat poruka",
      send: "Pošalji",
      close: "Zatvori chat",
      open: "Otvori chat",
      closeShort: "Zatvori",
      status: "Obično odgovori odmah",
    },
    cookie: {
      close: "Zatvori",
      text: "Koristimo kolačiće za bolje iskustvo.",
      link: "Saznaj više",
      accept: "Prihvati",
    },
    legal: {
      back: "Natrag na početak",
      privacyTitle: "Politika privatnosti",
      termsTitle: "Uvjeti korištenja",
      cookieTitle: "Pravila o kolačićima",
      metaPrivacy: "Politika privatnosti tvrtke FA. BE. MA TRGOVINA DOO (Automind). Saznajte kako prikupljamo, koristimo i štitimo vaše osobne podatke.",
      metaTerms: "Uvjeti korištenja web stranice i usluga tvrtke FA. BE. MA TRGOVINA DOO (Automind).",
      metaCookie: "Pravila o kolačićima web stranice Automind. Saznajte koje kolačiće koristimo i kako upravljati postavkama.",
    },
  },
  en: {
    nav: {
      links: [
        { label: "Services", id: "services" },
        { label: "Solutions", id: "solutions" },
        { label: "How it works", id: "how-it-works" },
        { label: "Reviews", id: "testimonials" },
        { label: "FAQ", id: "faq" },
      ],
      cta: "Request a demo",
      openMenu: "Open menu",
      logoLabel: "Automind - back to top",
      languageLabel: "Change language",
    },
    seo: {
      title: "Automind – Custom AI solutions for your business",
      description: "Custom AI solutions for your business — from the first conversation to launch. No fixed packages, with a clear scope and personal approach.",
      keywords: "AI solutions, personalized approach, automation, voice agent, chat agent, Croatia",
      orgDescription: "AI agents that answer, sell, call and automatically send offers",
    },
    hero: {
      badges: ["Activation in 24h", "Croatian language and voice", "GDPR-ready", "No technical knowledge needed"],
      tagline: "Automate. Optimize. Grow.",
      title: "AI that answers, calls and sends offers for you.",
      description: "AutoMind captures inquiries from your website, email, WhatsApp and calls, answers clients, schedules appointments and sends offers — 24/7.",
      primaryCta: "Request a free AI analysis",
      secondaryCta: "See how it works",
      proof: "Built for trades, services, salons, tourism and local businesses in Croatia.",
    },
    concreteActions: {
      titleStart: "What AutoMind",
      titleHighlight: "actually does",
      actions: [
        ["Answers web and WhatsApp inquiries", "A client sends an inquiry, AI replies immediately and stores the details."],
        ["Takes calls and records requests", "The AI voice agent speaks Croatian and sends you a call summary."],
        ["Sends offers automatically", "It turns an inquiry into a draft offer and sends it to you for review or directly to the client."],
        ["Reminds you to follow up", "No lead gets forgotten. The system reminds you when it is time to call or send a message."],
        ["Stores leads in your CRM", "All contacts, inquiries and statuses are kept in one place."],
      ],
    },
    targetIndustries: {
      titleStart: "Who is",
      titleHighlight: "AutoMind for?",
      labels: ["Auto repair shops and services", "Hair and beauty salons", "Apartments and tourism", "Real estate", "Construction and trades", "Car washes and local services"],
    },
    demoForm: {
      titleStart: "Request a",
      titleHighlight: "demo",
      subtitle: "Fill out the form and our team will contact you within 24 hours",
      step1: "1. Your details",
      step2: "2. Project details",
      name: "Full name *",
      namePlaceholder: "Your name",
      email: "Email *",
      emailPlaceholder: "you@email.com",
      phone: "Phone",
      phonePlaceholder: "+385 91 000 0000",
      company: "Company *",
      companyPlaceholder: "Company name",
      next: "Next",
      industry: "Industry *",
      industryPlaceholder: "Select industry",
      industries: ["Retail", "Services", "Hospitality", "Construction", "IT/Technology", "Manufacturing", "Healthcare", "Education", "Other"],
      budget: "Project scope",
      budgetPlaceholder: "Select scope",
      budgets: ["Small project", "Medium project", "Large project", "Custom / by agreement"],
      interestsLabel: "What are you interested in? *",
      interests: ["Chat bot", "Voice bot", "Auto-offers", "CRM", "Email sequences"],
      deadline: "Desired implementation timeline",
      deadlinePlaceholder: "e.g. immediately, in 2 weeks, next month...",
      message: "Additional message",
      messagePlaceholder: "Describe your needs or ask a question...",
      gdpr: "I accept the data protection terms and agree that Automind may contact me about my inquiry. *",
      newsletter: "I want to receive a newsletter with updates and offers.",
      back: "Back",
      sending: "Sending...",
      submit: "Send inquiry",
      requiredError: "Please fill in all required fields",
      gdprError: "You must accept the data protection terms",
      submitError: "Error! Please email auto.mind.ai2025@gmail.com",
      submitErrorDescription: "Sorry for the inconvenience.",
    },
    stats: [
      ["Active users", ""],
      ["Conversion increase", "%"],
      ["System activation", "h"],
      ["Average client rating", "★"],
    ],
    marquee: "We integrate with the tools you already use",
    services: {
      title: "Our services",
      subtitle: "We talk, listen and propose a solution that truly makes sense for your business.",
      imageAlt: "Professional solution for your business",
      cards: [
        { title: "AI Agents", description: "Chat and voice agents that talk to your clients in Croatian — whenever you need them.", features: ["Chat on your website and messages", "Voice agent for calls", "Human handoff"] },
        { title: "Sales automation", description: "Offers, follow-ups and client records — automated, without getting lost in admin work.", features: ["Offers in your style", "Timely follow-up", "Client overview in one place"] },
        { title: "Websites", description: "Modern, fast and responsive websites — from landing pages to more complex projects.", features: ["Landing pages", "Web shops", "SEO and maintenance"] },
      ],
    },
    solutions: {
      titleStart: "What we",
      titleHighlight: "build for you",
      subtitle: "Every solution is tailored to your business — no fixed packages.",
      learnMore: "Learn more",
      cards: [
        ["Voice agent", "Takes calls instead of you and schedules the next step — naturally, in Croatian."],
        ["Chat agent", "Answers clients on your website and messages, 24/7, and hands off to a human when needed."],
        ["Auto-offers (PDF)", "A professional offer in your style — prepared and sent automatically."],
        ["Email follow-up", "Timely messages that keep the conversation alive and guide the client toward a decision."],
      ],
    },
    howItWorks: {
      titleStart: "How it",
      titleHighlight: "works",
      subtitle: "Three simple steps — from the first conversation to a working solution",
      steps: [
        ["Discovery", "We learn about your business, challenges and goals — with no obligation."],
        ["Proposal", "You receive a tailored solution with a clear scope and timeline."],
        ["Launch", "We set everything up, connect it and stay with you after launch."],
      ],
    },
    beforeAfter: {
      titleStart: "Before and",
      titleHighlight: "after",
      hint: "Drag the handle left and right to compare",
      beforeTitle: "Before",
      afterTitle: "After",
      sliderLabel: "Move slider",
      before: ["Manual replies to inquiries", "Lost leads", "Delayed offers", "Forgotten follow-ups"],
      after: ["AI answers 24/7", "Every lead is recorded", "Offer ready in a minute", "Follow-up without forgetting"],
    },
    testimonials: {
      titleStart: "What our",
      titleHighlight: "clients say",
      items: [
        ["The website chat catches inquiries in the evenings and on weekends — potential clients no longer slip away before we can reply.", "Marko H.", "Hair salon · Zagreb"],
        ["Automatic offers have genuinely made our day easier. Instead of half an hour, an offer goes out in a few minutes and looks professional.", "Ana K.", "Construction company · Split"],
        ["Everything was set up quickly and without complications. The team was available for questions and adjustments after launch.", "Ivan N.", "Auto repair shop · Osijek"],
      ],
    },
    missedLead: {
      titleStart: "How much does a",
      titleHighlight: "missed client cost you?",
      text: "If just 3 clients a month do not get a timely response, you are already losing more than automation costs.",
      cta: "I want to check how many inquiries I lose",
    },
    faq: {
      titleStart: "Frequently asked",
      titleHighlight: "questions",
      subtitle: "Answers to the most common questions about the Automind platform",
      items: [
        ["What does collaboration look like?", "After a short conversation, we prepare a proposal tailored to your needs, with a clear scope and timeline — no fixed packages."],
        ["How quickly can we start?", "Most often within 24 hours. Our team prepares all required settings according to your specifications."],
        ["Is the solution tailored specifically to us?", "Yes. Every project starts with a conversation — we do not offer fixed packages, but a solution that makes sense for your business."],
        ["What if I need support?", "We provide ongoing support by email and, if needed, priority support with faster response times — everything is agreed individually."],
        ["How much does it cost?", "The price depends on the complexity of the solution. We talk, listen and provide an offer tailored to your budget. No hidden costs or surprises."],
        ["Is there a contract or commitment?", "No long-term commitments. Everything is agreed individually with clear terms before work begins."],
        ["Where is my data stored?", "The infrastructure is within the EU and GDPR-compliant. Your data is not shared with third parties."],
        ["What if I am not satisfied with the result?", "We stay with you until the solution works properly. Adjustments and support are part of every collaboration."],
      ],
    },
    footer: {
      tagline: "AI agents for business automation.",
      contact: "Contact",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      cookies: "Cookies",
      news: "Updates",
      newsText: "Occasional tips on AI automation.",
      emailPlaceholder: "you@email.com",
      subscribe: "Subscribe",
      success: "Thank you! You are subscribed ✅",
      error: "Error! Please email auto.mind.ai2025@gmail.com",
      rights: "© 2026 Automind. All rights reserved.",
    },
    thankYou: {
      titleMeta: "Thank you! Your inquiry was received — Automind",
      title: "Thank you! Your inquiry was received.",
      text: "Our team will contact you within 24 hours with a personalized offer.",
      button: "Back to the start",
    },
    chat: {
      greeting: "Hi! 👋 I’m Ana, an assistant from Automind. I can tell you more about our AI agents (chat + voice) or offer automation. Tell me — what does your business do and what are you interested in?",
      rateLimit: "Too many requests. Please try again in a few seconds.",
      unavailable: "AI is currently unavailable. Please use the form on the page.",
      commError: "Error communicating with AI",
      leadFallback: "Thank you! 🙌 Your details have been received. Our team will contact you soon with a personalized offer.",
      leadError: "Sending your details failed, please try again.",
      genericError: "Something went wrong. Please try again.",
      leadSent: "Your details have been sent. The team will contact you soon.",
      placeholder: "Write a message...",
      messageLabel: "Chat message",
      send: "Send",
      close: "Close chat",
      open: "Open chat",
      closeShort: "Close",
      status: "Usually replies instantly",
    },
    cookie: {
      close: "Close",
      text: "We use cookies to improve your experience.",
      link: "Learn more",
      accept: "Accept",
    },
    legal: {
      back: "Back to start",
      privacyTitle: "Privacy Policy",
      termsTitle: "Terms of Use",
      cookieTitle: "Cookie Policy",
      metaPrivacy: "Privacy Policy of FA. BE. MA TRGOVINA DOO (Automind). Learn how we collect, use and protect your personal data.",
      metaTerms: "Terms of use for the Automind website and services by FA. BE. MA TRGOVINA DOO.",
      metaCookie: "Cookie policy for the Automind website. Learn which cookies we use and how to manage your settings.",
    },
  },
} as const;

type Translation = (typeof translations)[Language];

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored === "hr" || stored === "en") return stored;
    } catch {
      // ignore storage errors
    }
    return "hr";
  });

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
