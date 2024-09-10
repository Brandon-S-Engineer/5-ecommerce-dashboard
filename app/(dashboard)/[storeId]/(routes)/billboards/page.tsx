import prismadb from '@/lib/prismadb';
import { BillboardClient } from './components/client';

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  // Fetch billboards from the database where storeId matches the given params
  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={billboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
