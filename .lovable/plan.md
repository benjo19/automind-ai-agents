

## Cilj

Korisnik može odmah u Hero sekciji ostaviti kontakt (lead) — bez da skrolanjem traži formu — ali bez da se sad pojavljuje cijela velika DemoForm na vrhu. Rješenje: **mini lead bar u Hero-u** (samo e-mail + gumb "Informiraj me"), koji jednim klikom prebacuje korisnika na punu formu dolje s već popunjenim e-mailom.

## Što se mijenja

### 1. Novi mini lead element u `Hero.tsx`
Ispod CTA gumba (`Zatraži demo` / `Kako radi`) dodaje se kompaktna inline forma:

```text
┌─────────────────────────────────────────────┐
│  [ vas@email.com         ]  [ Informiraj me ]│
│  Bez obveze · Odgovor u 24h                 │
└─────────────────────────────────────────────┘
```

- Jedno polje: **e-mail** (Input)
- Jedan gumb: **"Informiraj me →"** (variant `hero`)
- Mikro-tekst ispod: *"Bez obveze · Odgovor u 24h"*
- Glassmorphism stil (`glass-card`), max širina ~480px, centrirano
- Vizualno diskretno — ne nadjačava postojeći H1/CTA, samo dodaje "brzi ulaz"

### 2. Ponašanje na submit
- Validacija da e-mail nije prazan (jednostavna `type="email" required`)
- Spremanje e-maila u `sessionStorage` pod ključem `prefill_email`
- Smooth scroll na `#demo` sekciju
- Bez direktnog slanja na webhook — puna forma (s GDPR pristankom, imenom, itd.) ostaje izvor istine za slanje, čime se izbjegava duplo slanje i nepotpuni leadovi bez GDPR suglasnosti

### 3. Prefill u `DemoForm.tsx`
- Na mountu (`useEffect`) pročitati `sessionStorage.getItem("prefill_email")`
- Ako postoji, postaviti u `formData.email` i obrisati ključ iz storage-a
- Polje e-mail tako dočekuje korisnika već popunjeno → smanjuje friction

## Što ostaje isto
- DemoForm sekcija na dnu (sa svim poljima, GDPR, webhook integracijom) — netaknuta
- Navbar CTA "Zatraži demo" — netaknut
- Dizajn sustav, boje, fontovi
- ChatWidget i ostale sekcije

## Datoteke

- `src/components/Hero.tsx` — dodaje mini lead bar (Input + gumb + helper tekst) ispod postojećih CTA gumba
- `src/components/DemoForm.tsx` — `useEffect` koji čita `sessionStorage.prefill_email` i puni `formData.email`

## Rezultat

Hero ostaje vizualno čist, ali korisnik **odmah na prvom ekranu** ima brzi način ostaviti e-mail. Klik ga vodi na punu formu s već unesenim e-mailom — manje koraka, veća konverzija, bez velike forme na vrhu.

