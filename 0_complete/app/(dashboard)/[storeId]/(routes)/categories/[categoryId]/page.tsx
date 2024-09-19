import prismadb from '@/lib/prismadb';
import { CategoryForm } from './components/category-form';

const CategoryPage = async ({ params }: { params: { categoryId: string; storeId: string } }) => {
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
    <div className='flex-col '>
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

// import prismadb from '@/lib/prismadb';
// import { BillboardForm } from './components/billboard-form';

// const CategoryPage = async ({ params }: { params: { billboardId: string } }) => {
//   // if (params.billboardId.length !== 24) {
//   //   return (
//   //     <div className='flex-col'>
//   //       <div className='flex-1 space-y-4 p-8 pt-6'>
//   //         <BillboardForm initialData={null} />
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   const billboard = await prismadb.billboard.findFirst({
//     where: {
//       id: params.billboardId,
//     },
//   });

//   return (
//     <div className='flex-col'>
//       <div className='flex-1 space-y-4 p-8 pt-6'>
//         <BillboardForm initialData={billboard} />
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;
