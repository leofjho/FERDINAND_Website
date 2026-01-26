"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white text-black cursor-none">
      <CustomCursor isPinkBackground={false} variant="square" />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 md:px-12 py-6 z-50 bg-white">
        <Link
          href="/"
          className="text-xl md:text-2xl font-light tracking-[0.2em] md:tracking-[0.3em] uppercase text-black hover:opacity-70 transition-opacity"
        >
          FERDINAND
        </Link>
        <Link
          href="/"
          className="text-sm tracking-wider text-black/60 hover:text-black transition-colors"
        >
          Zurück
        </Link>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 md:px-12 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-light tracking-wide mb-16">
            Impressum
          </h1>

          <div className="space-y-12 text-black/80">
            {/* Angaben gemäß § 5 TMG */}
            <section>
              <h2 className="text-lg font-medium tracking-wide mb-4 text-black">
                Angaben gemäß § 5 TMG
              </h2>
              <p className="leading-relaxed">
                Ferdinand Mustermann<br />
                FERDINAND Studio<br />
                Musterstraße 123<br />
                12345 Musterstadt
              </p>
            </section>

            {/* Kontakt */}
            <section>
              <h2 className="text-lg font-medium tracking-wide mb-4 text-black">
                Kontakt
              </h2>
              <p className="leading-relaxed">
                Telefon: +49 (0) 123 456789<br />
                E-Mail: info@ferdinand-studio.de
              </p>
            </section>

            {/* Umsatzsteuer-ID */}
            <section>
              <h2 className="text-lg font-medium tracking-wide mb-4 text-black">
                Umsatzsteuer-ID
              </h2>
              <p className="leading-relaxed">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                DE 123 456 789
              </p>
            </section>

            {/* Verantwortlich für den Inhalt */}
            <section>
              <h2 className="text-lg font-medium tracking-wide mb-4 text-black">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h2>
              <p className="leading-relaxed">
                Ferdinand Mustermann<br />
                Musterstraße 123<br />
                12345 Musterstadt
              </p>
            </section>

            {/* Streitschlichtung */}
            <section>
              <h2 className="text-lg font-medium tracking-wide mb-4 text-black">
                EU-Streitschlichtung
              </h2>
              <p className="leading-relaxed">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-70 transition-opacity"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                <br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            {/* Verbraucherstreitbeilegung */}
            <section>
              <h2 className="text-lg font-medium tracking-wide mb-4 text-black">
                Verbraucherstreitbeilegung/Universalschlichtungsstelle
              </h2>
              <p className="leading-relaxed">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            {/* Haftung für Inhalte */}
            <section>
              <h2 className="text-lg font-medium tracking-wide mb-4 text-black">
                Haftung für Inhalte
              </h2>
              <p className="leading-relaxed">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
                forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p className="leading-relaxed mt-4">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
                Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
                Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
                Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </section>

            {/* Haftung für Links */}
            <section>
              <h2 className="text-lg font-medium tracking-wide mb-4 text-black">
                Haftung für Links
              </h2>
              <p className="leading-relaxed">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
                verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
                Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
              <p className="leading-relaxed mt-4">
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
                einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
                Links umgehend entfernen.
              </p>
            </section>

            {/* Urheberrecht */}
            <section>
              <h2 className="text-lg font-medium tracking-wide mb-4 text-black">
                Urheberrecht
              </h2>
              <p className="leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
              <p className="leading-relaxed mt-4">
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
                Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem
                auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
                Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 py-8 px-6 md:px-12">
        <div className="max-w-3xl mx-auto flex justify-between items-center text-sm text-black/50">
          <Link href="/" className="hover:text-black transition-colors">
            Zurück zur Startseite
          </Link>
          <p>&copy; 2025 FERDINAND Studio</p>
        </div>
      </footer>
    </div>
  );
}
