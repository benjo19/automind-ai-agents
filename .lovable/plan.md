## Plan: Installable Web App za Automind

Napravit ću najjednostavniju i najsigurniju verziju: aplikacija će se moći dodati na Home Screen / instalirati iz browsera, bez service workera i bez offline cachea. To izbjegava probleme sa zastarjelim sadržajem u Lovable previewu.

## Što ću napraviti

1. **Dovršiti web app manifest**
   - Ažurirati `public/site.webmanifest` s boljim podacima za instalaciju:
     - naziv aplikacije
     - kratki naziv
     - opis
     - `start_url`
     - `scope`
     - `display: standalone`
     - brand boje
     - ikone potrebne za iOS/Android instalaciju

2. **Dodati mobilne install meta tagove**
   - U `index.html` dodati/pojačati tagove za:
     - iPhone “Add to Home Screen” prikaz
     - Android instalaciju
     - status bar boju
     - app title
     - maskable icon podršku gdje je moguće

3. **Dodati install stranicu `/install`**
   - Nova stranica s kratkim uputama:
     - iPhone: Share → Add to Home Screen
     - Android/Chrome: Menu → Install app / Add to Home screen
   - Stranica će biti u istom Automind dizajnu i dvojezična HR/EN.

4. **Dodati link prema install stranici**
   - Dodati diskretan link u footer ili navigaciju, npr. “Instaliraj aplikaciju”.
   - Link će se prevoditi na engleski: “Install app”.

5. **Ikone za aplikaciju**
   - Iskoristiti postojeći favicon/brand kao bazu i dodati potrebne icon reference u manifest.
   - Ako postojeći favicon nije dovoljan za kvalitetne app ikone, pripremit ću fallback konfiguraciju da instalacija i dalje radi, a kasnije možemo zamijeniti ikone boljim PNG assetima.

## Tehnički detalji

- Neću dodavati `vite-plugin-pwa` ni service worker, jer za osnovnu instalaciju nije potreban i može uzrokovati cache probleme u Lovable previewu.
- Postojeći `public/site.webmanifest` već ima osnovni `display: standalone`; proširit ću ga da bude spreman za mobilne browsere.
- Dodat ću novu rutu u `src/App.tsx`: `/install`.
- Dodati prijevode u `src/lib/i18n.tsx` za HR/EN tekstove install stranice i linka.

## Rezultat

Korisnici će moći otvoriti stranicu na mobitelu i dodati Automind na početni ekran kao aplikaciju. Otvarat će se u standalone prikazu, bez standardnog browser chromea gdje uređaj to podržava.