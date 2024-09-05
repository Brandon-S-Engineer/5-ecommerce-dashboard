'use client';

import { CldUploadWidget } from 'next-cloudinary'; // Cloudinary widget for image uploads
import { useEffect, useState } from 'react'; // React hooks for state and side effects

import { Button } from '@/components/ui/button'; // Custom Button component
import Image from 'next/image'; // Next.js Image component for optimized image rendering
import { ImagePlus, Trash } from 'lucide-react'; // Icons for UI elements

interface ImageUploadProps {
  disabled?: boolean; // Optional prop to disable the upload button
  onChange: (value: string) => void; // Callback function when an image is uploaded
  onRemove: (value: string) => void; // Callback function when an image is removed
  value: string[]; // Array of image URLs
}

const ImageUpload: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {
  const [isMounted, setIsMounted] = useState(false); // State to track if the component is mounted

  useEffect(() => {
    setIsMounted(true); // Set mounted state to true after initial render
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url); // Update images list with the uploaded image URL
  };

  if (!isMounted) {
    return null; // Avoid rendering the component until it's mounted to prevent hydration errors
  }

  return (
    <div>
      <div className='mb-4 flex items-center gap-4'>
        {value.map((url) => (
          <div
            key={url}
            className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
            <div className='z-10 absolute top-2 right-2'>
              <Button
                type='button'
                onClick={() => onRemove(url)} // Trigger image removal
                variant='destructive'
                size='sm'>
                <Trash className='h-4 w-4' /> {/* Trash icon for delete button */}
              </Button>
            </div>
            <Image
              fill
              className='object-cover'
              alt='Image'
              src={url} // Render the image using Next.js Image component
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset='zsbnfecj'>
        {({ open }) => {
          const onClick = () => {
            open(); // Open Cloudinary upload widget
          };

          return (
            <Button
              type='button'
              disabled={disabled}
              variant='secondary'
              onClick={onClick}>
              <ImagePlus className='h-4 w-4 mr-2' /> {/* Icon for the upload button */}
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;

// 'use client';

// import { CldUploadWidget } from 'next-cloudinary';
// import { useEffect, useState } from 'react';

// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import { ImagePlus, Trash } from 'lucide-react';

// interface ImageUploadProps {
//   disabled?: boolean;
//   onChange: (value: string) => void;
//   onRemove: (value: string) => void;
//   value: string[];
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {
//   // to prevent hydration error
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const onUpload = (result: any) => {
//     onChange(result.info.secure_url);
//   };

//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <div>
//       <div className='mb-4 flex items-center gap-4'>
//         {value.map((url) => (
//           <div
//             key={url}
//             className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
//             <div className='z-10 absolute top-2 right-2'>
//               <Button
//                 type='button'
//                 onClick={() => onRemove(url)}
//                 variant='destructive'
//                 size='sm'>
//                 <Trash className='h-4 w-4' />
//               </Button>
//             </div>
//             <Image
//               fill
//               className='object-cover'
//               alt='Image'
//               src={url}
//             />
//           </div>
//         ))}
//       </div>
//       <CldUploadWidget
//         onUpload={onUpload}
//         uploadPreset='zsbnfecj'>
//         {({ open }) => {
//           const onClick = () => {
//             open();
//           };

//           return (
//             <Button
//               type='button'
//               disabled={disabled}
//               variant='secondary'
//               onClick={onClick}>
//               <ImagePlus className='h-4 w-4 mr-2' />
//               Upload an Image
//             </Button>
//           );
//         }}
//       </CldUploadWidget>
//     </div>
//   );
// };

// export default ImageUpload;
