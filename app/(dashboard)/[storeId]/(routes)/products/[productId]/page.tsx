import prismadb from '@/lib/prismadb';
import { BillboardForm } from './components/billboard-form';

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  if (params.productId.length !== 24) {
    return (
      <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
          <BillboardForm initialData={null} />
        </div>
      </div>
    );
  }

  const product = await prismadb.product.findFirst({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardForm initialData={product} />
      </div>
    </div>
  );
};

export default ProductPage;
