import { create } from 'zustand'; // Importing the zustand library

interface useStoreModalStore {
  isOpen: boolean; // State: modal is open
  onOpen: () => void; // Function to open the modal
  onClose: () => void; // Function to close the modal
}

//? Creating the Store
export const useStoreModal = create<useStoreModalStore>((set) => ({
  isOpen: false, // Initial state: modal is closed
  onOpen: () => set({ isOpen: true }), // Opens the modal
  onClose: () => set({ isOpen: false }), // Closes the modal
}));
