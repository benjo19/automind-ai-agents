

## Cilj

Smanjiti količinu nabrajanja AI/automatizacijskih opcija i preusmjeriti naglasak na **personalizirani pristup** ("razgovor → prilagođeno rješenje"). Stranica će biti kraća, čišća i manje "feature-heavy".

## Što se mijenja

### 1. `SolutionCards.tsx` — skratiti bento s 7 na 4 kartice
Zadržati samo srž, ukloniti tehnički zvučne stavke:
- Ostaju: **Voice agent**, **Chat agent**, **Auto-ponude (PDF)**, **E-mail follow-up**
- Brišu se: Lead scoring, Mini-CRM + Analytics, Web scraping
- Naslov mijenjamo iz "Kompletno AI rješenje" → **"Što gradimo za vas"**
- Podnaslov: **"Svako rješenje je prilagođeno vašem poslu — bez gotovih paketa."**
- Opise pojednostaviti (manje "UTM/CRM/ROI" žargona, više benefita)

### 2. `Services.tsx` — s 4 kartice na 3
- Brišemo karticu **"Web scraping & Analitika"** (preklapa se i previše je tehnička)
- Ostaju: AI Agenti, Automatizacija prodaje, Web stranice
- Skraćuju se feature-liste sa 4 na 3 stavke po kartici (manje natrpano)
- Podnaslov: **"Razgovaramo, slušamo, predlažemo rješenje koje ima smisla baš za vaš posao."**

### 3. `HowItWorks.tsx` — preformulirati u personalizirani tijek
Trenutno zvuči tehnički ("Sheets, Docs predložak, cjenici"). Mijenjamo u tri koraka koja naglašavaju ljudski pristup:
- **01 Razgovor** — Upoznamo vaš posao, izazove i ciljeve
- **02 Prijedlog** — Dobivate prilagođeno rješenje s jasnim opsegom
- **03 Pokretanje** — Postavljamo, povezujemo i ostajemo uz vas

### 4. `Hero.tsx` — kraći, personalniji podnaslov
- Podnaslov mijenjamo iz tehničkog nabrajanja u: **"Prilagođena AI rješenja za vaš posao — od prvog razgovora do pokretanja."**
- Uklanjamo **mock dashboard** (chart bars + "Active Agents/Conversations/Conversion") — to je upravo ona vrsta "AI feature flexa" koju želimo smanjiti, i dodatno skraćuje stranicu

### 5. `Marquee.tsx` — ukloniti iz `Index.tsx`
Marquee trenutno prikazuje "OpenAI, Make.com, Supabase…" što direktno krši memory pravilo *"NEVER use tool names in copy"*. Najčišći potez: **maknuti sekciju** iz layouta (komponentu ostavljamo u repu projekta neaktivnu).

### 6. `Stats.tsx` — sa 4 metrike na 3
- Brišemo **"99.8% Uptime garancija"** (tehnički metrik koji ne pripada personaliziranom narativu)
- Ostaju: 46 Aktivnih korisnika, 87% Povećanje konverzija, 24h Aktivacija sustava

### 7. `FAQ.tsx` — manje "feature" pitanja
- Brišemo: *"Podržavate li hrvatski voice?"* i *"Mogu li integrirati s postojećim sustavima?"* (preusko-tehnička)
- Ostaju 4 pitanja koja naglašavaju suradnju i podršku
- Sinkroniziramo i FAQPage JSON-LD u `Index.tsx` da odražava nove FAQ stavke

### 8. `Index.tsx` — meta i layout
- Maknuti `<Marquee />` iz strukture
- Ažurirati `<title>` i `meta description` da budu manje "feature lista", više "personaliziran pristup"
- Ažurirati FAQPage JSON-LD u skladu s točkom 7

## Što ostaje netaknuto
- Dizajn sustav (boje, fontovi, glass-card, gradient-text)
- ChatWidget, DemoForm, Footer, BeforeAfter, Testimonials
- Webhook integracije, edge funkcija, Cloud postavke

## Rezultat
Stranica gubi cca 1 sekciju (Marquee) + 3 bento kartice + 1 service karticu + mock dashboard + 2 FAQ pitanja → znatno kraća i fokusiranija na poruku **"prilagođeno baš za vas"**.

