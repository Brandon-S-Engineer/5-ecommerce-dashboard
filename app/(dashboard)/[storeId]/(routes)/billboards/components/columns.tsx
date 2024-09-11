'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

//? Define the structure of data for each row in the table
export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

//? Define column definitions
export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'label', // Accesses the 'label' property from BillboardColumn
    header: 'Label', // Header text displayed in the table for this column
  },
  {
    accessorKey: 'createdAt', // Accesses the 'createdAt' property from BillboardColumn
    header: 'Date', // Header text for the date column
  },
  // {
  //   id: 'actions', // Custom column with an ID 'actions'
  //   cell: ({ row }) => <CellAction data={row.original} />, // Uses a custom component 'CellAction'
  // },
];
