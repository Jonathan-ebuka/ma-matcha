import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Insider from "@/components/Insider";
import DrinkBuild from "@/components/DrinkBuild";
import Compare from "@/components/Compare";
import Picker from "@/components/Picker";
import Food from "@/components/Food";
import Profiles from "@/components/Profiles";
import TakeHome from "@/components/TakeHome";
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
        <DrinkBuild />
        <Compare />
        <Picker />
        <Food />
        <Profiles />
        <TakeHome />
        <GetIt />
      </main>
      <Footer />
    </>
  );
}
