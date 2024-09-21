import prismadb from '@/lib/prismadb';
import { CategoryForm } from './components/category-form';

const CategoryPage = async ({ params }: { params: { categoryId: string; storeId: string } }) => {
  // MongoDB implementation
  if (params.categoryId.length !== 24) {
    return (
      <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
          <CategoryForm
            billboards={[]}
            initialData={null}
          />{' '}
          {/* Error since "category" is nor fetched yet */}
        </div>
      </div>
    );
  }

  const category = await prismadb.category.findFirst({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryForm
          billboards={billboards}
          initialData={category}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
