'use client';

import { Modal } from '@/components/ui/modal';

const SetupPage = () => {
  return (
    <div className='p-4'>
      {/* Admin Account Button */}
      <Modal
        title='Test'
        description='Test Description'
        isOpen
        onClose={() => {}}>
        Children
      </Modal>
    </div>
  );
};

// Next.js creates a route for this page based on the file name due to the default export.
export default SetupPage;
