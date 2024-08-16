import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs'; // Clerk authentication

// import Navbar from '@/components/navbar';
import prismadb from '@/lib/prismadb'; // PrismaDB instance

// import { accounts, mails } from '@/lib/data'; // Account and mail data
import { cookies } from 'next/headers';

// import { StickyDynamicNav } from '@/components/dynamic-sticky-nav';

export default async function DashboardLayout({ children, params }: { children: React.ReactNode; params: { storeId: string } }) {
  const { userId } = auth(); // Check if we're logged in
  const layout = cookies().get('react-resizable-panels:layout'); // Get layout cookie value
  const collapsed = cookies().get('react-resizable-panels:collapsed'); // Get collapsed cookie value

  // Parse layout and collapsed data if they exist, otherwise default to undefined
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  /* ------------------------------- Validation: ------------------------------ */
  // Redirect to sign-in page if user is not authenticated
  if (!userId) {
    redirect('/sign-in');
  }

  /* ----------------------------- Fetch the Store ---------------------------- */
  // From PrismaDB based on storeId and userId
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  // Redirect to homepage if the store doesn't exist or doesn't belong to the user
  if (!store) {
    redirect('/');
  }

  return (
    <>
      <div className='min-h-screen'>
        {/* <Navbar /> */}
        {children}
      </div>
      {/* <div className='hidden flex-col md:flex'>
        <StickyDynamicNav
          accounts={accounts} // Pass accounts data to StickyDynamicNav
          mails={mails} // Pass mails data to StickyDynamicNav
          defaultLayout={defaultLayout} // Pass default layout
          defaultCollapsed={defaultCollapsed} // Pass default collapsed state
          navCollapsedSize={4} // Set navCollapsedSize to 4
        />
      </div> */}
    </>
  );
}
