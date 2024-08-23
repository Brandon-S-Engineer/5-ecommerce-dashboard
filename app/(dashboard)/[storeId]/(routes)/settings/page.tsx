import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

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

  return <div>Hello Settings</div>;
};

export default SettingsPage;
