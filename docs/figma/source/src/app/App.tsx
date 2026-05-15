import { useEffect } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { TrustBar } from "./components/TrustBar";
import { IntentRouter } from "./components/IntentRouter";
import { Desks } from "./components/Desks";
import { Atlas } from "./components/Atlas";
import { DestinationsRail } from "./components/DestinationsRail";
import { DestinationGuide } from "./components/DestinationGuide";
import { Standard } from "./components/Standard";
import { Editorial } from "./components/Editorial";
import { StayModule } from "./components/StayModule";
import { Proof } from "./components/Proof";
import { Brief } from "./components/Brief";
import { EmailCapture } from "./components/EmailCapture";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { NovaExitIntent } from "./components/NovaExitIntent";
import { loadStay22Script } from "./lib/stay22";
import { DESTINATIONS } from "./data/destinations";

export default function App() {
  useEffect(() => {
    loadStay22Script();
  }, []);

  return (
    <div
      className="size-full bg-[#F9F7F2] text-[#1a1a1a]"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <IntentRouter />
        <Desks />
        <Atlas />
        <DestinationsRail />
        {DESTINATIONS.map((d) => (
          <DestinationGuide key={d.slug} config={d} />
        ))}
        <Standard />
        <Editorial />
        <StayModule />
        <Proof />
        <Brief />
        <EmailCapture />
        <FAQ />
      </main>
      <Footer />
      <NovaExitIntent />
    </div>
  );
}
