'use client';

import { useStoreModal } from '@/hooks/use-store-modal'; // Custom Hook that uses zustand for global state managment
import { Modal } from '../ui/modal'; // Modal component

export const StoreModal = () => {
  const storeModal = useStoreModal();

  return (
    <Modal
      title='Create Store'
      description='Add a new store to manage products and categories'
      isOpen={storeModal.isOpen}
      onClose={() => {}}></Modal>
  );
};
