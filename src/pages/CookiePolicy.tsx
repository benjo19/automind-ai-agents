import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";

const CookiePolicy = () => {
  return (
    <>
      <Helmet>
        <title>Kolačići – Automind</title>
        <meta name="description" content="Pravila o kolačićima web stranice Automind. Saznajte koje kolačiće koristimo i kako upravljati postavkama." />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <header className="container px-4 py-6 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <img src={logo} alt="Automind logo" className="h-8 w-auto invert" />
          </Link>
        </header>

        <main className="container px-4 pb-20 max-w-3xl">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-8">Pravila o kolačićima</h1>

          <div className="prose max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p><strong className="text-foreground">Voditelj obrade:</strong> FA. BE. MA TRGOVINA DOO, OIB: 60898333063</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">1. Što su kolačići?</h2>
            <p>Kolačići (cookies) su male tekstualne datoteke koje se pohranjuju na vašem uređaju kada posjetite web stranicu. Koriste se za pamćenje vaših preferencija, poboljšanje korisničkog iskustva i analizu prometa na stranici.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">2. Vrste kolačića koje koristimo</h2>

            <h3 className="text-lg font-medium text-foreground mt-6">Nužni kolačići</h3>
            <p>Ovi kolačići su neophodni za funkcioniranje web stranice. Bez njih stranica ne može pravilno raditi. Ne zahtijevaju vašu suglasnost.</p>

            <h3 className="text-lg font-medium text-foreground mt-6">Funkcionalni kolačići</h3>
            <p>Omogućuju napredne funkcionalnosti i personalizaciju, poput pamćenja vaših postavki i preferencija.</p>

            <h3 className="text-lg font-medium text-foreground mt-6">Analitički kolačići</h3>
            <p>Pomažu nam razumjeti kako posjetitelji koriste web stranicu prikupljajući anonimne statističke podatke. Koristimo ih za poboljšanje sadržaja i funkcionalnosti.</p>

            <h3 className="text-lg font-medium text-foreground mt-6">Marketinški kolačići</h3>
            <p>Koriste se za praćenje posjetitelja na web stranicama s ciljem prikazivanja relevantnih oglasa. Postavljaju se samo uz vašu izričitu suglasnost.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">3. Upravljanje kolačićima</h2>
            <p>Možete upravljati kolačićima putem postavki preglednika. Većina preglednika omogućuje blokiranje ili brisanje kolačića. Imajte na umu da blokiranje kolačića može utjecati na funkcionalnost web stranice.</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong className="text-foreground">Chrome:</strong> Postavke → Privatnost i sigurnost → Kolačići</li>
              <li><strong className="text-foreground">Firefox:</strong> Postavke → Privatnost i sigurnost</li>
              <li><strong className="text-foreground">Safari:</strong> Postavke → Privatnost</li>
              <li><strong className="text-foreground">Edge:</strong> Postavke → Kolačići i dozvole web-mjesta</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground mt-8">4. Kolačići trećih strana</h2>
            <p>Na našoj stranici mogu biti prisutni kolačići trećih strana (npr. analitički alati). Ovi kolačići podliježu pravilima privatnosti dotičnih trećih strana.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">5. Izmjene pravila</h2>
            <p>Zadržavamo pravo izmjene ovih Pravila o kolačićima. Sve izmjene bit će objavljene na ovoj stranici.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">6. Kontakt</h2>
            <p>Za pitanja o kolačićima kontaktirajte nas na auto.mind.ai2025@gmail.com.</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default CookiePolicy;
