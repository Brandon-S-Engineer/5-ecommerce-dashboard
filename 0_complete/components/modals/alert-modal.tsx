'use client';

import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

// Props interface defining expected inputs for the AlertModal component.
interface AlertModalProps {
  isOpen: boolean; // Modal visibility.
  onClose: () => void; // Function to close the modal.
  onConfirm: () => void; // Function to confirm action in the modal.
  loading: boolean; // Loading state to disable buttons.
}

// Functional component AlertModal.
export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onConfirm, loading }) => {
  const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted.

  useEffect(() => {
    setIsMounted(true); // Set mounted state to true after initial render.
  }, []); // Empty array means this runs only once on component mount.

  if (!isMounted) return null; // Return nothing if the component is not mounted yet.

  return (
    <Modal
      title='Are you sure ?' // Modal title.
      description='This action cannot be undone.' // Modal description.
      isOpen={isOpen} // Control the modal's open state.
      onClose={onClose} // Function to close the modal.
    >
      <div className='pt-6 space-x-2 flex items-center justify-end'>
        <Button
          disabled={loading} // Disable button if loading is true.
          variant='outline' // Apply 'outline' styling to the button.
          onClick={onClose} // Close the modal when clicked.
        >
          Cancel
        </Button>
        <Button
          disabled={loading} // Disable button if loading is true.
          variant='destructive' // Apply 'destructive' styling to the button.
          onClick={onConfirm} // Confirm the action when clicked.
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};

// 'use client';

// import { useEffect, useState } from 'react';
// import { Modal } from '@/components/ui/modal';
// import { Button } from '@/components/ui/button';

// interface AlertModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   loading: boolean;
// }

// export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onConfirm, loading }) => {
//   const [isMounted, setIsMounted] = useState(false);
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) return null;

//   return (
//     <Modal
//       title='Are you sure ?'
//       description='This action cannot be undone.'
//       isOpen={isOpen}
//       onClose={onClose}>
//       <div className='pt-6 space-x-2 flex items-center justify-end'>
//         <Button
//           disabled={loading}
//           variant='outline'
//           onClick={onClose}>
//           Cancel
//         </Button>
//         <Button
//           disabled={loading}
//           variant='destructive'
//           onClick={onConfirm}>
//           Continue
//         </Button>
//       </div>
//     </Modal>
//   );
// };
