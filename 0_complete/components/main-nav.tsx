'use client'; // Marks the component as a client component in Next.js

import Link from 'next/link'; // Importing Link component for navigation
import { useParams, usePathname } from 'next/navigation'; // Hooks for accessing route parameters and pathname

import { cn } from '@/lib/utils'; // Utility function for conditional class names

// MainNav component: accepts className and other props
export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname(); // Gets the current pathname
  const params = useParams(); // Gets route parameters (e.g., storeId)

  // Define navigation routes with href, label, and active state based on current path
  const routes = [
    { href: `/${params.storeId}`, label: 'Overview', active: pathname === `/${params.storeId}` },
    { href: `/${params.storeId}/billboards`, label: 'Billboards', active: pathname === `/${params.storeId}/billboards` },
    { href: `/${params.storeId}/categories`, label: 'Categories', active: pathname === `/${params.storeId}/categories` },
    { href: `/${params.storeId}/sizes`, label: 'Sizes', active: pathname === `/${params.storeId}/sizes` },
    { href: `/${params.storeId}/colors`, label: 'Colors', active: pathname === `/${params.storeId}/colors` },
    { href: `/${params.storeId}/products`, label: 'Products', active: pathname === `/${params.storeId}/products` },
    { href: `/${params.storeId}/orders`, label: 'Orders', active: pathname === `/${params.storeId}/orders` },
    { href: `/${params.storeId}/settings`, label: 'Settings', active: pathname === `/${params.storeId}/settings` },
  ];

  // Render navigation links
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6 ml-6', className)}
      {...props}>
      {routes.map((route) => (
        <Link
          key={route.href} // Unique key for each link
          href={route.href} // Link destination
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary', // Base styles
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground' // Active link styles
          )}>
          {route.label} {/* Display link label */}
        </Link>
      ))}
    </nav>
  );
}

// 'use client';

// import Link from 'next/link';
// import { useParams, usePathname } from 'next/navigation';

// import { cn } from '@/lib/utils';

// export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
//   const pathname = usePathname();
//   const params = useParams();

//   const routes = [
//     {
//       href: `/${params.storeId}`,
//       label: 'Overview',
//       active: pathname === `/${params.storeId}`,
//     },
//     {
//       href: `/${params.storeId}/billboards`,
//       label: 'Billboards',
//       active: pathname === `/${params.storeId}/billboards`,
//     },
//     {
//       href: `/${params.storeId}/categories`,
//       label: 'Categories',
//       active: pathname === `/${params.storeId}/categories`,
//     },
//     {
//       href: `/${params.storeId}/sizes`,
//       label: 'Sizes',
//       active: pathname === `/${params.storeId}/sizes`,
//     },
//     {
//       href: `/${params.storeId}/colors`,
//       label: 'Colors',
//       active: pathname === `/${params.storeId}/colors`,
//     },
//     {
//       href: `/${params.storeId}/products`,
//       label: 'Products',
//       active: pathname === `/${params.storeId}/products`,
//     },
//     {
//       href: `/${params.storeId}/orders`,
//       label: 'Orders',
//       active: pathname === `/${params.storeId}/orders`,
//     },
//     {
//       href: `/${params.storeId}/settings`,
//       label: 'Settings',
//       active: pathname === `/${params.storeId}/settings`,
//     },
//   ];

//   return (
//     <nav
//       className={cn('flex items-center space-x-4 lg:space-x-6 ml-6', className)}
//       {...props}>
//       {routes.map((route) => (
//         <Link
//           key={route.href}
//           href={route.href}
//           className={cn(
//             'text-sm font-medium transition-colors hover:text-primary',

//             route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
//           )}>
//           {route.label}
//         </Link>
//       ))}
//     </nav>
//   );
// }
