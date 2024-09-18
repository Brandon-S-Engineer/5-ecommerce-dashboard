'use client';

import { ColumnDef } from '@tanstack/react-table'; //? Import the type definition for defining columns in the table

import { CellAction } from './cell-action';

//? Define the structure of data for each row in the table
export type CategoryColumn = {
  id: string; // Unique identifier for each row
  name: string;
  billboardLabel: string;
  createdAt: string; // A date to display in the 'Date' column
};

//? Define column definitions
export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name', // Maps to 'name' property in CategoryColumn
    header: 'Name', // Column header text
  },
  {
    accessorKey: 'billboard',
    header: 'Billboard', // Column header text
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions', // Custom column with an ID 'actions'
    cell: ({ row }) => <CellAction data={row.original} />, //? Uses 'row.original' to pass full row data, so it access: BillboardColumn object
  },
];
