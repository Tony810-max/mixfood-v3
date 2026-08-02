import About from "@/components/About";
import BestSellers from "@/components/BestSellers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Location from "@/components/Location";
import Reviews from "@/components/Reviews";
import ThaiDishHighlight from "@/components/ThaiDishHighlight";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <Hero />
        <ThaiDishHighlight />
        <About />
        {/* <BestSellers /> */}
        <Reviews />
        <Location />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
