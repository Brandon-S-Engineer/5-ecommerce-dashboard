'use client';

// Importing necessary Dialog components from the ui library
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Define the props for the Modal component
interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean; // State to control the visibility of the modal
  onClose: () => void; // Function to close the modal
  children?: React.ReactNode; // Optional children to be rendered inside the modal
}

// Modal component definition | FC = function component
export const Modal: React.FC<ModalProps> = ({ title, description, isOpen, onClose, children }) => {
  // Function to handle modal open/close state changes
  const onChange = (open: boolean) => {
    if (!open) {
      onClose(); // Close the modal if open is false
    }
  };

  // Render the modal with the provided props and children
  return (
    <Dialog
      open={isOpen}
      // Event handler for dialog open state change
      onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle> {/* Modal title */}
          <DialogDescription>{description}</DialogDescription> {/* Modal description */}
        </DialogHeader>
        <div>{children}</div> {/* Render any children passed to the modal */}
      </DialogContent>
    </Dialog>
  );
};
