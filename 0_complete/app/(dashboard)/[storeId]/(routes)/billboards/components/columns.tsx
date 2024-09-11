'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

// Define the shape of a BillboardColumn object
export type BillboardColumn = {
  id: string; // Unique identifier for each billboard
  label: string; // A label or name associated with the billboard
  createdAt: string; // Date when the billboard was created
};

// Define column definitions
export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'label', // Accesses the 'label' property from BillboardColumn
    header: 'Label', // Header text displayed in the table for this column
  },
  {
    accessorKey: 'createdAt', // Accesses the 'createdAt' property from BillboardColumn
    header: 'Date', // Header text for the date column
  },
  {
    id: 'actions', // Custom column with an ID 'actions'
    cell: ({ row }) => <CellAction data={row.original} />, // Uses a custom component 'CellAction'
  },
];

// 'use client';

// import { ColumnDef } from '@tanstack/react-table';
// import { CellAction } from './cell-action';

// export type BillboardColumn = {
//   id: string;
//   label: string;
//   createdAt: string;
// };

// export const columns: ColumnDef<BillboardColumn>[] = [
//   {
//     accessorKey: 'label',
//     header: 'Label',
//   },
//   {
//     accessorKey: 'createdAt',
//     header: 'Date',
//   },
//   {
//     id: 'actions',
//     cell: ({ row }) => <CellAction data={row.original} />,
//   },
// ];
