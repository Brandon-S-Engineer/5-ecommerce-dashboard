'use client';

import { useEffect, useState } from 'react';

import { StoreModal } from '@/components/modals/store-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false); // State to track if the component is mounted

  useEffect(() => {
    setIsMounted(true); // Set isMounted to true after the component is mounted
  }, []);

  // If not mounted (server side), render nothing (prevents SSR)
  if (!isMounted) {
    return null;
  }

  // If we are on the client
  return (
    <>
      <StoreModal />
    </>
  );
};
