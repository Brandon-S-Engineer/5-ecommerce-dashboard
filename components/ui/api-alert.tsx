'use client';

import { Server } from 'lucide-react';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

//? Variant 1 // Text Label
const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
};

//? Variant 2 // Badge Style
const variantMap: Record<ApiAlertProps['variant'], string> = {
  public: 'secondary',
  admin: 'destructive',
};

export const ApiAlert: React.FC<ApiAlertProps> = ({ title, description, variant = 'public' }) => {
  return (
    <Alert>
      <Server className='h-4 w-4' /> {/* Icon */}
      <AlertTitle className='flex items-center gap-x-2'>
        {title}
        <Badge>{textMap[variant]}</Badge>
      </AlertTitle>
    </Alert>
  );
};
