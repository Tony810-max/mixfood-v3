import { Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-primary">
              Mix Food
            </h3>
            <p className="text-sm text-background/60 leading-relaxed max-w-[40ch]">
              Authentic Thai cuisine in the heart of Da Nang. Experience the
              balance of flavors.
            </p>
            <a
              href="https://www.facebook.com/mixfoodamthucthai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-background/50 hover:text-primary transition-colors"
            >
              <Facebook size={20} />
              <span className="text-sm">Facebook</span>
            </a>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-background/90">
              Links
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: t.home, href: "/" },
                { label: t.menu, href: "/menu" },
                { label: t.reserveTable, href: "/" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-background/50 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-background/90">
              {t.location}
            </h4>
            <p className="text-sm text-background/50">{t.address}</p>
            <p className="text-sm text-background/50">{t.phone}</p>
            <p className="text-sm text-background/50">{t.hoursValue}</p>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center">
          <p className="text-xs text-background/40">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
