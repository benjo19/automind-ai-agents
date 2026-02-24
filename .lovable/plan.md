

# Premium Visual Overhaul -- AutoMind AI

Transformacija postojeceg dizajna u "Dark Mode Cinematic" stil inspiriran Linear.app i Framer.com. Zadrzavamo sav postojeci sadrzaj i funkcionalnost, ali podizemo vizualnu kvalitetu na premium razinu.

---

## 1. Globalni stilovi i tipografija

**Datoteka: `index.html`**
- Zamijeniti Playfair Display font s **Inter** (za body) i zadrzati Playfair za naslove kao accent font
- Dodati preconnect za Inter font

**Datoteka: `src/index.css`**
- Dodati nove CSS varijable za glow efekte (indigo/purple radial gradients)
- Azurirati glass-card klasu: 1px border s 10% white opacity, backdrop-blur(16px), subtilni shadow
- Dodati `.glow-bg` utility klasu za radial gradient pozadine iza sekcija
- Dodati `.text-gradient` klasu (white to slate-400)
- Dodati keyframe animacije: `slide-up`, `fade-in-up`, `marquee-scroll`
- Dodati `.hover-lift` klasu za bento kartice (scale 1.02x na hover)

**Datoteka: `tailwind.config.ts`**
- Dodati Inter u fontFamily
- Dodati nove animacije (`slide-up`, `fade-in-up`, `marquee`)
- Dodati `tracking-tight` za headline stilove

---

## 2. Hero 2.0

**Datoteka: `src/components/Hero.tsx`**
- Centriran layout s vecim, boldijim naslovom i `tracking-tight`
- Naslov dobiva text-gradient (white to slate-400)
- Ispod CTA gumbova dodati "Product Preview" -- stilizirana slika/mockup dashboarda koji izgleda kao da lebdi u 3D prostoru:
  - `perspective` + `rotateX` transform
  - Svijetleci border (glow efekt)
  - Meki box-shadow
- Dodati subtilni radial gradient glow iza hero sekcije (indigo/purple, niska opacity)
- Ukloniti pozadinsku sliku, koristiti cistiji dark gradient

---

## 3. Marquee -- integrirani alati

**Nova datoteka: `src/components/Marquee.tsx`**
- Horizontalni beskonacni scroll s logotipovima/imenima alata: OpenAI, Stripe, Make.com, Supabase, Slack, WhatsApp, Telegram, Google Docs
- Koristiti CSS animaciju (`@keyframes marquee`) umjesto eksterne biblioteke
- Sivi/muted tekst, subtilan i elegantan
- Pozicionirati ispod Hero sekcije ili ispod Stats

---

## 4. Bento Feature Grid

**Datoteka: `src/components/SolutionCards.tsx`** (potpuni redizajn)
- Zamijeniti uniformni grid s **Bento-style layoutom** -- razlicite velicine kartica (neke zauzimaju 2 kolone, neke 1)
- Svaka kartica:
  - Glass efekt s 1px white/10% borderom
  - Hover: scale(1.02), border postaje svjetliji
  - Lucide ikona s subtilnim purple/indigo glow efektom (box-shadow na ikoni)
  - Tekst fokusiran na **outcome** (rezultat), ne na feature
- Grid layout: `grid-cols-3` na desktopu, prva i zadnja kartica span 2 kolone

---

## 5. Services sekcija

**Datoteka: `src/components/Services.tsx`**
- Azurirati kartice da koriste novi glass stil
- Dodati glow efekt iza sekcije (radial gradient)
- Ikone dobivaju subtilni purple glow
- Hover animacija: lift efekt umjesto scale

---

## 6. Stats sekcija

**Datoteka: `src/components/Stats.tsx`**
- Dodati subtilni glow pozadinu
- Brojevi dobivaju gradient text efekt
- Animacija entrance: slide-up s delayem

---

## 7. Before/After, HowItWorks, Testimonials, FAQ

**Datoteke: `BeforeAfter.tsx`, `HowItWorks.tsx`, `Testimonials.tsx`, `FAQ.tsx`**
- Primijeniti konzistentan glass-card stil na sve kartice
- Dodati fade-in-up entrance animacije
- Azurirati boje ikona na indigo/purple glow stil
- Testimonials: dodati subtilni glow iza aktivnog testimoniala

---

## 8. Footer

**Datoteka: `src/components/Footer.tsx`**
- Duboki dark footer (`bg-background` ili tamniji)
- Organizirani linkovi u stupce
- Social ikone: micro-interakcija na hover (scale + glow)
- Subtilan separator na vrhu (gradient linija)

---

## 9. Mobilna verzija

- Svi komponenti responsivni
- Bento grid prelazi u jednu kolonu na mobilnom
- Hero preview se skalira i gubi 3D perspektivu na manjem ekranu
- Marquee radi jednako na svim velicinama
- Dodati hamburger mobilni meni ako se doda navigacija

---

## Redoslijed implementacije

1. Globalni stilovi (`index.html`, `index.css`, `tailwind.config.ts`)
2. Hero 2.0
3. Marquee komponenta (nova)
4. Bento Feature Grid (SolutionCards redizajn)
5. Services, Stats azuriranje
6. BeforeAfter, HowItWorks, Testimonials, FAQ azuriranje
7. Footer redizajn
8. Mobilna optimizacija i testiranje

