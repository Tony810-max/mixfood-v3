import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ThaiDishHighlight from "@/components/ThaiDishHighlight";
import BestSellers from "@/components/BestSellers";
import Reviews from "@/components/Reviews";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <Hero />
        <ThaiDishHighlight />
        <About />
        <BestSellers />
        <Reviews />
        <Location />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
