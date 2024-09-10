// 'use client';

// import { ColumnDef } from '@tanstack/react-table';
// import { CellAction } from './cell-action';

// // This type is used to define the shape of our data.
// // You can use a Zod schema here if you want.
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

'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
];
