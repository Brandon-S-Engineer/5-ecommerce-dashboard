import { create } from 'zustand';

// Define the state and actions for the modal
interface useStoreModalStore {
  isOpen: boolean; // State to track if the modal is open or closed
  onOpen: () => void; // Function to open the modal
  onClose: () => void; // Function to close the modal
}

// Creating the Zustand store
export const useStoreModal = create<useStoreModalStore>((set) => ({
  isOpen: false, // Initial state: modal is closed by default
  onOpen: () => set({ isOpen: true }), // Sets isOpen to true, opening the modal
  onClose: () => set({ isOpen: false }), // Sets isOpen to false, closing the modal
}));

// Zustand simplifies state management by allowing you to define your store inside a hook (useStoreModal). You can access this hook anywhere in your app to get the current state of the modal (isOpen) or to trigger actions (onOpen and onClose).
