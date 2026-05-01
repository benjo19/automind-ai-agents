Provjerio sam kod: na stranici nema cron/schedule automatike koja bi sama u 4-5 ujutro slala kontakt formu. Webhook se trenutno šalje iz tri mjesta:

1. Kontakt/demo forma (`source: "lovable"`) — samo kad netko ručno submit-a formu.
2. Newsletter forma u footeru (`source: "newsletter"`) — šalje samo email, bez imena/telefona/tvrtke.
3. Chatbot Ana (`source: "ai-chat-widget"`) — šalje lead kad AI alat `submit_lead` procijeni da ima podatke.

Najvjerojatniji razlog za “kontakt forma bez info o kupcu”:
- Footer newsletter koristi isti Make webhook kao kontakt forma. Ako Make scenarij sve dolazne zahtjeve prikazuje kao “kontakt formu”, newsletter prijava će izgledati kao prazna kontakt forma jer sadrži samo `email`, `source: newsletter`, `submitted_at`, `page_url`.
- Druga mogućnost je bot/spam submit prema javnom webhook URL-u ili frontend formama.
- Chatbot može poslati lead samo ako model pozove `submit_lead`; trenutno alat traži `name`, `email`, `interest`, `notes`, ali nema dodatnu server-side provjeru kvalitete prije slanja na webhook.

Predlažem da napravim zaštitu i jasnije označavanje payload-a:

1. Odvojiti vrste webhook prijava
- Demo forma: slati `type: "demo_request"` i `source: "demo-form"`.
- Newsletter: slati `type: "newsletter_signup"` i zadržati samo newsletter polja.
- Chatbot: slati `type: "chat_lead"`.

2. Spriječiti prazne / bot prijave iz kontakt forme
- Dodati skriveni honeypot field koji normalni korisnici ne vide.
- Ako je honeypot popunjen, ne šalje se webhook.
- Dodati `submitted_after_ms` / minimalno vrijeme popunjavanja, da se odbiju instant bot submitovi.

3. Validirati chatbot prije slanja webhooka
- U backend funkciji prije slanja na Make provjeriti da lead ima stvaran email i barem ime + interes/notes.
- Ako AI pokuša poslati nepotpun lead, ne slati webhook nego vratiti poruku korisniku da ostavi email/ime.
- Dodati `client_key` i transcript u payload radi lakšeg praćenja odakle je došlo.

4. Dodati debug polja za Make scenarij
- Svaki webhook payload će imati `type`, `source`, `page_url`, `submitted_at`, `language` i relevantne podatke.
- Tako ćeš u Make-u moći napraviti filtere:
  - `type = demo_request` za kontakt/demo formu
  - `type = newsletter_signup` za newsletter
  - `type = chat_lead` za chatbot

5. Opcionalno: premjestiti direktno slanje forme kroz backend funkciju
- Trenutno demo forma i newsletter šalju direktno na Make webhook iz browsera, što znači da je webhook URL javno vidljiv.
- Sigurnija verzija je da frontend šalje na Lovable Cloud backend funkciju, a backend tek onda šalje na Make. Time se Make webhook URL makne iz browsera i smanjuje spam.
- Ovo je najbolja zaštita, ali traži malo veći refactor.

Tehnički fajlovi za izmjenu:
- `src/components/DemoForm.tsx`
- `src/components/Footer.tsx`
- `supabase/functions/chat-lead/index.ts`
- Po potrebi nova backend funkcija za centralno slanje leadova/newslettera na webhook

Preporučena izvedba: napraviti korake 1-4 odmah, a korak 5 ako želiš da webhook URL više ne bude javno vidljiv u kodu browsera.