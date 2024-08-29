'use client';

import { Alert } from '@/components/ui/alert';

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

// Keys: 'public' | 'admin' - Value: string
const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
};

// const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
const variantMap: Record<ApiAlertProps['variant'], string> = {
  public: 'secondary',
  admin: 'destructive',
};

export const ApiAlert: React.FC<ApiAlertProps> = ({ title, description, variant = 'public' }) => {
  return <Alert>ApiAlert</Alert>;
};
