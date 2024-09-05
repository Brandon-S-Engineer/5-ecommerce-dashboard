'use client';

import { useEffect, useState } from 'react';
import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void; // Callback function
  onRemove: (value: string) => void;
  value: string[]; // Array of strings
}

const ImageUpload: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    //? On successful image upload, update the list of images with the new uploaded image URL.
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null; // Prevent hydration errors
  }

  return (
    <div>
      <div className='mb-4 flex items-center gap-4'>
        {/* Iterate over Images */}
        {value.map((url) => (
          <div
            key={url}
            className='relative w-[200px] h-[200px] rounded-md overfow-hidden'>
            <div className='z-10 absolute top-2 right-2'>
              <Button
                type='button'
                onClick={() => onRemove(url)}
                variant='destructive'
                size='icon'>
                <Trash className='h-4 w-4' />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
