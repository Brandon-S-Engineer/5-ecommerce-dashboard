'use client';

import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'; // Dropdown components
import { Button } from '@/components/ui/button';

import { BillboardColumn } from './columns'; // Interface for props

interface CellActionProps {
  data: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id); // Copies the id to clipboard
    toast.success('Billboard Id copied to clipboard'); // Show a success toast
  };

  return (
    <>
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

          <DropdownMenuItem onClick={() => router.push(`${params.storeId}/billboards/${data.id}`)}>
            <Edit className='mr-2 h-4 w-4' /> {/* Edit icon */}
            Update
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Trash className='mr-2 h-4 w-4' /> {/* Delete icon */}
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
