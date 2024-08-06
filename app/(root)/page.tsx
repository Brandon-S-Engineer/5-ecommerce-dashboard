'use client';

import { useStoreModal } from '@/hooks/use-store-modal'; // Importing custom hook for store modal
import { useEffect } from 'react';

const SetUpPage = () => {
  //? Zustand can have issues when its state is directly accessed inside useEffect. The usual workaround is to use state selectors directly in the component to avoid these issues.

  const onOpen = useStoreModal((state) => state.onOpen); // Extracting onOpen function from store
  const isOpen = useStoreModal((state) => state.isOpen); // Extracting isOpen state from store

  useEffect(() => {
    if (!isOpen) {
      onOpen(); // Open modal if it is not open
    }
  }, [isOpen, onOpen]); // Dependency array for useEffect

  //? Component returns null (renders nothing), it only triggers the opening of the modal.
  return null;
};

export default SetUpPage; // Exporting SetUpPage component as default
