// import prismadb from '@/lib/prismadb';
// import { auth } from '@clerk/nextjs';
// import { redirect } from 'next/navigation';

// import React from 'react';
// import { SettingsForm } from './components/settings-form';

// interface SettingsPageProps {
//   params: {
//     storeId: string;
//   };
// }
// const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
//   const { userId } = auth();

//   if (!userId) {
//     redirect('/sign-in');
//   }

//   const store = await prismadb.store.findFirst({
//     where: {
//       id: params.storeId,
//       userId,
//     },
//   });

//   if (!store) {
//     redirect('/');
//   }
//   return (
//     <div className='flex-col'>
//       <div className='flex-1 space-y-4 p-8 pt-6'>
//         <SettingsForm initialData={store} />
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;

import prismadb from '@/lib/prismadb'; // Import the Prisma database instance
import { auth } from '@clerk/nextjs'; // Import Clerk authentication
import { redirect } from 'next/navigation'; // Import redirect function from Next.js

import React from 'react'; // Import React
import { SettingsForm } from './components/settings-form'; // Import SettingsForm component

// Define the props interface for SettingsPage
interface SettingsPageProps {
  params: {
    storeId: string; // Expect storeId to be passed in as a param
  };
}

// Define the SettingsPage component as async since it performs database operations
const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth(); // Get the userId from the authentication context

  if (!userId) {
    redirect('/sign-in'); // If user is not authenticated, redirect to sign-in page
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId, // Find the store by the provided storeId
      userId, // Ensure the store belongs to the authenticated user
    },
  });

  if (!store) {
    redirect('/'); // If the store doesn't exist, redirect to the home page
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm initialData={store} /> // Pass the store data to the SettingsForm
      </div>
    </div>
  );
};

export default SettingsPage; // Export the SettingsPage component
