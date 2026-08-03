import LanguageToggle from "@/components/navigation/LanguageToggle";
import ReserveButton from "@/components/navigation/ReserveButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ROUTES } from "@/utils/const";
import { ChevronDown, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

interface DesktopNavProps {
  navItems: Array<{ label: string; href: string }>;
}

const DesktopNav = ({ navItems }: DesktopNavProps) => {
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="hidden md:flex items-center gap-8">
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="font-body text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
        >
          {item.label}
        </a>
      ))}

      <LanguageToggle variant="desktop" />
      <ReserveButton content={t.reserveTable} />
      
      {/* Auth Section */}
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white hover:opacity-80 transition-colors">
              <User className="w-4 h-4" />
              <span>{user?.name || t.headerUser}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 ">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || t.headerUser}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={ROUTES.PROFILE} className="cursor-pointer hover:bg-primary-gradient">
                <User className="mr-2 h-4 w-4" />
                <span>{t.profileTitle}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t.headerLogout}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-4">
          <Link to={ROUTES.AUTH.LOGIN}>
            <button className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              {t.headerSignIn}
            </button>
          </Link>
          <Link to={ROUTES.AUTH.REGISTER}>
            <button className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              {t.headerSignUp}
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default DesktopNav;