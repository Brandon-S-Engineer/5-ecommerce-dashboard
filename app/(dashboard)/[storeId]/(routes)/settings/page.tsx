import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';

import { SettingsForm } from './components/settings-form';

interface SettingsPageProps {
  params: {
    storeId: string; // Expect storeId to be passed as param
  };
}

// Define SettingsPage component as async since it performs database operations
const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth(); // Get the userId from the authentication context by destructuring

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId, // Find the store by the provided storeId
      userId, // Ensure the store belongs to the authenticated user
    },
  });

  // Make sure store is defined
  if (!store) {
    redirect('/'); // If the store doesn't exist, redirect to the home page
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 py-6'>
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
