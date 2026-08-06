import { Mail, Key, Lock } from 'lucide-react';

interface Step {
  id: number;
  label: string;
  icon: React.ReactNode;
}

export const FORGOT_PASSWORD_STEPS: Step[] = [
  {
    id: 1,
    label: 'Email',
    icon: <Mail className="w-6 h-6" />,
  },
  {
    id: 2,
    label: 'OTP',
    icon: <Key className="w-6 h-6" />,
  },
  {
    id: 3,
    label: 'Mật khẩu',
    icon: <Lock className="w-6 h-6" />,
  },
];
