import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type ChangePasswordFormData } from '@/lib/validation';
import { Lock } from 'lucide-react';

interface ChangePasswordFormProps {
  formData: ChangePasswordFormData;
  errors: Partial<Record<keyof ChangePasswordFormData, string>>;
  isLoading: boolean;
  onInputChange: (field: keyof ChangePasswordFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  labels: {
    title: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    currentPasswordPlaceholder: string;
    newPasswordPlaceholder: string;
    confirmPasswordPlaceholder: string;
    save: string;
    saving: string;
  };
}

export const ChangePasswordForm = ({
  formData,
  errors,
  isLoading,
  onInputChange,
  onSubmit,
  labels,
}: ChangePasswordFormProps) => {
  return (
    <div className="rounded-2xl border border-primary/25 bg-card/95 p-6 shadow-layered backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-lg bg-primary/10 p-2">
          <Lock className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">{labels.title}</h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">{labels.currentPassword}</Label>
          <Input
            id="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={(e) => onInputChange('currentPassword', e.target.value)}
            placeholder={labels.currentPasswordPlaceholder}
            className={`h-11 border-primary/25 focus:border-primary focus:ring-primary ${errors.currentPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.currentPassword && <p className="text-sm text-red-500">{errors.currentPassword}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">{labels.newPassword}</Label>
          <Input
            id="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={(e) => onInputChange('newPassword', e.target.value)}
            placeholder={labels.newPasswordPlaceholder}
            className={`h-11 border-primary/25 focus:border-primary focus:ring-primary ${errors.newPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.newPassword && <p className="text-sm text-red-500">{errors.newPassword}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">{labels.confirmPassword}</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => onInputChange('confirmPassword', e.target.value)}
            placeholder={labels.confirmPasswordPlaceholder}
            className={`h-11 border-primary/25 focus:border-primary focus:ring-primary ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
        </div>

        <Button
          type="submit"
          className="mt-2 h-11 w-full"
          disabled={isLoading}
        >
          <Lock className="h-4 w-4 mr-2" />
          {isLoading ? labels.saving : labels.save}
        </Button>
      </form>
    </div>
  );
};
