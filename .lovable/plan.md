

## Cilj

Obogatiti pozadinu stranice s animiranim mesh gradientom, dodatnim plutajućim glow blobom u Hero sekciji i suptilnim noise texture overlayem za "filmsku" teksturu.

## Što se mijenja

### 1. `src/index.css` — Body mesh gradient
- Zamijeniti postojeći `body { background: linear-gradient(...) }` s 4-slojnim mesh gradientom (3 radial + 1 linear base)
- `background-attachment: fixed` ostaje
- Boje: indigo (20% 50%), pink (80% 20%), cyan (60% 80%), preko base linear gradienta

### 2. `src/index.css` — Noise overlay
- Dodati `body::before` pseudo-element s inline SVG noise texturom (fractalNoise filter)
- `position: fixed; inset: 0; pointer-events: none; opacity: 0.4; z-index: 0`
- Postojeći sadržaj (Navbar, main, ChatWidget) već ima viši z-index ili se renderira u svom stacking contextu — ali za sigurnost provjeriti da `body::before` ne pokriva interakciju (pointer-events: none ✓)

### 3. `src/components/Hero.tsx` — Plutajući glow blobovi
- Postojeća 3 blob `<div>`-a (indigo, pink, cyan) dobivaju `animate-float` klasu s različitim `animationDelay` inline stilovima:
  - Blob 1 (indigo, top-left): delay 0s
  - Blob 2 (pink, top-right): delay 1.5s
  - Blob 3 (cyan, bottom-center): delay 3s
- **Novi 4. blob**: bottom-right, amber `hsl(35 95% 60% / 0.08)`, delay 4.5s
  - Pozicija: `absolute bottom-1/4 right-1/4 translate-x-1/2 w-[480px] h-[420px]`
- Postojeća `@keyframes float` (translateY 0 → -20px → 0, 6s) već postoji u `index.css` — ne treba mijenjati

## Što ostaje netaknuto
Sav copy, ostale sekcije, fontovi, postojeće animacije (word-cycle, robot-float, marquee, wave), glassmorphism, glow tokens, robot SVG, layout.

## Tehnički detalji

**Z-index hijerarhija nakon promjena:**
- `body::before` (noise): `z-index: 0`, fixed preko cijelog viewporta, `pointer-events: none`
- Hero glow blob wrapper: `z-0` (relativno unutar Hero sekcije, ne sukobljava se s body::before jer je u zasebnom stacking contextu)
- Hero robot: `z-index: 1`
- Hero content: `z-10`
- Navbar: već ima viši z-index

**Reduced motion:** `animate-float` već je obuhvaćen u `@media (prefers-reduced-motion: reduce)` bloku (postoji u `index.css`).

## Datoteke
- `src/index.css` — novi body background (mesh gradient) + body::before noise overlay
- `src/components/Hero.tsx` — dodavanje `animate-float` + delay na 3 postojeća bloba + novi amber blob

## Rezultat
Pozadina dobiva dubinu i suptilno gibanje: mesh boje koje "dišu" zbog plutajućih blobova, dok noise tekstura razbija ravnu glatkoću dark pozadine i daje filmski, tekstualni feel — bez utjecaja na čitljivost ili performanse.

