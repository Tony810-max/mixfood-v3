import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export const AuthCard = ({ children, className }: AuthCardProps) => {
  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
      className
    )}>
      <div className="min-h-[calc(100vh-72px)] pt-[72px] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};
