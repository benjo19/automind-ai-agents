## Cilj
Preurediti homepage da jasnije prodaje AutoMind malim i srednjim poduzetnicima u Hrvatskoj: konkretan hero copy, jasne koristi, industrije za koje je rješenje namijenjeno i dodatni CTA oko propuštenih klijenata.

## Promjene

### 1. Hero sekcija
U `src/components/Hero.tsx`:
- Zamijeniti rotirajući/generički naslov fiksnim naslovom:
  - `AI koji odgovara, zove i šalje ponude za vas.`
- Zamijeniti podnaslov tekstom:
  - `AutoMind hvata upite s weba, maila, WhatsAppa i poziva, odgovara klijentima, dogovara termine i šalje ponude — 24/7.`
- Badgeve postaviti ovim redoslijedom:
  - `Aktivacija u 24h`
  - `Hrvatski jezik i glas`
  - `GDPR-ready`
  - `Bez tehničkog znanja`
- Primarni CTA promijeniti u:
  - `Zatraži besplatnu AI analizu`
- Sekundarni CTA promijeniti u:
  - `Pogledaj kako radi`
- Ukloniti social proof tekst `Već koristi 46+ tvrtki u Hrvatskoj`.
- Umjesto toga prikazati:
  - `Napravljeno za obrte, servise, salone, turizam i lokalne tvrtke u Hrvatskoj.`
- Zadržati postojeći premium dark/gradient izgled, animirane glow elemente, robot SVG i CTA stilove.

### 2. Nova sekcija: “Što AutoMind konkretno radi?”
Dodati novu komponentu, npr. `src/components/ConcreteActions.tsx`, odmah ispod Hero dijela, prije kontakt forme.

Kartice:
1. `Odgovara na web i WhatsApp upite`
   - `Klijent pošalje upit, AI odmah odgovara i sprema podatke.`
2. `Prima pozive i zapisuje zahtjeve`
   - `AI voice agent razgovara na hrvatskom i šalje vam sažetak poziva.`
3. `Šalje ponude automatski`
   - `Iz upita generira osnovnu ponudu i šalje je vama na pregled ili direktno klijentu.`
4. `Podsjeća na follow-up`
   - `Nijedan lead ne ostaje zaboravljen. Sustav vas podsjeća kada treba nazvati ili poslati poruku.`
5. `Sprema leadove u CRM`
   - `Svi kontakti, upiti i statusi nalaze se na jednom mjestu.`

Dizajn:
- Glass kartice u postojećem gradient/glow stilu.
- Ikone iz `lucide-react`.
- Responsive grid: 1 stupac mobitel, 2 stupca tablet, 3 stupca desktop, s petom karticom skladno uklopljenom.

### 3. Nova sekcija: “Za koga je AutoMind?”
Dodati novu komponentu, npr. `src/components/TargetIndustries.tsx`, nakon sekcije “Što AutoMind konkretno radi?” ili nakon kontakt forme, ovisno o postojećem flowu. Preporuka: ispod nove konkretne sekcije, prije forme, kako bi korisnik prvo razumio koristi i prepoznao se u primjerima.

Kartice/čipovi:
- `Automehaničari i servisi`
- `Frizerski i beauty saloni`
- `Apartmani i turizam`
- `Nekretnine`
- `Građevina i majstori`
- `Praonice i lokalne usluge`

Dizajn:
- Kratke glass kartice ili pill elementi.
- Jasno, čitljivo i poslovno, bez tehničkog žargona.

### 4. Nova sekcija: “Koliko vas košta propušten klijent?”
Dodati komponentu, npr. `src/components/MissedLeadCost.tsx`, prije postojeće forme ili prije FAQ-a kao dodatni prodajni CTA blok.

Sadržaj:
- Naslov: `Koliko vas košta propušten klijent?`
- Tekst: `Ako vam samo 3 klijenta mjesečno ne dobiju odgovor na vrijeme, već gubite više nego što košta automatizacija.`
- CTA: `Želim provjeriti koliko upita gubim`
- CTA scrolla na postojeću kontakt formu `#demo`.

Napomena:
- Ovo nije pricing sekcija i neće prikazivati cijene, pakete ni pretplate.

### 5. Homepage redoslijed
U `src/pages/Index.tsx` ažurirati strukturu na prodajniji flow:

```text
Navbar
Hero
ConcreteActions
TargetIndustries
DemoForm
Stats / Services / ostale postojeće sekcije
MissedLeadCost
FAQ
Footer
ChatWidget
CookieConsent
```

Ako bude bolje vizualno, `MissedLeadCost` može ići neposredno prije `DemoForm` kao dodatni okidač za formu, ali forma ostaje visoko na stranici kako je ranije traženo.

### 6. Ton i copy cleanup
Proći kroz nove tekstove i povezane postojeće naslove kako bi ton bio:
- jasan
- direktan
- poslovan
- razumljiv netehničkim korisnicima

Izbjegavati izraze:
- `digitalna transformacija`
- `revolucionarna tehnologija`
- `budućnost poslovanja`

## Tehnički detalji
- Promjene su primarno frontend: React komponente i `Index.tsx` import/redoslijed.
- Nema potrebe za backend ili baznim promjenama.
- Koristit će se postojeći dizajn tokeni: `glass-card`, `gradient-text-rainbow`, `glow-bg`, `hover-lift`, accent boje i `ScrollReveal`.
- Ne dirati automatski generirane Cloud/Supabase datoteke.

## Rezultat
Homepage će odmah objasniti što AutoMind radi, za koga je namijenjen i zašto je problem propuštenih upita poslovno važan — uz zadržavanje premium dark AI vizualnog identiteta i jasnih CTA gumba prema kontakt formi.