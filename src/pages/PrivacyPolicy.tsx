import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Politika privatnosti – Automind</title>
        <meta name="description" content="Politika privatnosti tvrtke FA. BE. MA TRGOVINA DOO (Automind). Saznajte kako prikupljamo, koristimo i štitimo vaše osobne podatke." />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <header className="container px-4 py-6 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <img src={logo} alt="Automind logo" className="h-8 w-auto invert" />
          </Link>
        </header>

        <main className="container px-4 pb-20 max-w-3xl">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-8">Politika privatnosti</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p><strong className="text-foreground">Voditelj obrade:</strong> FA. BE. MA TRGOVINA DOO, OIB: 60898333063</p>
            <p><strong className="text-foreground">Kontakt e-mail:</strong> auto.mind.ai2025@gmail.com</p>
            <p><strong className="text-foreground">Datum stupanja na snagu:</strong> 1. siječnja 2025.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">1. Koje podatke prikupljamo</h2>
            <p>Prikupljamo osobne podatke koje nam dobrovoljno dostavite putem kontakt forme: ime i prezime, e-mail adresa, telefonski broj, naziv tvrtke, djelatnost, poruka i ostali podaci koje unesete. Automatski prikupljamo tehničke podatke poput IP adrese, vrste preglednika i operacijskog sustava.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">2. Svrha obrade podataka</h2>
            <p>Vaše osobne podatke obrađujemo u sljedeće svrhe:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Odgovaranje na vaše upite i zahtjeve za demo</li>
              <li>Slanje ponuda i informacija o našim uslugama</li>
              <li>Poboljšanje korisničkog iskustva na web stranici</li>
              <li>Slanje newslettera (uz vašu izričitu suglasnost)</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground mt-8">3. Pravni temelj obrade</h2>
            <p>Obrada se temelji na vašoj privoli (čl. 6. st. 1. t. a) GDPR-a) te na legitimnom interesu voditelja obrade za pružanje traženih usluga (čl. 6. st. 1. t. f) GDPR-a).</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">4. Dijeljenje podataka</h2>
            <p>Vaše podatke ne prodajemo trećim stranama. Podatke možemo dijeliti s pouzdanim pružateljima usluga koji nam pomažu u poslovanju (hosting, e-mail servisi, CRM alati), a koji su obvezani ugovorom o obradi podataka.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">5. Rok čuvanja podataka</h2>
            <p>Vaše osobne podatke čuvamo onoliko dugo koliko je potrebno za ostvarivanje svrhe u koju su prikupljeni, ili dok ne povučete privolu. Podatke čuvamo najdulje 3 godine od zadnjeg kontakta.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">6. Vaša prava</h2>
            <p>Imate pravo na pristup, ispravak, brisanje, ograničenje obrade, prenosivost podataka i prigovor na obradu. Za ostvarivanje prava kontaktirajte nas na auto.mind.ai2025@gmail.com. Imate pravo podnijeti pritužbu Agenciji za zaštitu osobnih podataka (AZOP).</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">7. Sigurnost podataka</h2>
            <p>Primjenjujemo odgovarajuće tehničke i organizacijske mjere za zaštitu vaših osobnih podataka od neovlaštenog pristupa, gubitka ili zlouporabe.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">8. Izmjene politike</h2>
            <p>Zadržavamo pravo izmjene ove Politike privatnosti. Sve izmjene bit će objavljene na ovoj stranici s ažuriranim datumom stupanja na snagu.</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default PrivacyPolicy;
