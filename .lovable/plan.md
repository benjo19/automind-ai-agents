

## Cilj

Stranica je trenutno potpuno tamna s jednom akcentnom bojom (indigo/ljubičasta). Dodajemo **šareniju, veseliju paletu** koja zadržava premium dark feel, ali djeluje živahnije i zabavnije — bez da postane šarena "dječja" stranica.

## Nova paleta (dark + veselo)

Uvodimo **5 akcentnih boja** koje se koriste kroz sekcije:
- **Indigo** `245 70% 65%` — postojeći (zadržan, malo svjetliji/živahniji)
- **Pink/Magenta** `320 85% 65%` — nova
- **Cyan/Teal** `180 75% 55%` — nova
- **Amber/Gold** `35 95% 60%` — nova
- **Emerald** `155 70% 55%` — nova

Svaka sekcija dobiva svoju "dominantnu" akcentnu boju umjesto da sve bude indigo.

## Što se mijenja

### 1. `src/index.css` — nova design-token paleta
- Dodaju se CSS varijable: `--accent-pink`, `--accent-cyan`, `--accent-amber`, `--accent-emerald`
- `--accent` postaje malo svjetliji indigo (veseliji)
- Background ostaje taman, ali se dodaje suptilna **gradient pozadina** umjesto čisto crne (npr. `linear-gradient(180deg, hsl(240 8% 5%), hsl(250 10% 6%))`)
- Nova helper klasa `.gradient-text-rainbow` — gradient kroz indigo → pink → cyan za naslove
- `.glass-card` dobiva malo topliji ton (suptilna boja u pozadini blur-a)
- Novi `.icon-glow-pink`, `.icon-glow-cyan`, `.icon-glow-amber`, `.icon-glow-emerald`
- Glavni glow u Hero-u postaje **multi-color radial** (indigo + pink + cyan blob-ovi)

### 2. `Hero.tsx`
- Pozadina: tri obojena radial-glow blob-a (indigo, pink, cyan) umjesto jednog indigo
- 3 badge-a dobivaju različite boje ikona (zelena/cyan/amber checkmark)
- H1 koristi novi `gradient-text-rainbow` (indigo → pink) za "AI koji odgovara…" — ostaje elegantno, ali šarenije

### 3. `Stats.tsx` (3 metrike)
- Svaka kartica dobiva svoju boju ikone i glow:
  - 46 korisnika → **cyan**
  - 87% konverzija → **emerald**
  - 24h aktivacija → **amber**
- Brojevi mogu zadržati gradient-text ili dobiti istu boju kao ikona

### 4. `SolutionCards.tsx` (4 bento kartice)
- Svaka kartica = svoja boja ikone + suptilni obojeni rub na hover:
  - Voice agent → **indigo**
  - Chat agent → **pink**
  - Auto-ponude → **amber**
  - E-mail follow-up → **cyan**

### 5. `Services.tsx` (3 kartice)
- AI Agenti → **indigo**, Automatizacija prodaje → **pink**, Web stranice → **cyan**
- Checkmark ✓ u feature listi prima boju kartice

### 6. `HowItWorks.tsx`
- 3 koraka, 3 boje: 01 cyan, 02 pink, 03 emerald
- Veliki broj u pozadini (`01/02/03`) dobiva suptilnu obojenu prozirnost umjesto bijele

### 7. `FAQ.tsx`, `Testimonials.tsx`, `BeforeAfter.tsx` (manji touch)
- Akcentne ikone/borderi koriste mješovitu paletu umjesto samo indigo
- Nema strukturnih promjena, samo zamjena `text-accent` → `text-[hsl(var(--accent-pink))]` itd. na par mjesta

## Što ostaje
- Tamna pozadina (ostaje "Dark Cinematic" — samo življa)
- Fontovi (Playfair + Inter), glassmorphism, layout, copy
- Sve funkcionalnosti (forma, webhook, chat widget)

## Datoteke
- `src/index.css` — paleta, gradijenti, glow varijante
- `src/components/Hero.tsx` — multi-color glow + obojeni elementi
- `src/components/Stats.tsx` — boja po kartici
- `src/components/SolutionCards.tsx` — boja po kartici
- `src/components/Services.tsx` — boja po kartici
- `src/components/HowItWorks.tsx` — boja po koraku
- `src/components/FAQ.tsx`, `src/components/Testimonials.tsx`, `src/components/BeforeAfter.tsx` — sitne promjene akcenata

## Rezultat
Stranica zadržava premium dark feel, ali djeluje znatno **veselije i živahnije** zahvaljujući 5-bojnoj paleti koja se rotira kroz sekcije i kartice. Manje monotono, više karaktera.

