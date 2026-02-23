

## Plan redizajna u skladu s logom

### 1. **Dodavanje loga u projekt**
- Kopirati logo u `src/assets/logo.png`
- Koristiti ga u Hero sekciji i Footeru

### 2. **Novi font - Playfair Display (serif)**
- Dodati Google Font link u `index.html`:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
  ```
- Konfigurirati u `tailwind.config.ts` kao `font-playfair`
- Koristiti za naslove (h1, h2, h3)

### 3. **Nova paleta boja u `src/index.css`**
- **Pozadina**: Zadržati tamnu, ali čisto crnu (`0 0% 4%`)
- **Primarna**: Bijela/svijetlo siva umjesto neon purple
- **Akcent**: Suptilno zlatna/srebrna umjesto neon cyan  
- **Maknuti**: `--neon-purple` i `--neon-cyan` glow efekte
- **Dodati**: Elegantne bijele linije i suptilne sjene

### 4. **Novi gradient-text stil**
- Umjesto purple→cyan gradijenta, koristiti bijelo-srebrni ili jednostavno bijeli tekst
- Opcija: Suptilni zlatni akcent za CTA

### 5. **Hero sekcija (`Hero.tsx`)**
- Dodati logo sliku iznad naslova
- Dodati tagline: "AUTOMATIZIRAJ. OPTIMIZIRAJ. NAPREDUJ."
- Promijeniti font naslova u Playfair Display
- Ukloniti neon glow s gumba, dodati elegantni bijeli border

### 6. **Footer (`Footer.tsx`)**
- Dodati logo sliku
- Promijeniti `gradient-text` u bijeli tekst

### 7. **Services, SolutionCards, Pricing komponente**
- Zamijeniti `text-neon-purple` i `text-neon-cyan` s bijelom/srebrnom
- Ukloniti `glow-purple`, `glow-cyan` efekte
- Dodati suptilne bijele bordere umjesto neon sjena

### 8. **Stats komponenta (`Stats.tsx`)**  
- Ukloniti neon boje, koristiti bijelu

### 9. **Button varijante (`button.tsx`)**
- Ažurirati `hero` varijantu da koristi elegantniji stil (bijeli border, bez neon gradijenta)

### 10. **Ukloniti glass-card neon efekte**
- Zadržati glassmorphism ali s bijelim/srebrnim akcentima

---

### Vizualni rezultat:
- **Prije**: Neon cyberpunk gaming estetika
- **Poslije**: Elegantni, premium tech branding koji se slaže s logom

