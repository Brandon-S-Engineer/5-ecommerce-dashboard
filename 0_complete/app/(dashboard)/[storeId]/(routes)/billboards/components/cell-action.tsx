'use client';

import { Button } from '@/components/ui/button'; // Importing custom Button component
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'; // Importing Dropdown components
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'; // Icons from Lucide React library
import { BillboardColumn } from './columns'; // Importing interface for props
import toast from 'react-hot-toast'; // Notification library for showing toasts
import { useParams, useRouter } from 'next/navigation'; // Next.js hooks for navigation and route parameters
import { useState } from 'react'; // React hook for managing state
import axios from 'axios'; // HTTP client for making requests
import { AlertModal } from '@/components/modals/alert-modal'; // Importing a modal component for alerts

interface CellActionProps {
  data: BillboardColumn; // Interface defining props for the component
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter(); // Hook for navigating and refreshing routes
  const params = useParams(); // Hook to access route parameters

  const [loading, setLoading] = useState(false); // State for loading status
  const [open, setOpen] = useState(false); // State to control modal visibility

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id); // Copies the id to clipboard
    toast.success('Billboard Id copied to clipboard.'); // Shows a success toast
  };

  const onDelete = async () => {
    try {
      setLoading(true); // Sets loading to true when delete action starts
      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`); // Sends a delete request to the API
      router.refresh(); // Refreshes the current route
      toast.success('Billboard deleted successfully'); // Shows success message on deletion
    } catch (error) {
      toast.error('Make sure you removed all categories using this billboard first.'); // Error message if deletion fails
    } finally {
      setLoading(false); // Resets loading state
      setOpen(false); // Closes the modal
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open} // Controls modal visibility
        onClose={() => setOpen(false)} // Closes the modal
        onConfirm={onDelete} // Executes deletion on confirm
        loading={loading} // Indicates loading state
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='h-8 w-8 p-0'>
            <span className='sr-only'>Open Menu</span> {/* Accessible text */}
            <MoreHorizontal className='h-4 w-4' /> {/* Menu icon */}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className='mr-2 h-4 w-4' /> {/* Copy icon */}
            Copy Id
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}>
            <Edit className='mr-2 h-4 w-4' /> {/* Edit icon */}
            Update
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className='mr-2 h-4 w-4' /> {/* Delete icon */}
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

// 'use client';

// import { Button } from '@/components/ui/button';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
// import { BillboardColumn } from './columns';
// import toast from 'react-hot-toast';
// import { useParams, useRouter } from 'next/navigation';
// import { useState } from 'react';
// import axios from 'axios';
// import { AlertModal } from '@/components/modals/alert-modal';

// interface CellActionProps {
//   data: BillboardColumn;
// }

// export const CellAction: React.FC<CellActionProps> = ({ data }) => {
//   const router = useRouter();
//   const params = useParams();

//   // loading state and modal state
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);

//   const onCopy = (id: string) => {
//     navigator.clipboard.writeText(id);
//     toast.success('Billboard Id copied to clipboard.');
//   };

//   const onDelete = async () => {
//     try {
//       setLoading(true);
//       // Delete store
//       await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
//       router.refresh();
//       toast.success('Billboard deleted successfully');
//     } catch (error) {
//       toast.error('Make sure you removed all categories using this billboard first. ');
//     } finally {
//       setLoading(false);
//       setOpen(false);
//     }
//   };
//   return (
//     <>
//       <AlertModal
//         isOpen={open}
//         onClose={() => setOpen(false)}
//         onConfirm={onDelete}
//         loading={loading}
//       />
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant='ghost'
//             className='h-8 w-8 p-0'>
//             <span className='sr-only'>Open Menu</span>
//             <MoreHorizontal className='h-4 w-4' />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align='end'>
//           <DropdownMenuLabel>Actions</DropdownMenuLabel>
//           <DropdownMenuItem onClick={() => onCopy(data.id)}>
//             <Copy className='mr-2 h-4 w-4' />
//             Copy Id
//           </DropdownMenuItem>

//           {/* Update */}
//           <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}>
//             <Edit className='mr-2 h-4 w-4' />
//             Update
//           </DropdownMenuItem>

//           <DropdownMenuItem onClick={() => setOpen(true)}>
//             <Trash className='mr-2 h-4 w-4' />
//             Delete
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </>
//   );
// };
