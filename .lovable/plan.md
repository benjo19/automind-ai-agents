## Cilj
Osvježiti izgled chat widgeta (`src/components/ChatWidget.tsx`) tako da koristi brand boje iz dizajn sistema (indigo → pink → cyan gradijenti) umjesto trenutnog crno-bijelog izgleda.

## Što ću promijeniti

**1. Floating launcher (kružni gumb dolje desno)**
- Trenutno: `bg-foreground text-background` (bijelo)
- Novo: gradient `from-accent via-accent-pink to-accent-cyan` s jačim `shadow-glow`
- Suptilna pulsing glow animacija kad je zatvoren da privuče pažnju

**2. Header chat panela**
- Avatar "A": ostaje gradient, ali pojačan (indigo → pink)
- Status dot: koristi `accent-emerald` (zelena = online) umjesto generičkog accenta
- Tanka gradient linija ispod headera (rainbow)

**3. Poruke**
- User bubble: gradient `from-accent to-accent-pink` umjesto čisto bijelog
- Assistant bubble: blagi tinted glass (`bg-accent/5` + border `accent/10`) umjesto sivog
- Typing dots: koriste accent boju s glow

**4. Input polje**
- Focus ring: `accent-pink` umjesto generičkog ring
- Send gumb: zadržati `variant="hero"` ali zaokružiti s gradient glow

**5. Lead success / error**
- Success: `accent-emerald` umjesto generičkog accent
- Suptilni gradient border

## Tehnički detalji
- Sve boje preko Tailwind tokena iz `tailwind.config.ts` (`accent`, `accent-pink`, `accent-cyan`, `accent-emerald`) — bez hardcoded hex vrijednosti
- Iskoristit ću postojeću `glass-card` i `shadow-glow` utility klase iz `index.css`
- Bez novih dependency-ja, bez promjena logike (streaming, lead submit ostaju identični)
- Samo izmjene u `src/components/ChatWidget.tsx`

## Što NEĆU dirati
- Logika chata, fetch pozivi, edge function
- Tekstovi/prijevodi (`i18n.tsx`)
- Pozicija widgeta i ponašanje otvaranja/zatvaranja
