'use client'; // Marks the component as a client-side component

import { Button } from '@/components/ui/button'; // Importing a Button component
import Heading from '@/components/ui/heading'; // Importing a Heading component
import { Separator } from '@/components/ui/separator'; // Importing a Separator component
import { Billboard } from '@prisma/client'; // Importing Billboard type from Prisma
import { Plus } from 'lucide-react'; // Importing a Plus icon component
import { useParams, useRouter } from 'next/navigation'; // Hooks for accessing route parameters and router
import { BillboardColumn, columns } from './columns'; // Importing BillboardColumn type and columns config
import { DataTable } from '@/components/ui/data-table'; // Importing DataTable component for displaying data
import { ApiList } from '@/components/ui/api-list'; // Importing ApiList component for API details

interface BillboardClientProps {
  data: BillboardColumn[]; // Props type: an array of BillboardColumn
}

// Functional component accepting BillboardClientProps
const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter(); // Hook to handle routing
  const params = useParams(); // Hook to access URL parameters

  return (
    <>
      {/* Header section with heading and button */}
      <div className='flex items-center justify-between'>
        <Heading
          title={`Billboards (${data.length})`} // Displaying the number of billboards
          description='Billboards are the main way to advertise your products and services. You can create a billboard by clicking on the button.'
        />

        {/* Button to navigate to new billboard creation page */}
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className='mr-2 h-4 w-4' /> {/* Plus icon */}
          Add New
        </Button>
      </div>
      <Separator /> {/* Separator component for visual separation */}
      {/* DataTable component to display billboards data */}
      <DataTable
        searchKey='label' // Searchable key
        columns={columns} // Column configuration
        data={data} // Data passed as props
      />
      {/* API section for displaying billboard-related API calls */}
      <Heading
        title='API'
        description='API calls for Billboards. You can also use the endpoints to get the billboards of a specific store.'
      />
      <Separator /> {/* Another separator for the API section */}
      {/* ApiList component to show available API endpoints */}
      <ApiList
        entityName='billboards' // API entity name
        entityIdName='billboardId' // API entity ID name
      />
    </>
  );
};

export default BillboardClient; // Exporting the component

// 'use client';

// import { Button } from '@/components/ui/button';
// import Heading from '@/components/ui/heading';
// import { Separator } from '@/components/ui/separator';
// import { Billboard } from '@prisma/client';
// import { Plus } from 'lucide-react';
// import { useParams, useRouter } from 'next/navigation';
// import { BillboardColumn, columns } from './columns';
// import { DataTable } from '@/components/ui/data-table';
// import { ApiList } from '@/components/ui/api-list';

// interface BillboardClientProps {
//   data: BillboardColumn[];
// }

// const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
//   const router = useRouter();
//   const params = useParams();
//   return (
//     <>
//       <div className='flex items-center justify-between'>
//         <Heading
//           title={`Billboards (${data.length})`}
//           description='Billboards are the main way to advertise your products and services. You can create a billboard by clicking on the button.'
//         />

//         <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
//           <Plus className='mr-2 h-4 w-4'>Add New</Plus>
//         </Button>
//       </div>
//       <Separator />
//       <DataTable
//         searchKey='label'
//         columns={columns}
//         data={data}
//       />
//       <Heading
//         title='API'
//         description='API calls for Billboards. You can also use the endpoints to get the billboards of a specific store.'
//       />
//       <Separator />
//       <ApiList
//         entityName='billboards'
//         entityIdName='billboardId'
//       />
//     </>
//   );
// };

// export default BillboardClient;
