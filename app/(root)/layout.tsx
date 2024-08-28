import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';

// Async function for the Setup Layout page
export default async function SetupLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth(); // Authenticated user ID from Clerk

  if (!userId) {
    redirect('/sign-in');
  }

  //? Find the first store associated with the user in the Prisma DB
  const store = await prismadb.store.findFirst({
    where: { userId }, // Search using the authenticated user's ID
  });

  if (store) {
    redirect(`/${store.id}`);
    //? If a store exists, redirect to the store's dashboard "[storeId] folder"
  }

  // If no redirection is triggered
  return <>{children}</>;
}
