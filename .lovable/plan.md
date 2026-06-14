## Plan

### 1. Kreiraj `/ai-agents.json` — statički JSON endpoint

Stvoriti `public/ai-agents.json` s točno definiranom strukturom. Datoteka u `public/` direktoriju automatski se poslužuje na `/ai-agents.json` bez CSS-a, bez UI-a, s ispravnim `Content-Type: application/json` zaglavljem. Botovi i AI agenti mogu je čitati direktno bez izvršavanja JavaScripta.

### 2. Dodaj Schema.org `ProfessionalService` JSON-LD u glavnu stranicu

Dodati novi `<script type="application/ld+json">` blok u `<head>` sekciju `index.html`, uz postojeće Organization i FAQPage sheme. Koristiti `@type: "ProfessionalService"` s podacima o AutoMind AI agenciji, adresom u Zagrebu, i poljima `knowsAbout` za AI Automation, Model Context Protocol, API Integrations i sl.

### 3. Dodaj skriveni `<link rel="alternate">` tag za botove

Dodati `<link rel="alternate" type="application/json" href="/ai-agents.json" title="AutoMind AI Agent Manifest" />` u `<head>` sekciju `index.html`. Ovaj tag je po HTML specifikaciji smješten u `<head>`, automatski je skriven od korisnika, a služi AI agentima i botovima za otkrivanje strukturiranog manifesta agencije.

---

### Technical notes

- `public/ai-agents.json` koristi se jer projekt koristi Vite statički build. Ruta se poslužuje direktno, bez React hydrationa.
- `index.html` već sadrži staticke JSON-LD sheme (Organization, FAQPage). Dodavanje ProfessionalService sheme prati postojeći uzorak.
- `<link rel="alternate">` pripada u `<head>` po HTML5 specifikaciji i optimalan je za bot discovery.
