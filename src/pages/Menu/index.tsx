import { LanguageProvider } from "@/contexts/LanguageContext";

import MenuContent from "./components/Menu/Menucontent";

const MenuPage = () => (
  <LanguageProvider>
    <MenuContent />
  </LanguageProvider>
);

export default MenuPage;
