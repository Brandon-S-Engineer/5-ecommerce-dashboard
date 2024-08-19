// import { UserButton, auth } from '@clerk/nextjs';
// import { redirect } from 'next/navigation';

// import StoreSwitcher from '@/components/store-switcher';

// import prismadb from '@/lib/prismadb';

// import { MainNav } from './main-nav';
// import { ThemeToggle } from './theme-toggle';

// const Navbar = async () => {
//   const { userId } = auth();

//   if (!userId) {
//     redirect('/sign-in');
//   }

//   const stores = await prismadb.store.findMany({
//     where: {
//       userId,
//     },
//   });

//   return (
//     <div className='border-b'>
//       <div className='flex h-16 items-center px-4'>
//         <StoreSwitcher items={stores} />

//         <MainNav />

//         <div className='ml-auto flex items-center space-x-4'>
//           <ThemeToggle />

//           <UserButton afterSignOutUrl='/' />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { UserButton, auth } from '@clerk/nextjs'; // Clerk components for user authentication.
import { redirect } from 'next/navigation'; // Redirect function for handling navigation.

import StoreSwitcher from '@/components/store-switcher';
import prismadb from '@/lib/prismadb';

import { MainNav } from './main-nav';
import { ThemeToggle } from './theme-toggle';

const Navbar = async () => {
  const { userId } = auth(); // Gets the authenticated user's ID.

  if (!userId) {
    redirect('/sign-in'); // Redirects to the sign-in page if the user is not authenticated.
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId, // Fetches all stores associated with the authenticated user.
    },
  });

  return (
    <div className='border-b'>
      {/* Flexbox for the navbar layout */}
      <div className='flex h-16 items-center px-4'>
        <StoreSwitcher items={stores} /> {/* Store switcher component with fetched stores */}
        <MainNav /> {/* Main navigation component */}
        <div className='ml-auto flex items-center space-x-4'>
          {/* Flexbox to align items to the right */}
          <ThemeToggle />
          <UserButton afterSignOutUrl='/' /> {/* User button with redirect after sign out */}
        </div>
      </div>
    </div>
  );
};

export default Navbar; // Exports the Navbar component as the default.
