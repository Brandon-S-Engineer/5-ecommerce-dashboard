import prismadb from '@/lib/prismadb';
import { CategoryForm } from './components/category-form';

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  if (params.categoryId.length !== 24) {
    return (
      <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
          <CategoryForm initialData={null} /> {/* Error since "category" is nor fetched yet */}
        </div>
      </div>
    );
  }

  const category = await prismadb.category.findFirst({
    where: {
      id: params.categoryId,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
