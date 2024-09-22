import prismadb from '@/lib/prismadb';
import { CategoryForm } from './components/category-form';
import { Billboard } from '@prisma/client';

const CategoryPage = async ({ params }: { params: { categoryId: string; storeId: string } }) => {
  let category = null; // Default value for new category
  let billboards: Billboard[] = [];

  // If categoryId is not "new", fetch the category data
  if (params.categoryId !== 'new') {
    try {
      // Fetch category data
      category = await prismadb.category.findFirst({
        where: {
          id: params.categoryId,
        },
      });
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  }

  try {
    // Fetch billboards for the provided storeId
    billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });
  } catch (error) {
    console.error('Error fetching billboards:', error);
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryForm
          billboards={billboards} // Provide billboards data regardless of "new" or "edit" mode
          initialData={category} // Pass fetched category data or null for new category
        />
      </div>
    </div>
  );
};

export default CategoryPage;
