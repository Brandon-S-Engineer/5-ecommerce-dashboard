'use client'; // Directive for client-side rendering

import { useStoreModal } from '@/hooks/use-store-modal'; // Custom Hook that uses zustand for global state management
import { Modal } from '@/components/ui/modal'; // Modal component

export const StoreModal = () => {
  const storeModal = useStoreModal(); // Accessing the custom hook

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
