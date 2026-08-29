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
import { useLogout } from "@/hooks/api/useAuth";
import { ROUTES } from "@/utils/const";
import { Calendar, ChevronDown, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

interface DesktopNavProps {
  navItems: Array<{ label: string; href: string }>;
}

const DesktopNav = ({ navItems }: DesktopNavProps) => {
  const { t } = useLanguage();
  const { user, isAuthenticated, setUser } = useAuth();
  const logoutMutation = useLogout();

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
            <Button variant="ghost" className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:bg-primary-gradient focus:bg-primary-gradient hover:text-white hover:opacity-80 transition-colors">
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
              <Link to={ROUTES.PROFILE} className="cursor-pointer hover:text-white hover:bg-primary-gradient focus:bg-transparent">
                <User className="mr-2 h-4 w-4" />
                <span>{t.profileTitle}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={ROUTES.RESERVATIONS} className="cursor-pointer hover:bg-primary-gradient focus:bg-transparent">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{t.reservationsTitle}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setUser(null);
              logoutMutation.mutate();
            }} className="cursor-pointer text-red-600 hover:text-white focus:bg-primary-gradient hover:bg-primary-gradient">
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t.headerLogout}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-3">
          <Link to={ROUTES.AUTH.LOGIN}>
            <Button variant="outline" size="sm" className="h-9 px-4 border-orange-300 dark:border-orange-700 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/50 hover:border-orange-400 font-medium transition-all">
              {t.headerSignIn}
            </Button>
          </Link>
          <Link to={ROUTES.AUTH.REGISTER}>
            <Button size="sm" className="h-9 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium shadow-sm hover:shadow-md transition-all">
              {t.headerSignUp}
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default DesktopNav;