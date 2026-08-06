import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface AuthFormLayoutProps {
  children: ReactNode;
  className?: string;
}

export const AuthFormLayout = ({ children, className }: AuthFormLayoutProps) => {
  return (
    <div className={cn(
      "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200 dark:border-orange-900/50 p-8",
      className
    )}>
      {children}
    </div>
  );
};
