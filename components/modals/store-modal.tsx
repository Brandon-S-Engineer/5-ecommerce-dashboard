'use client';

import * as z from 'zod';

import { useStoreModal } from '@/hooks/use-store-modal'; // Custom Hook that uses zustand for global state management
import { Modal } from '@/components/ui/modal'; // Modal component

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  name: z.string().min(1).max(50),
});

export const StoreModal = () => {
  const storeModal = useStoreModal(); // Accessing the custom hook

  // Define the Form using useForm Hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  // Define a Submit Handler: A function that processes the form values upon submission, ensuring they are validated and type-safe.

  return (
    <Modal
      title='Create Store'
      description='Add a new store to manage products and categories'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}>
      Future Create Store Form
    </Modal>
  );
};
