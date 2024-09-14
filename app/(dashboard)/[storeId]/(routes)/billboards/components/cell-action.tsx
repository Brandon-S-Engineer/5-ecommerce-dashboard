'use client';

import { DropdownMenu } from '@/components/ui/dropdown-menu'; // Dropdown components

import { BillboardColumn } from './columns'; // Interface for props

interface CellActionProps {
  data: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  return (
    <>
      <DropdownMenu></DropdownMenu>
    </>
  );
};
