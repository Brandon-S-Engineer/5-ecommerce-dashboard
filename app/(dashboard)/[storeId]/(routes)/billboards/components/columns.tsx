'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

//? Define the structure of data for each row in the table
export type BillboardColumn = {
  id: string; // Unique identifier for each row
  label: string; // A label to display in the 'Label' column
  createdAt: string; // A date to display in the 'Date' column
};

//? Define column definitions
export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'label', // Maps to 'label' property in BillboardColumn
    header: 'Label', // Column header text
  },
  {
    accessorKey: 'createdAt', // Maps to 'createdAt' property
    header: 'Date', // Column header text
  },
  {
    id: 'actions', // Custom column with an ID 'actions'
    cell: ({ row }) => <CellAction data={row.original} />, // Uses 'row.original' to pass full row data
  },
];
