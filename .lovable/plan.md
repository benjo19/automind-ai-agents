

## Cilj
Veliki refactor postojeće stranice: 13 ciljanih izmjena kroz Hero, Stats, Marquee, Services, SolutionCards, HowItWorks, BeforeAfter, Testimonials, FAQ, DemoForm, Footer + nova `/hvala` stranica i CSS ispravak.

## Promjene po sekcijama

### 1. `src/components/Hero.tsx`
- Badges (linija 108): `px-4 py-2` → `px-5 py-2.5`
- H1 (linija 116): `text-4xl` → `text-3xl` (ostali breakpointi nepromijenjeni)
- Robot wrapper (linija 47): `hidden md:block` → `hidden lg:block`

### 2. `src/components/Stats.tsx`
- `StatCard` root `<div>`: dodati `glass-card p-6 rounded-2xl` uz postojeći `text-center relative z-10`
- Dashed connector: `top-12` → `top-[4.5rem]`

### 3. `src/components/Marquee.tsx` (kompletni rewrite)
- Iznad marquee diva: dodati uvodni `<p>` "Integriramo se s alatima koje već koristite"
- `tools` → array objekata `{ name, slug }` (8 alata, dupliciran 2× za beskonačni scroll)
- Svaki item: logo (`https://cdn.simpleicons.org/${slug}/6b7280` h-5 w-5) + naziv
- Wrapper div s `style={{ maskImage / WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}`

### 4. `src/components/Services.tsx`
- Image wrapper: dodati `mb-8 md:mb-0` u postojeći className

### 5. `src/components/SolutionCards.tsx`
- Ikone wrapper: `w-16 h-16` → `w-12 h-12`
- Voice agent kartica (prva, `col-span-2`): dodati `border-accent/20`

### 6. `src/components/HowItWorks.tsx`
- `numColor` u `steps` arrayu: `/10` → `/20` (cyan, pink, emerald)
- Connector linija: `top-16` → `top-[4.5rem]`

### 7. `src/components/BeforeAfter.tsx`
- Dodati `useEffect(() => { ... }, [])` koji 800 ms nakon mounta pokreće hint:
  - `setTimeout(() => { setPos(30); setTimeout(() => setPos(50), 600); }, 800)`
- Cleanup oba timeouta na unmount
- Respect `prefers-reduced-motion` (preskoči animaciju ako reduce)

### 8. `src/components/Testimonials.tsx`
- Avatar `<img>`: dodati `ring-2 ring-border` uz postojeći `bg-secondary`
- Srednja kartica (`isMiddle`): `md:scale-105` → `md:scale-110`, `border-accent/30` → `border-accent/40`
- Tvrtke u `testimonials` arrayu:
  - Marko H. → "Frizerski salon · Zagreb"
  - Ana K. → "Građevinska tvrtka · Split"
  - Ivan N. → "Auto servis · Osijek"

### 9. `src/components/FAQ.tsx`
- AccordionTrigger sadržaj: prefiks `<span className="text-accent-pink text-xs font-mono mr-3 shrink-0">{String(index+1).padStart(2,'0')}</span>`
- Dodati 4 nova FAQ-a: "Koliko košta?", "Postoji li ugovor ili obveza?", "Gdje se pohranjuju moji podaci?", "Što ako nisam zadovoljan rezultatom?" (s odgovorima iz brief-a)
- **Bonus:** ažurirati FAQ JSON-LD u `src/pages/Index.tsx` da uključuje nova pitanja (SEO konzistentnost)

### 10. DemoForma — premjestiti + 2-step
- **`src/pages/Index.tsx`**: maknuti `<DemoForm />` ispod Hero, dodati ga prije `<Footer />`
  Novi redoslijed: Hero → Stats → Services → SolutionCards → HowItWorks → BeforeAfter → Testimonials → FAQ → DemoForm → Footer
- **`src/components/DemoForm.tsx`**: pretvoriti u 2-step:
  - Novi state: `step` (1 ili 2)
  - Progress bar (koristiti postojeći `@/components/ui/progress` ili custom 2-bar) iznad forme, accent boja (`bg-accent`)
  - **Korak 1:** ime, email, telefon, tvrtka + gumb "Dalje →" (validira required polja koraka 1, ne submita)
  - **Korak 2:** djelatnost, opseg, interesi, rok, poruka, GDPR, newsletter + gumbi "← Natrag" i "Pošalji upit" (submit)
  - Submit handler ostaje isti, ali nakon uspjeha: `useNavigate` → `navigate("/hvala")` umjesto toast-a (toast ostaje samo za error)

### 11. `src/components/Footer.tsx`
- Email konstanta `CTA_EMAIL` već je `auto.mind.ai2025@gmail.com` ✓ (nepromijenjeno)
- Copyright: `© 2025` → `© 2026`
- Provjereno: social div je već uklonjen u prijašnjem koraku ✓

### 12. Nova stranica `/hvala`
- **Kreirati `src/pages/ThankYou.tsx`:**
  - `min-h-screen flex items-center justify-center` s tamnom pozadinom
  - `CheckCircle2` ikona (h-20 w-20, `text-accent-emerald icon-glow-emerald`, jednokratni `animate-bounce`)
  - H1 "Hvala! Upit je zaprimljen." (`font-playfair gradient-text-rainbow`)
  - Paragraf "Naš tim javit će vam se u roku 24h s personaliziranom ponudom."
  - Gumb "Povratak na početak" → `useNavigate()` → `navigate("/")`
  - `<Helmet>` s `<meta name="robots" content="noindex" />` (thank-you stranice ne treba indeksirati)
- **`src/App.tsx`:** dodati `<Route path="/hvala" element={<ThankYou />} />` iznad catch-all rute

### 13. CSS fix — `src/index.css`
- `body::before`: `z-index: 0` → `z-index: -1` (noise overlay ide iza svega umjesto preko, sprječava potencijalne klik probleme i osigurava da gradient/blob layeri ostanu vidljivi pravilno)

## Datoteke
- Edit: `src/components/Hero.tsx`, `Stats.tsx`, `Marquee.tsx`, `Services.tsx`, `SolutionCards.tsx`, `HowItWorks.tsx`, `BeforeAfter.tsx`, `Testimonials.tsx`, `FAQ.tsx`, `DemoForm.tsx`, `Footer.tsx`
- Edit: `src/pages/Index.tsx` (preraspored + FAQ JSON-LD), `src/App.tsx` (nova ruta), `src/index.css` (z-index fix)
- Create: `src/pages/ThankYou.tsx`

## Što ostaje netaknuto
Sav ostali copy, brand boje, fontovi, glassmorphism tokens, animacije (word-cycle, robot-float, marquee, float, wave), CookieConsent, ChatWidget, legal stranice, webhook URL, supabase integracije.

## Rezultat
Stranica dobiva polished detalje (badge spacing, glass StatCards, brand logoi u marquee, jači numerički akcenti u HowItWorks), bolji UX (BeforeAfter hint, 2-step DemoForm, dedicated thank-you stranica) i čišću tehničku osnovu (z-index fix, ažurirani FAQ schema).

