import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export const AuthHeader = ({ title, subtitle, icon }: AuthHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      {icon && (
        <div className="mb-6">
          {icon}
        </div>
      )}
      <h1 className="text-3xl font-bold text-foreground mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-muted-foreground">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
