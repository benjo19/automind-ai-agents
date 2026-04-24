

## Cilj

Velika vizualna nadogradnja postojećih sekcija — više interakcije, animacija i karaktera, bez mijenjanja sadržaja ili strukture stranice.

## Što se mijenja po točkama

### 1. Hero (`src/components/Hero.tsx`)
- **Typing/rotating riječ** u H1: novi sub-string rotira kroz `["odgovara", "prodaje", "zove", "šalje ponude"]` svake 2s; cross-fade animacija (CSS keyframes), sa fiksnom širinom da ne skače layout. Prefers-reduced-motion → statična zadnja riječ.
- **Social proof red** ispod CTA-a: 4 preklapajuća kruga (h-9 w-9, ring-2 background) s gradient inicijalima (MK, AN, IN, JT) + tekst "Već koristi 46+ tvrtki u Hrvatskoj".

### 2. Stats (`src/components/Stats.tsx`)
- **Count-up brojevi** kroz novi hook `useCountUp(target, duration)` koji se aktivira kad sekcija uđe u viewport (IntersectionObserver). Parsira numerički dio iz "46", "87%", "24h", "4.9★" i ponovno spaja sufiks.
- **4. kartica**: ikona `Star`, vrijednost "4.9★", label "Prosječna ocjena klijenata", `text-accent-pink` + `icon-glow-pink`.
- **Dashed konektor** na desktop (md+): horizontalna linija između kartica, `border-t border-dashed opacity-20`, pozicionirana apsolutno preko grid-a.
- Grid postaje `sm:grid-cols-2 md:grid-cols-4`.

### 3. Solution Cards (`src/components/SolutionCards.tsx`)
- Ikone postaju **h-12 w-12** unutar **kružnog obojenog backgrounda** (h-16 w-16, `bg-accent-*/15`, rounded-full).
- **"Saznaj više →" link** na dnu kartice, `opacity-0 group-hover:opacity-100`, smooth fade — vodi na `#demo`.
- **Voice agent kartica** (col-span-2): u kut dodajemo CSS audio waveform (5–7 vertikalnih barova s `@keyframes wave-pulse`, staggered delays, `bg-accent`, opacity 30%).

### 4. How It Works (`src/components/HowItWorks.tsx`)
- Između kartica (md+) **dashed gradient linija** (cyan → pink → emerald) s **animiranom strelicom** (►) koja klizi s lijeva na desno u 3s loop (`@keyframes arrow-slide`).
- Implementacija: pseudo-element ili apsolutno pozicionirani `<div>` između koraka, `bg-gradient-to-r` + maskirani dashed border.

### 5. Testimonials (`src/components/Testimonials.tsx`)
- **Stacked layout**: sve 3 kartice odjednom u `grid md:grid-cols-3 gap-6`. Srednja: `md:scale-105 shadow-glow`.
- Auto-rotate i dot navigacija se uklanjaju.
- **5 zlatnih zvjezdica** (`★★★★★` u `text-accent-amber`) iznad svakog citata.
- **DiceBear avatari**: `<img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(author)}`} />` umjesto kruga s inicijalima.

### 6. Before/After (`src/components/BeforeAfter.tsx`)
- Zamijena dvostupčanog layouta **interaktivnim drag sliderom**:
  - Wrapper `relative aspect-[16/9]` s pozadinskom slikom `call-agent.jpg`.
  - 2 apsolutna sloja: lijevi "Prije" (crveni overlay + lista s X) i desni "Poslije" (zeleni overlay + lista s ✓).
  - Desni sloj koristi `clip-path: inset(0 0 0 ${pos}%)` kontroliran state-om.
  - Vertikalna ručka u sredini (`absolute top-0 bottom-0`), drag handler na mouse + touch (`pointermove`, `pointerdown`, `pointerup`).
- Pristupačnost: tipke `←/→` mijenjaju poziciju za ±5%; `role="slider"` + `aria-valuenow`.

### 7. Navbar (`src/components/Navbar.tsx`)
- **IntersectionObserver** prati sekcije (`services`, `solutions`, `how-it-works`, `testimonials`, `faq`).
- Aktivna sekcija → `text-foreground` + tanki gradient underline (`after:` pseudo s `bg-gradient-to-r from-accent to-accent-pink`).

### 8. Footer (`src/components/Footer.tsx`)
- **Social ikone**: zadržati ikone, ali zamijeniti `<a href="#">` s `<button disabled>` + Tooltip ("Uskoro") na hover. Koristi postojeći `Tooltip` komponent.
- **Newsletter mini forma**: novi stupac (ili red iznad bottom-bara): `<input type="email">` + gumb "Prijavi se". Submit šalje POST na isti webhook kao DemoForm s payload `{ email, source: "newsletter", submitted_at }`. Toast za success/error.
- Grid postaje `md:grid-cols-5` da newsletter dobije svoj prostor.

### 9. Quick fixes
- **`index.html`**: `lang="en"` → `lang="hr"`.
- **`scroll-behavior: smooth`**: već postoji u `src/index.css` (linija 60) — preskačemo.
- **Cookie consent banner**: nova komponenta `src/components/CookieConsent.tsx`, mountana u `Index.tsx`. Provjera `localStorage.getItem("cookie_consent")`; ako nije set, prikaz fixed bottom banner s tekstom, gumb "Prihvati" (`variant="hero"`) i link "Saznaj više" → `/kolacici`. Klik na Prihvati → `localStorage.setItem("cookie_consent", "accepted")`.
- **OG image placeholder**: kreiramo `public/og-image.png` (jednostavni 1200x630 PNG s brand bojama, generiran skriptom u default mode), ažuriramo `index.html` `og:image` i `twitter:image` na `/og-image.png`.

## Tehnički dodaci

- **Novi hook**: `src/hooks/use-count-up.ts` — `useCountUp(target: number, duration = 1500, start = 0)`, vraća current value; aktivira se kad `ref` uđe u viewport.
- **Nove CSS animacije** u `src/index.css`: `@keyframes wave-pulse`, `@keyframes arrow-slide`, `@keyframes word-fade` + helper klase.
- **Nova komponenta**: `src/components/CookieConsent.tsx`.
- Drag slider koristi pure React state + `pointer events` (bez novih dependencies).

## Datoteke

- Edited: `src/components/Hero.tsx`, `src/components/Stats.tsx`, `src/components/SolutionCards.tsx`, `src/components/HowItWorks.tsx`, `src/components/Testimonials.tsx`, `src/components/BeforeAfter.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/index.css`, `src/pages/Index.tsx`, `index.html`
- New: `src/components/CookieConsent.tsx`, `src/hooks/use-count-up.ts`, `public/og-image.png`

## Što ostaje netaknuto

Copy, DemoForm, ChatWidget, FAQ, Services, brand boje/fontovi, webhook integracija, Cloud postavke, legal pages.

