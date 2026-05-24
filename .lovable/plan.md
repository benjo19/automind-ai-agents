# AutoMind Homepage Redesign — Plan

Polished, conversion-focused landing page for AI receptionist positioned to local service businesses in Croatia. Cijela stranica na hrvatskom.

## 1. Design system overhaul (svijetla tema, Deep Indigo)

Update `src/index.css` and `tailwind.config.ts`:

- **Surfaces:** `--background: 0 0% 100%` (pure white), `--card: 0 0% 100%`, soft section bg `--surface-muted: 220 20% 98%`.
- **Text:** `--foreground: 222 47% 11%` (slate-900), `--muted-foreground: 215 16% 47%`.
- **Single accent:** `--accent: 230 75% 55%` (deep indigo `#3b5bdb`), `--accent-hover: 230 75% 48%`, `--accent-soft: 230 75% 96%` for tinted badges.
- **Borders:** `--border: 220 14% 91%`.
- Remove purple/pink/cyan/amber/emerald multi-accents from active use (keep tokens as deprecated but don't reference). Remove `.gradient-text-rainbow`, dark body radial gradients, noise overlay, robot float, pulse-glow accents from cinematic dark.
- Fonts: keep **Inter** for body. Switch headings from Playfair (editorial) to **Inter Display / tight Inter** with negative tracking — more SaaS, less editorial. Memory will be updated.
- New utilities: `.section` (py-20 md:py-28), `.eyebrow` (uppercase xs indigo label), `.card-elevated` (white + border + subtle shadow), `.shadow-soft`, `.btn-primary` (solid indigo), `.btn-secondary` (outline slate).
- Buttons: update `button.tsx` `hero` variant → solid indigo bg, white text, lg radius; `hero-outline` → slate border + slate-900 text on white.

## 2. Page structure (replace `src/pages/Index.tsx` section list)

Build 10 new section components under `src/components/landing/`. Old components (`Hero`, `ConcreteActions`, `TargetIndustries`, `Stats`, `Services`, `SolutionCards`, `HowItWorks`, `BeforeAfter`, `Testimonials`, `MissedLeadCost`, `FAQ`, `DemoForm`) are removed from `Index.tsx` (files kept on disk for safety, not imported).

| # | Section | Component | Notes |
|---|---|---|---|
| 1 | Hero | `HeroReceptionist` | H1 "AI recepcionar koji odgovara dok vi radite" + subheadline + 2 CTAs + trust line + live chat mockup |
| 2 | Problem | `ProblemSection` | 4 pain cards: propušteni pozivi, spori odgovori, izgubljene rezervacije, ručni rad |
| 3 | How it works | `HowItWorks3` | Spoji kanale → AI odgovara i kvalificira → Dogovoreni termini i sažeci |
| 4 | Use cases | `IndustryGrid` | 6 compact cards s ikonama (Saloni, Praonice, Restorani, Servisi, Ordinacije, Majstori) |
| 5 | Features | `FeatureGrid` | 6 product features s ikonama |
| 6 | ROI | `ROICalculator` | "Koliko vas košta svaki propušteni upit?" — interaktivni mini-kalkulator (3 slidera/inputa: upita/dan, postotak propuštenih, vrijednost klijenta → mjesečni gubitak EUR) |
| 7 | Demo conversation | `DemoConversation` | Scripted chat: klijent traži termin → AI prikuplja detalje → potvrda. Animirano poruka-po-poruka. |
| 8 | Pricing teaser | `PricingTeaser` | "Jednostavan mjesečni paket prema broju kanala i razgovora" + CTA "Zatraži ponudu". Bez konkretnih cijena. |
| 9 | FAQ | `FAQReceptionist` | 5 pitanja iz briefa, accordion |
| 10 | Final CTA | `FinalCTA` | "Prestani gubiti upite dok radiš" + "Zatraži demo" |

Plus updated `Navbar` (white, sticky, anchor linkovi + indigo CTA "Zatraži demo") and updated `Footer` (kontakt, OIB iz memory, linkovi na Privacy/Terms/Cookies).

## 3. Hero mockup (chat preview)

Right column on desktop, below text on mobile:
- Phone frame (CSS, rounded-[2.5rem] dark bezel, notch) — kept narrow.
- Inside: scrollable chat WhatsApp-style s gradient header "AutoMind • online", izmjena 4–5 poruka (klijent → AI), tipkajući indikator, "Termin potvrđen ✓" badge na dnu.
- Tihi float animation (translateY 0–8px, 6s).
- Mali plutajući "info chips" oko telefona: "Odgovor za 8s", "WhatsApp", "24/7", "Hrvatski".

## 4. ROI calculator logika

Pure client-side u `ROICalculator`:
```
mjesečni_gubitak = upita_dan * 30 * (postotak_propuštenih/100) * prosječna_vrijednost
```
3 controlled inputi (number / range), output veliki indigo broj s EUR/mj, animirani count-up (već postoji `use-count-up` hook).

## 5. Demo conversation animacija

`useEffect` + `setTimeout` chain ili IntersectionObserver — poruke se pojavljuju jedna po jedna kad je sekcija u viewportu. Reduced-motion fallback: sve odmah vidljivo.

## 6. Navbar + Footer

- **Navbar:** bijela pozadina + subtle border-bottom on scroll, logo "AutoMind", linkovi: Kako radi · Industrije · Mogućnosti · ROI · FAQ, primary CTA "Zatraži demo" (indigo). Mobile: hamburger → sheet.
- **Footer:** 4 kolone — Brand+claim, Proizvod (anchors), Pravno (Privacy, Terms, Cookies), Kontakt (email/phone iz memory, OIB). Svijetla siva pozadina.

## 7. ChatWidget

Zadržati funkcionalnost, ali rebojati: zamijeniti rainbow gradient → solid indigo launcher i indigo user bubble, light card stil za panel (bijeli + border, ne glassmorphism). Status dot ostaje zeleni.

## 8. Memory updates (will be applied after plan approval)

- Update Core: "Svijetla tema (bijele površine, slate-900 tekst). Jedan akcent: Deep Indigo `#3b5bdb`. Bez purple/pink/cyan multi-accenta. Inter typography (heading + body), negativni tracking na heading."
- Remove "Dark Mode Cinematic" i "Playfair Display za headings" iz Core.
- Override `mem://content/pricing-removal`: dozvoljen **pricing teaser bez konkretnih cijena** s CTA "Zatraži ponudu". Konkretne cijene i dalje zabranjene.
- Zadržati: hrvatski jezik, bez tool imena, company identity, lead webhook, legal pages, booking system.

## Technical details

- **Files changed:** `src/index.css`, `tailwind.config.ts`, `src/components/ui/button.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/components/ChatWidget.tsx`, `src/pages/Index.tsx`.
- **New files:** `src/components/landing/HeroReceptionist.tsx`, `ProblemSection.tsx`, `HowItWorks3.tsx`, `IndustryGrid.tsx`, `FeatureGrid.tsx`, `ROICalculator.tsx`, `DemoConversation.tsx`, `PricingTeaser.tsx`, `FAQReceptionist.tsx`, `FinalCTA.tsx`, `ChatMockup.tsx` (shared hero+demo).
- **i18n:** dodati nove ključeve u `src/lib/i18n.tsx` pod `t.landing.*` za sav copy 10 novih sekcija. Postojeći `t.hero`, `t.faq` itd. ostaju (još koristi ChatWidget/SEO).
- **DemoForm i postojeća webhook integracija** ostaju dostupni — "Zatraži demo" CTA-i scrollaju na `#demo` koji renderira postojeći `DemoForm` (uvezen u Index pri dnu prije Footera, ali vizualno restilovan kasnije).
- **Responsive:** mobile-first, breakpoints `sm/md/lg`. Hero: stack na mobile (text iznad mockupa), 2-col na lg. Industry/Feature grid: 1 col → 2 → 3.
- **SEO:** ažurirati `t.seo.title/description` za novu poziciju (AI recepcionar).
- **No new deps.**

## Out of scope

- Backend / edge function promjene.
- Auth, baza, role.
- Konkretne cijene u EUR (samo teaser).
- Blog stranice (zadržane kakve jesu).
