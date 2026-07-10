## Redizajn Automind stranice — profesionalni izgled

Kompletna vizualna nadogradnja bez promjena u funkcionalnosti (ostaju rute, forme, book-call, voice demo, i18n).

### 1. Nova paleta boja (Emerald Prestige)

Zamjena postojeće "rainbow" palete jednim ozbiljnim, luksuznim sustavom:

| Token | HSL | Uloga |
|---|---|---|
| `--background` | `40 33% 97%` (#f5f0e0 warm ivory) | Glavna pozadina |
| `--foreground` | `160 84% 12%` (#064e3b deep emerald) | Tekst |
| `--primary` | `160 80% 26%` (#0d7a5f emerald) | CTA, akcent |
| `--primary-foreground` | `40 33% 97%` | Tekst na primary |
| `--accent` | `44 55% 54%` (#c9a84c gold) | Naglasak, brojevi, ikone |
| `--muted` | `40 20% 92%` | Sekundarne površine |
| `--card` | `0 0% 100%` | Kartice |
| `--border` | `160 20% 88%` | Rubovi |

Uklanjaju se svi `accent-cyan/pink/amber/emerald/rainbow` tokeni i `gradient-text-rainbow` klasa — zamjena je jedan zlatni akcent na emerald bazi. Sve `text-white`, `bg-black`, hardkodirane boje u komponentama se prevode u semantičke tokene.

### 2. Tipografija (Sora + Manrope)

Zamjena Inter + Playfair Display parova:
- **Sora** za sve naslove (H1–H4), negative tracking (`-0.02em`), weights 600/700
- **Manrope** za body, buttons, UI, weights 400/500/600

Instalacija preko `@fontsource/sora` i `@fontsource/manrope`, import u `src/main.tsx`, mapiranje u `tailwind.config.ts` kao `font-heading` i `font-body`. Postojeći `font-playfair` u komponentama se globalno prebacuje na `font-heading`. Uklanja se Google Fonts `<link>` iz `index.html`.

### 3. Layout — Hero Grid

- **Hero**: čist centrirani hero, veliki Sora naslov, potpisna linija u gold, jedan primarni CTA (emerald) + jedan tekstualni sekundarni. Miče se dekorativni SVG robot (previše "playful" za ozbiljan dojam) i multi-color radial glow — zamjena je suptilan gold+emerald gradient rub.
- **Services / SolutionCards / TargetIndustries**: uniformna 3-kolonska kartična mreža s tankim border-om, blagim shadow-om, gold ikonom u kvadratu s emerald pozadinom. Bez glass-morfizma i neon-glow efekata.
- **Ostale sekcije** (HowItWorks, ConcreteActions, MissedLeadCost, Testimonials, FAQ, BeforeAfter): zadržavaju strukturu, dobivaju novu paletu, uklanjaju se šareni ikonski akcenti — sve u emerald + gold sustavu.

### 4. Komponente koje treba osvježiti

- `Navbar` — bijela pozadina, emerald logo tekst, gold hover na linkovima
- `Button` (`hero`, `hero-outline` varijante) — emerald solid + gold outline
- `Footer` — deep emerald pozadina, ivory tekst, gold linkovi
- `Hero`, `Services`, `SolutionCards`, `ConcreteActions`, `Marquee`, `Stats`, `Testimonials`, `HowItWorks`, `MissedLeadCost`, `BeforeAfter`, `TargetIndustries`, `FAQ`, `DemoForm`, `BookCall`, `VoiceDemo`, `Blog`, `BlogPost`, `PageShell`
- Sve podstranice (`AIRecepcionar`, `AIZaSalone`, `AIZaOrdinacije`, `AIZaAutoServise`, `AIZaPraonice`, `Cijene`, `PrimjeriKoristenja`, `FAQPage`) — naslijeđuju kroz `PageShell` i `PageHero`

### 5. Detalji polirati

- Border-radius: dosljedan `rounded-2xl` na karticama, `rounded-full` na badge-evima
- Shadow: jedan `shadow-elegant` token (`0 10px 30px -12px hsl(160 40% 20% / 0.15)`)
- Animacije: zadržati postojeće `fade-in` i `float`, smanjiti intenzitet — profesionalno znači suzdržano
- Spacing: povećati vertikalni ritam sekcija (`py-20 md:py-28`)

### Ažuriranje memorije

Nakon implementacije ažurira se `mem://index.md`: paleta → Emerald Prestige, fontovi → Sora + Manrope (uklanja se stara Inter napomena).

### Tehničke bilješke

- Svi tokeni idu u `src/index.css` (`:root`) i `tailwind.config.ts` kao HSL varijable
- `src/integrations/supabase/client.ts`, `types.ts`, `.env`, `supabase/config.toml` se ne diraju
- Nema izmjena na backend-u, edge funkcijama, ni na `public/ai-agents.json` / `sitemap.xml` / `llms.txt`
- Bez promjena u rutingu i i18n stringovima

### Izvan opsega

- Nova copywriting/marketing poruka (ostaje "AI recepcionar za lokalne tvrtke")
- Redizajn blog članaka (samo stilski, ne sadržajno)
- Konkretne cijene (i dalje "Zatraži ponudu")