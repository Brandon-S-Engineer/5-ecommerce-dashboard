import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';

// Async function for the Setup Layout page
export default async function SetupLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth(); // Get the authenticated user ID from Clerk

  if (!userId) {
    redirect('/sign-in'); // If no user ID, redirect to the sign-in page
  }

  //? Find the first store associated with the user in the Prisma DB
  const store = await prismadb.store.findFirst({
    where: { userId }, // Search using the authenticated user's ID
  });

  if (store) {
    redirect(`/${store.id}`);
    //? If a store exists, redirect to the store's dashboard "[storeId] folder"
    // Uses the redirect method to navigate the user to the store's dashboard, matching the dynamic [storeId] route in the app directory
  }

  return <>{children}</>; // Render the child components if no redirection is triggered
}
