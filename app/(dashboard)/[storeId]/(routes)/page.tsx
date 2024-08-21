// import { getGraphRevenue } from '@/actions/get-graph-revenue'; // Graph revenue data
// import { getSalesCount } from '@/actions/get-sales-count'; // Sales count
// import { getStockCount } from '@/actions/get-stocks-count'; // Stock count
// import { getTotalRevenue } from '@/actions/get-total-revenue'; // Total revenue
// import { Overview } from '@/components/overview'; // Overview component
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Card UI components
// import Heading from '@/components/ui/heading'; // Heading UI component
// import { Separator } from '@/components/ui/separator'; // Separator UI component
// import { rupeeFormatter } from '@/lib/utils'; // Utility for formatting rupees

// import { CreditCard, DollarSign, Package2 } from 'lucide-react'; // Icons from lucide-react

// interface DashboardPageProps {
//   params: {
//     storeId: string; // Define storeId param for props
//   };
// }

// const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
//   // Fetching data asynchronously for total revenue, sales, stock count, and graph data
//   const totalRevenue = await getTotalRevenue(params.storeId);
//   const salesCount = await getSalesCount(params.storeId);
//   const stockCount = await getStockCount(params.storeId);
//   const graphRevenue = await getGraphRevenue(params.storeId);

//   return (
//     <div className='flex-col'>
//       <div className='flex-1 space-y-4 p-8 pt-6'>
//         <Heading
//           title='Dashboard'
//           description='Overview of your store'
//         />{' '}
//         {/* Heading for the page */}
//         <Separator /> {/* Line separator */}
//         <div className='grid gap-4 grid-cols-3'>
//           {/* Cards displaying total revenue, sales count, and stock count */}
//           <Card>
//             <CardHeader className='flex flex-row items-center justify-between space-y-6'>
//               <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
//               <DollarSign className='h-4 w-4 text-muted-foreground' /> {/* Dollar icon */}
//             </CardHeader>
//             <CardContent>
//               <div className='text-2xl font-bold'>{rupeeFormatter.format(totalRevenue)}</div> {/* Format total revenue */}
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className='flex flex-row items-center justify-between space-y-6'>
//               <CardTitle className='text-sm font-medium'>Sales</CardTitle>
//               <CreditCard className='h-4 w-4 text-muted-foreground' /> {/* Sales icon */}
//             </CardHeader>
//             <CardContent>
//               <div className='text-2xl font-bold'>+{salesCount}</div> {/* Display sales count */}
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className='flex flex-row items-center justify-between space-y-6'>
//               <CardTitle className='text-sm font-medium'>Products in Stock</CardTitle>
//               <Package2 className='h-4 w-4 text-muted-foreground' /> {/* Stock icon */}
//             </CardHeader>
//             <CardContent>
//               <div className='text-2xl font-bold'>{stockCount}</div> {/* Display stock count */}
//             </CardContent>
//           </Card>
//         </div>
//         {/* Card displaying the revenue overview graph */}
//         <Card className='col-span-4'>
//           <CardHeader className='flex flex-row items-center justify-between space-y-6'>
//             <CardTitle className='text-sm font-medium'>Overview</CardTitle>
//           </CardHeader>
//           <CardContent className='pl-2'>
//             <Overview data={graphRevenue} /> {/* Display overview graph with fetched data */}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

import prismadb from '@/lib/prismadb';

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div>Active Store: {store?.name}</div>;
};

export default DashboardPage;
