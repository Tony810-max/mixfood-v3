import { LanguageProvider } from "@/contexts/LanguageContext";

import MenuContent from "./components/Menucontent";

const MenuPage = () => (
  <LanguageProvider>
    <MenuContent />
  </LanguageProvider>
);

export default MenuPage;
