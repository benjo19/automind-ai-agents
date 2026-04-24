

## Cilj

Dodati dekorativnog inline SVG robota u Hero sekciji, desno-centrirano, samo na desktopu, kao suptilni vizualni element u pozadini.

## Što se mijenja

### `src/components/Hero.tsx`
- Dodaje se novi `<div>` unutar `<section>`, **prije** `Content` div-a, **poslije** glow blob div-a
- Wrapper: `hidden md:block absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 w-64 h-80 opacity-25 pointer-events-none`, `style={{ zIndex: 1 }}`, `animate-robot-float`
- Inline `<svg viewBox="0 0 200 260">` s elementima (svi stroke-only, fill-opacity ≤ 0.1):
  - **Antene**: 2 tanke `<line>` + 2 mala `<circle>` na vrhu (cyan `hsl(180 75% 55%)`)
  - **Glava**: zaobljeni `<rect>` (rx="20"), stroke indigo `hsl(245 70% 65%)`
  - **Oči**: 2 `<circle>` ispunjena pink `hsl(320 85% 65%)` s klasom `animate-pulse`
  - **Usta/vizor**: tanka `<line>` cyan
  - **Vrat**: kratki `<rect>` indigo
  - **Tijelo**: veći zaobljeni `<rect>` indigo + unutarnje mrežaste linije (3 vertikalne + 3 horizontalne `<line>` cyan, opacity 0.4)
  - **Mali središnji "core" krug** pink na sredini tijela
  - **Ruke**: 2 vertikalna `<rect>` sa strane indigo
- Z-index: blob wrapper već ima `z-0`, content `z-10`. Robot wrapper dobiva `style={{ zIndex: 1 }}` → ispod teksta, iznad glow-a ✓

### `src/index.css`
- Dodaje se novi keyframe `@keyframes robot-float` (translateY 0 → -12px → 0, 3s ease-in-out infinite)
- Helper klasa `.animate-robot-float` 
- Respect `prefers-reduced-motion` (već postoji blok — dodaje se `.animate-robot-float` u listu)

## Što ostaje netaknuto
Sav postojeći Hero copy, struktura, badges, CTA, social proof, glow blobovi, rotirajuća riječ, ostale sekcije.

## Datoteke
- `src/components/Hero.tsx` — dodaje SVG robot blok
- `src/index.css` — dodaje `robot-float` keyframe + klasa

## Rezultat
Suptilni geometrijski robot s pulsirajućim očima i blagim float-om dodaje karakter desnoj strani Hero-a na desktopu, bez ometanja čitljivosti teksta (opacity 0.25, ispod teksta) i bez utjecaja na mobilni layout.

