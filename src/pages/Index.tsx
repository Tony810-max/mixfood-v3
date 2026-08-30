import Location from "@/components/common/Location";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Reviews from "@/components/sections/Reviews";
import ThaiDishHighlight from "@/components/sections/ThaiDishHighlight";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <Hero />
        <ThaiDishHighlight />
        <About />
        {/* <BestSellers />  */}
        <Reviews />
        <Location />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
