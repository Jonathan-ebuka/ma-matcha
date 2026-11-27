import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Insider from "@/components/Insider";
import Sequence from "@/components/Sequence";
import Compare from "@/components/Compare";
import Profiles from "@/components/Profiles";
import Picker from "@/components/Picker";
import GetIt from "@/components/GetIt";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <Insider />
        <Sequence />
        <Compare />
        <Profiles />
        <Picker />
        <GetIt />
      </main>
      <Footer />
    </>
  );
}
