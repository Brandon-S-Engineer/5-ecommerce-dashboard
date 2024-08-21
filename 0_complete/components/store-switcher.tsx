// 'use client';

// import * as React from 'react';
// import { Check, ChevronsUpDown, PlusCircle, Store } from 'lucide-react';

// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { useStoreModal } from '@/hooks/use-store-modal';
// import { useParams, useRouter } from 'next/navigation';

// type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

// interface StoreSwitcherProps extends PopoverTriggerProps {
//   items: Record<string, any>[];
// }

// export default function StoreSwitcher({ className, items = [] }: StoreSwitcherProps) {
//   const storeModal = useStoreModal();
//   const params = useParams();
//   const router = useRouter();

//   const formattedItems = items.map((item) => ({
//     label: item.name,
//     value: item.id,
//   }));

//   const currentStore = formattedItems.find((item) => item.value === params.storeId);

//   const [open, setOpen] = React.useState(false);

//   const onStoreSelect = (store: { value: string; label: string }) => {
//     setOpen(false);
//     router.push(`/${store.value}`);
//   };

//   return (
//     <Popover
//       open={open}
//       onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant='outline'
//           size='sm'
//           role='combobox'
//           aria-expanded={open}
//           aria-label='Select a store'
//           className={cn('w-[200px] justify-between', className)}>
//           <Store className='mr-2 h-4 w-4' />
//           {currentStore?.label}
//           <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className='w-[200px] p-0'>
//         <Command>
//           <CommandList>
//             <CommandInput placeholder='Search store...' />
//             <CommandEmpty>No store found.</CommandEmpty>
//             <CommandGroup heading='Stores'>
//               {formattedItems.map((store) => (
//                 <CommandItem
//                   key={store.value}
//                   onSelect={() => onStoreSelect(store)}
//                   className='text-sm'>
//                   <Store className='mr-2 h-4 w-4' />
//                   {store.label}
//                   <Check className={cn('ml-auto h-4 w-4', currentStore?.value === store.value ? 'opacity-100' : 'opacity-0')} />
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//           <CommandSeparator />
//           <CommandList>
//             <CommandGroup>
//               <CommandItem
//                 onSelect={() => {
//                   setOpen(false);
//                   storeModal.onOpen();
//                 }}>
//                 <PlusCircle className='mr-2 h-5 w-5' />
//                 Create Store
//               </CommandItem>
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }

'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, PlusCircle, Store } from 'lucide-react'; // Icons from Lucide

import { cn } from '@/lib/utils'; // Utility function for conditional class names
import { Button } from '@/components/ui/button'; // UI Button component
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'; // Shadcn Command components
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'; // Popover components for dropdown functionality
import { useStoreModal } from '@/hooks/use-store-modal'; // Custom hook for modal control
import { useParams, useRouter } from 'next/navigation';

// Define prop types for StoreSwitcher component
type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Record<string, any>[]; // Define items prop as an array of objects
}

// Main StoreSwitcher component
export default function StoreSwitcher({ className, items = [] }: StoreSwitcherProps) {
  const storeModal = useStoreModal(); // Modal control functions
  const params = useParams(); // Route parameters
  const router = useRouter(); // Router to navigate between stores

  // Format items for display (converting item to label/value pairs)
  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  // Find current store by route param
  const currentStore = formattedItems.find((item) => item.value === params.storeId);

  const [open, setOpen] = React.useState(false); // State to control Popover visibility

  // Function to handle store selection and route navigation
  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false); // Close the Popover
    router.push(`/${store.value}`); // Navigate to the selected store
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          role='combobox'
          aria-expanded={open}
          aria-label='Select a store'
          className={cn('w-[200px] justify-between', className)}>
          <Store className='mr-2 h-4 w-4' /> {/* Store icon */}
          {currentStore?.label} {/* Show selected store's label */}
          <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' /> {/* Dropdown icon */}
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search store...' /> {/* Input field for store search */}
            <CommandEmpty>No store found.</CommandEmpty> {/* Fallback text when no stores are found */}
            <CommandGroup heading='Stores'>
              {/* Group of stores */}
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className='text-sm'>
                  <Store className='mr-2 h-4 w-4' /> {/* Store icon */}
                  {store.label} {/* Store label */}
                  <Check className={cn('ml-auto h-4 w-4', currentStore?.value === store.value ? 'opacity-100' : 'opacity-0')} /> {/* Check icon if store is selected */}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false); // Close Popover
                  storeModal.onOpen(); // Open modal to create a new store
                }}>
                <PlusCircle className='mr-2 h-5 w-5' /> {/* Plus icon */}
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
