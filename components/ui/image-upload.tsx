'use client';

import { useEffect, useState } from 'react';

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
    onChange(result.info.secure_url); //? On successful image upload, update the list of images with the new uploaded image URL.
  };

  if (!isMounted) {
    return null; // Prevent hydration errors
  }

  return <div>ImageUpload</div>;
};

export default ImageUpload;
