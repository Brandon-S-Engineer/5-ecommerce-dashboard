import prismadb from '@/lib/prismadb'; // Importing Prisma database instance for database operations
import React from 'react'; // Importing React library
import { BillboardForm } from './components/billboard-form'; // Importing the BillboardForm component

// Async component to render the BillboardPage
const BillboardPage = async ({ params }: { params: { billboardId: string } }) => {
  // Fetch the billboard data from the database using Prisma, based on the billboardId from params
  const billboard = await prismadb.billboard.findFirst({
    where: {
      id: params.billboardId, // Match the billboard by its ID from the URL params
    },
  });

  // Render the component structure
  return (
    <div className='flex-col '>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardForm initialData={billboard} /> {/* Passing the fetched billboard data as initialData to BillboardForm */}
      </div>
    </div>
  );
};

export default BillboardPage; // Exporting the BillboardPage component as default

// import prismadb from '@/lib/prismadb';
// import React from 'react';
// import { BillboardForm } from './components/billboard-form';

// const BillboardPage = async ({ params }: { params: { billboardId: string } }) => {
//   const billboard = await prismadb.billboard.findFirst({
//     where: {
//       id: params.billboardId,
//     },
//   });
//   return (
//     <div className='flex-col '>
//       <div className='flex-1 space-y-4 p-8 pt-6'>
//         <BillboardForm initialData={billboard} />
//       </div>
//     </div>
//   );
// };

// export default BillboardPage;
