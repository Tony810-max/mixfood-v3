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
        <Link
          key={item.href}
          to={item.href}
          className="font-body text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
        >
          {item.label}
        </Link>
      ))}

      <LanguageToggle variant="desktop" />
      <ReserveButton content={t.reserveTable} />
      
      {/* Auth Section */}
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="primary-action-on-hover flex h-10 items-center gap-2 rounded-xl border border-transparent px-4 text-sm font-semibold text-foreground/80 transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:text-primary-foreground hover:shadow-md data-[state=open]:border-primary/20 data-[state=open]:text-primary-foreground">
              <User className="w-4 h-4" />
              <span>{user?.name || t.headerUser}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 rounded-2xl border-border/80 bg-popover p-1.5 shadow-lg">
            <DropdownMenuLabel className="rounded-xl bg-muted/60 px-3 py-2.5 font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || t.headerUser}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="primary-action-on-highlight rounded-xl transition-colors focus:text-primary-foreground">
              <Link to={ROUTES.PROFILE} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>{t.profileTitle}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="primary-action-on-highlight rounded-xl transition-colors focus:text-primary-foreground">
              <Link to={ROUTES.RESERVATIONS} className="cursor-pointer">
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
            }} className="primary-action-on-highlight cursor-pointer rounded-xl text-destructive transition-colors hover:text-primary-foreground focus:text-primary-foreground">
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
