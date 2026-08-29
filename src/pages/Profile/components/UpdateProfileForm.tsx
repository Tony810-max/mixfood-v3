import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, User } from 'lucide-react';

interface UpdateProfileFormProps {
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  errors: Record<string, string>;
  isLoading: boolean;
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  labels: {
    title: string;
    fullName: string;
    email: string;
    phone: string;
    fullNamePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    emailNote: string;
    save: string;
    saving: string;
  };
}

export const UpdateProfileForm = ({
  formData,
  errors,
  isLoading,
  onInputChange,
  onSubmit,
  labels,
}: UpdateProfileFormProps) => {
  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200 dark:border-orange-900/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-lg">
          <User className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">{labels.title}</h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{labels.fullName}</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            placeholder={labels.fullNamePlaceholder}
            className="h-11 border-orange-200 dark:border-orange-900 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{labels.email}</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            readOnly
            placeholder={labels.emailPlaceholder}
            className="h-11 border-orange-200 dark:border-orange-900 bg-muted/50 text-muted-foreground cursor-not-allowed focus:ring-0"
          />
          <p className="text-xs text-muted-foreground">{labels.emailNote}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{labels.phone}</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            placeholder={labels.phonePlaceholder}
            className="h-11 border-orange-200 dark:border-orange-900 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        {errors.general && (
          <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            {errors.general}
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-11 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md hover:shadow-lg transition-all mt-2"
          disabled={isLoading}
        >
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? labels.saving : labels.save}
        </Button>
      </form>
    </div>
  );
};
