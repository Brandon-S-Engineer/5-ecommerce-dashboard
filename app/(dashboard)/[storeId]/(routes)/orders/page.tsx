import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';
import { BillboardClient } from './components/client';
import { BillboardColumn } from './components/columns';

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: { storeId: params.storeId },
    include: { orderItems: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });

  const formattedOrders: BillboardColumn[] = orders.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(new Date(item.createdAt), 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
