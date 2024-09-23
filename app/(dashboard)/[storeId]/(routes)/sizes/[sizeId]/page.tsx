import prismadb from '@/lib/prismadb';
import { SizeForm } from './components/size-form';

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  let size = null; // Default value for new size

  // Check if it's an existing size or a new one
  if (params.sizeId !== 'new') {
    try {
      // Fetch size data only if it's not a "new" size
      size = await prismadb.size.findFirst({
        where: {
          id: params.sizeId,
        },
      });
    } catch (error) {
      console.error('Error fetching size:', error);
    }
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SizeForm initialData={size} /> {/* Pass fetched size or null for new size */}
      </div>
    </div>
  );
};

export default SizePage;
