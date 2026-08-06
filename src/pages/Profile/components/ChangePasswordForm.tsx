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
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200 dark:border-orange-900/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-lg">
          <Lock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Change Password</h2>
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
            className={`border-orange-200 dark:border-orange-900 focus:border-orange-500 focus:ring-orange-500 ${errors.currentPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
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
            className={`border-orange-200 dark:border-orange-900 focus:border-orange-500 focus:ring-orange-500 ${errors.newPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
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
            className={`border-orange-200 dark:border-orange-900 focus:border-orange-500 focus:ring-orange-500 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
          disabled={isLoading}
        >
          <Lock className="h-4 w-4 mr-2" />
          {isLoading ? labels.saving : labels.save}
        </Button>
      </form>
    </div>
  );
};
