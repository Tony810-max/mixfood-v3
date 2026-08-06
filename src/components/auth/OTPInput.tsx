import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export const OTPInput = ({
  length = 6,
  value,
  onChange,
  disabled = false,
  error,
  className,
}: OTPInputProps) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus the first empty input or the last input if all are filled
    const firstEmptyIndex = value.length;
    if (firstEmptyIndex < length) {
      inputRefs.current[firstEmptyIndex]?.focus();
    } else {
      inputRefs.current[length - 1]?.focus();
    }
  }, [length, value.length]);

  // Clear OTP and focus first input when error occurs
  useEffect(() => {
    if (error) {
      onChange('');
      inputRefs.current[0]?.focus();
    }
  }, [error, onChange]);

  const handleChange = (index: number, newValue: string) => {
    // Only allow numbers
    const numericValue = newValue.replace(/[^0-9]/g, '');
    
    if (numericValue.length > 1) {
      // Handle paste - take the last character
      const char = numericValue.slice(-1);
      const newValueArray = value.split('');
      newValueArray[index] = char;
      onChange(newValueArray.join(''));
      
      // Move to next input
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (numericValue.length === 1) {
      const newValueArray = value.split('');
      newValueArray[index] = numericValue;
      onChange(newValueArray.join(''));
      
      // Move to next input
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      // Handle backspace
      const newValueArray = value.split('');
      newValueArray[index] = '';
      onChange(newValueArray.join(''));
      
      // Move to previous input
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
    
    if (pastedData.length > 0) {
      const newValueArray = value.split('');
      for (let i = 0; i < Math.min(pastedData.length, length); i++) {
        newValueArray[i] = pastedData[i];
      }
      onChange(newValueArray.join(''));
      
      // Focus the next empty input or the last input
      const nextFocusIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[nextFocusIndex]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-2 justify-center">
        {Array.from({ length }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="relative"
          >
            <Input
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value[index] || ''}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={() => handleFocus(index)}
              disabled={disabled}
              className={cn(
                "w-14 h-14 text-center text-4xl font-bold",
                "border-orange-200 dark:border-orange-900",
                "focus:border-orange-400 focus:ring-orange-400",
                "transition-all duration-200",
                error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                focusedIndex === index && "ring-2 ring-orange-400/50 scale-105",
                disabled && "opacity-50 cursor-not-allowed",
                value[index] && "text-orange-600 dark:text-orange-400"
              )}
            />
          </motion.div>
        ))}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 text-center"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
