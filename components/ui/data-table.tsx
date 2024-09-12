'use client';

// Imports from @tanstack/react-table for table setup
import {
  ColumnDef, // Column definitions
  ColumnFiltersState, // Filter state
  flexRender, // Render headers/cells
  getCoreRowModel, // Core row model
  getSortedRowModel, // Sorted rows
  SortingState, // Sorting state
  getPaginationRowModel, // Pagination
  getFilteredRowModel, // Filtered rows
  useReactTable, // Main table hook
  VisibilityState, // Column visibility state
} from '@tanstack/react-table';

// UI components for buttons, inputs, and table
import { Button } from '@/components/ui/button'; // Button for actions
import { Input } from '@/components/ui/input'; // Input for search
import {
  Table, // Table component
  TableBody, // Table body
  TableCell, // Table cells
  TableHead, // Table headers
  TableHeader, // Header container
  TableRow, // Table rows
} from '@/components/ui/table';

// React hook for state management
import { useState } from 'react'; // State hook

// Icons and pagination component
import { ChevronDown, Search } from 'lucide-react'; // Icons
import { DataTablePagination } from './data-table-pagination'; // Pagination

// Dropdown menu components
import {
  DropdownMenu, // Dropdown menu
  DropdownMenuCheckboxItem, // Checkbox item
  DropdownMenuContent, // Dropdown content
  DropdownMenuTrigger, // Trigger dropdown
} from '@/components/ui/dropdown-menu';

// Define props for DataTable component
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]; // Defines table columns
  data: TData[]; // Defines table data
  searchKey: string; // Key for search functionality
}

// DataTable component definition
export function DataTable<TData, TValue>({ columns, data, searchKey }: DataTableProps<TData, TValue>) {
  // State hooks for managing filters, sorting, and visibility
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  // Initialize table with data, columns, and state management handlers
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters, // Current filter state
      sorting, // Current sorting state
      columnVisibility, // Current column visibility state
    },
  });

  return (
    <div>
      {/* Search input and column filter dropdown */}
      <div className='flex items-center py-4'>
        <div className='relative max-w-sm'>
          <Search
            className='absolute left-3 top-[0.8rem] text-gray-400'
            size={20}
          />
          <Input
            placeholder='Search'
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
            className='pl-10'
          />
        </div>
        {/* Column visibility dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='ml-auto'>
              <span className=''>Filter Column</span>
              <ChevronDown className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table rendering */}
      <div className='rounded-md border'>
        <Table>
          <TableHeader className='bg-slate-100'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination for the table */}
      <DataTablePagination table={table} />
    </div>
  );
}
