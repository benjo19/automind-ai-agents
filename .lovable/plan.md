## Cilj
Dodati englesku verziju cijele stranice tako da korisnik može prebacivati jezik između hrvatskog i engleskog bez dupliciranja dizajna.

## Što ću napraviti

### 1. Jezični sustav
- Dodati jednostavan translation setup za `hr` i `en`.
- Hrvatski ostaje postojeći/default jezik.
- Engleski dobiva prijevode za sav vidljivi sadržaj na stranici.
- Spremiti odabir jezika u browser, da korisnik ostane na odabranom jeziku pri povratku.

### 2. Language switcher u navigaciji
- U `Navbar` dodati prebacivanje jezika, npr. `HR / EN`.
- Switcher će biti dostupan i na desktopu i u mobilnom meniju.
- Navigacijski linkovi i CTA gumbi mijenjat će tekst prema jeziku.

### 3. Prevesti glavnu landing stranicu
Prevesti tekstove u:
- Hero
- ConcreteActions
- TargetIndustries
- DemoForm
- Stats
- Services
- SolutionCards
- HowItWorks
- BeforeAfter
- Testimonials
- MissedLeadCost
- FAQ
- Footer
- ThankYou stranica

### 4. Forma i poruke
- Prevesti labele, placeholder tekstove, select opcije, GDPR tekst, newsletter tekst i validacijske/toast poruke.
- Nakon slanja forme, `/hvala` stranica prikazat će tekst na jeziku koji je korisnik odabrao.
- Podaci koji idu prema postojećem webhooku ostaju kompatibilni.

### 5. SEO i legal stranice
- Za glavnu stranicu prevesti `title`, `description`, `keywords`, Open Graph tekstove i FAQ schema tekstove.
- Legal stranice mogu dobiti language-aware tekst ako želiš da i one budu potpuno engleske; u ovoj implementaciji ću ih uključiti u translation sustav ako su dio “cijele stranice”.
- Rute ostaju postojeće, bez lomljenja linkova.

### 6. Chat widget
- Prevesti tekstove sučelja chata: početna poruka, greške, statusi, aria labeli i fallback poruke.
- Ako je korisnik na engleskom, Ana će započeti na engleskom i slati kontekst jezika backend funkciji.

## Tehnički detalji
- Dodati `LanguageProvider` / hook, npr. `useLanguage()`.
- Dodati centralni dictionary file, npr. `src/lib/i18n.ts`, s hrvatskim i engleskim tekstovima.
- Komponente će koristiti prijevode iz dictionaryja umjesto hardkodiranih tekstova.
- Ne dirati automatski generirane backend client/type datoteke.
- Ne mijenjati postojeći vizualni stil, animacije, layout ni webhook URL.

## Rezultat
Stranica će imati kompletan HR/EN prikaz s jednim dizajnom, jednim setom komponenti i jasnim language switcherom u navigaciji.