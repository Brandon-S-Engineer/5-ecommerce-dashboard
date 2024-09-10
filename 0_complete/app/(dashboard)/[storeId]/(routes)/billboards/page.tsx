import { format } from 'date-fns'; // Import the 'format' function from 'date-fns' to format dates.

import prismadb from '@/lib/prismadb';
import BillboardClient from './components/Client';

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  // Fetch billboards from the database where storeId matches the given params.
  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: 'desc' },
  });

  // Format the fetched billboards data to include formatted creation date.
  const formattedBillboards = billboards.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: format(new Date(billboard.createdAt), 'MMMM do ,yyyy'), // Format the creation date.
  }));

  // Render a div containing the BillboardClient component with formatted data.
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage; // Export the BillboardsPage component.

// import { format } from 'date-fns';

// import prismadb from '@/lib/prismadb';
// import BillboardClient from './components/Client';

// const BillboardsPage = async ({
//   params,
// }: {
//   params: {
//     storeId: string;
//   };
// }) => {
//   const billboards = await prismadb.billboard.findMany({
//     where: {
//       storeId: params.storeId,
//     },
//     orderBy: {
//       createdAt: 'desc',
//     },
//   });

//   const formattedBillboards = billboards.map((billboard) => ({
//     id: billboard.id,
//     label: billboard.label,
//     createdAt: format(new Date(billboard.createdAt), 'MMMM do ,yyyy'),
//   }));

//   return (
//     <div className='flex-col'>
//       <div className='flex-1 space-y-4 p-8 pt-6'>
//         <BillboardClient data={formattedBillboards} />
//       </div>
//     </div>
//   );
// };

// export default BillboardsPage;
