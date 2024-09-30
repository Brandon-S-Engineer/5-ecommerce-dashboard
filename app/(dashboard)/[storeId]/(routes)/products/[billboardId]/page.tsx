import prismadb from '@/lib/prismadb';
import { BillboardForm } from './components/billboard-form';

// billboardId corresponds to the dynamic segment [billboardId]
const BillboardPage = async ({ params }: { params: { billboardId: string } }) => {
  //! Check if the billboardId has a valid ObjectID length (24 characters)
  if (params.billboardId.length !== 24) {
    // If the ID is not valid, handle the "new" case
    return (
      <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
          <BillboardForm initialData={null} /> {/* Pass null for new billboard */}
        </div>
      </div>
    );
  }

  //! Fetch the billboard once the ID is validated (24 characters)
  const billboard = await prismadb.billboard.findFirst({
    where: {
      id: params.billboardId, // Match the billboard by its ID from the URL params
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
