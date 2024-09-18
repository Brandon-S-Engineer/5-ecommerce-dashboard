'use client'; // This directive is used in Next.js to mark the component as a client-side component

import { ApiAlert } from '@/components/ui/api-alert'; // Importing ApiAlert component for displaying API information
import { useOrigin } from '@/hooks/use-origin'; // Custom hook to get the origin URL
import { useParams } from 'next/navigation'; // Hook to access dynamic route parameters

interface ApiListProps {
  entityName: string; // Name of the entity for constructing API endpoints
  entityIdName: string; // Name of the entity ID used in dynamic API routes
}

// ApiList component displays API endpoints for a given entity
export const ApiList: React.FC<ApiListProps> = ({ entityName, entityIdName }) => {
  const params = useParams(); // Get dynamic parameters from the route
  const origin = useOrigin(); // Get the origin URL

  // Construct the base URL for API endpoints using storeId from params
  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      {/* Display API alerts for various HTTP methods */}
      <ApiAlert
        title='GET'
        variant='public'
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title='GET'
        variant='public'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title='POST'
        variant='admin'
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title='PATCH'
        variant='admin'
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title='DELETE'
        variant='admin'
        description={`${baseUrl}/${entityName}`}
      />
    </>
  );
};

// 'use client';

// import { ApiAlert } from '@/components/ui/api-alert';
// import { useOrigin } from '@/hooks/use-origin';
// import { useParams } from 'next/navigation';

// interface ApiListProps {
//   entityName: string;
//   entityIdName: string;
// }
// export const ApiList: React.FC<ApiListProps> = ({ entityName, entityIdName }) => {
//   const params = useParams();
//   const origin = useOrigin();

//   const baseUrl = `${origin}/api/${params.storeId}`;
//   return (
//     <>
//       {/* API ALERTS*/}
//       <ApiAlert
//         title='GET'
//         variant='public'
//         description={`${baseUrl}/${entityName}`}
//       />
//       <ApiAlert
//         title='GET'
//         variant='public'
//         description={`${baseUrl}/${entityName}/{${entityIdName}}`}
//       />
//       <ApiAlert
//         title='POST'
//         variant='admin'
//         description={`${baseUrl}/${entityName}`}
//       />
//       <ApiAlert
//         title='PATCH'
//         variant='admin'
//         description={`${baseUrl}/${entityName}`}
//       />
//       <ApiAlert
//         title='DELETE'
//         variant='admin'
//         description={`${baseUrl}/${entityName}`}
//       />
//     </>
//   );
// };
