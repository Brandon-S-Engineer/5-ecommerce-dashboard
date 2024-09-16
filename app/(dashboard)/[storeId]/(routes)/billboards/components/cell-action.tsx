'use client';

import axios from 'axios';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'; // Dropdown components
import { Button } from '@/components/ui/button';
import { AlertModal } from '@/components/modals/alert-modal';

import { BillboardColumn } from './columns';

interface CellActionProps {
  data: BillboardColumn; // Props containing billboard data
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  // State management for loading and modal visibility
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Copy the billboard ID to clipboard
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Billboard Id copied to clipboard');
  };

  // Handle the deletion of a billboard
  const onDelete = async () => {
    try {
      setLoading(true);
      // Delete request to remove the billboard
      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
      router.refresh(); // Refresh the page to reflect changes
      toast.success('Billboard deleted successfully');
    } catch (error) {
      // Error handling
      toast.error('Make sure you removed all categories using this billboard first.');
    } finally {
      setLoading(false);
      setOpen(false); // Close the modal
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <DropdownMenu>
        {/* asChild Prop: Makes the child component the direct trigger element */}
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span> {/* Accessible text */}
            <MoreHorizontal className='h-4 w-4' /> {/* Button icon */}
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
