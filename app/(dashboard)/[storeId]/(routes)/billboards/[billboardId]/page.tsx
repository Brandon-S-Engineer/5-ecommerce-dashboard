import prismadb from '@/lib/prismadb';
import { BillboardForm } from './components/billboard-form';

// billboardId corresponds to the dynamic segment [billboardId]
const BillboardPage = async ({ params }: { params: { billboardId: string } }) => {
  // Fetch the billboard
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
