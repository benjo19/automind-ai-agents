import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";

const TermsOfUse = () => {
  return (
    <>
      <Helmet>
        <title>Uvjeti korištenja – Automind</title>
        <meta name="description" content="Uvjeti korištenja web stranice i usluga tvrtke FA. BE. MA TRGOVINA DOO (Automind)." />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <header className="container px-4 py-6 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <img src={logo} alt="Automind logo" className="h-8 w-auto invert" />
          </Link>
        </header>

        <main className="container px-4 pb-20 max-w-3xl">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-8">Uvjeti korištenja</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p><strong className="text-foreground">Pružatelj usluga:</strong> FA. BE. MA TRGOVINA DOO, OIB: 60898333063</p>
            <p><strong className="text-foreground">Kontakt:</strong> auto.mind.ai2025@gmail.com | 0995085933</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">1. Opće odredbe</h2>
            <p>Ovi Uvjeti korištenja reguliraju korištenje web stranice automind.hr te svih usluga koje pruža FA. BE. MA TRGOVINA DOO pod brendom Automind. Korištenjem ove web stranice prihvaćate ove uvjete u cijelosti.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">2. Opis usluga</h2>
            <p>Automind pruža usluge implementacije AI agenata (chat i voice botova), automatizacije poslovnih procesa, CRM integracija, automatskog generiranja ponuda te e-mail sekvenci. Detaljni opseg usluga definira se individualnim ugovorom s klijentom.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">3. Obveze korisnika</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Koristiti usluge u skladu sa zakonom i ovim uvjetima</li>
              <li>Pružiti točne i potpune podatke prilikom registracije ili kontakta</li>
              <li>Ne koristiti usluge za nezakonite ili štetne aktivnosti</li>
              <li>Čuvati povjerljivost pristupnih podataka</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground mt-8">4. Intelektualno vlasništvo</h2>
            <p>Sav sadržaj na web stranici (tekstovi, grafike, logotipi, softver) vlasništvo je FA. BE. MA TRGOVINA DOO ili njezinih licencora i zaštićen je zakonima o intelektualnom vlasništvu. Neovlašteno kopiranje ili distribucija nije dopuštena.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">5. Ograničenje odgovornosti</h2>
            <p>Automind ne jamči neprekidnu ili savršenu dostupnost usluga. Ne snosimo odgovornost za štetu nastalu uslijed više sile, tehničkih smetnji ili radnji trećih strana. Naša ukupna odgovornost ograničena je na iznos plaćen za usluge u zadnjih 12 mjeseci.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">6. Plaćanje i cijene</h2>
            <p>Cijene usluga definirane su individualnom ponudom ili cjenikom. Svi navedeni iznosi su u eurima (EUR). Plaćanje se vrši prema uvjetima dogovorenim u ugovoru.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">7. Raskid</h2>
            <p>Obje strane mogu raskinuti ugovor uz pisanu obavijest s otkaznim rokom od 30 dana. U slučaju kršenja uvjeta, zadržavamo pravo trenutnog prekida pružanja usluga.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">8. Mjerodavno pravo</h2>
            <p>Na ove Uvjete korištenja primjenjuje se pravo Republike Hrvatske. Za sve sporove nadležan je stvarno i mjesno nadležni sud u Republici Hrvatskoj.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">9. Izmjene uvjeta</h2>
            <p>Zadržavamo pravo izmjene ovih Uvjeta korištenja. Izmjene stupaju na snagu objavom na ovoj stranici.</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default TermsOfUse;
