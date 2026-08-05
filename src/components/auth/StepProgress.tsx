import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  label: string;
  icon: React.ReactNode;
}

interface StepProgressProps {
  currentStep: number;
  steps: Step[];
  className?: string;
}

export const StepProgress = ({ currentStep, steps, className }: StepProgressProps) => {
  return (
    <div className={cn("w-full mb-8", className)}>
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 rounded-full" />
        <motion.div
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 -translate-y-1/2 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = index + 1 < currentStep;
          const isCurrent = index + 1 === currentStep;
          const isPending = index + 1 > currentStep;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  isCompleted && "bg-gradient-to-r from-orange-500 to-amber-500 border-orange-500 text-white shadow-lg",
                  isCurrent && "bg-white dark:bg-slate-800 border-orange-500 text-orange-500 shadow-md scale-110",
                  isPending && "bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600 text-gray-400"
                )}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" />
                ) : (
                  step.icon
                )}
              </motion.div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={cn(
                  "mt-2 text-xs font-medium whitespace-nowrap",
                  isCurrent && "text-orange-600 dark:text-orange-400",
                  isCompleted && "text-orange-600 dark:text-orange-400",
                  isPending && "text-gray-400"
                )}
              >
                {step.label}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
