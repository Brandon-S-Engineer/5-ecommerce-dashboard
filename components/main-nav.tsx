// 'use client';

// import Link from 'next/link'; // Link component for navigation.
// import { useParams, usePathname } from 'next/navigation'; // Hooks for getting URL parameters and current path.

import { cn } from '@/lib/utils'; // Utility function for conditionally applying classes.

// export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
//   const pathname = usePathname(); // Gets the current URL path.
//   const params = useParams(); // Gets the dynamic parameters from the URL.

//   const routes = [
//     {
//       href: `/${params.storeId}`, // Links to the store's overview page.
//       label: 'Overview',
//       active: pathname === `/${params.storeId}`, // Determines if the route is active.
//     },
//     {
//       href: `/${params.storeId}/billboards`, // Links to the billboards page.
//       label: 'Billboards',
//       active: pathname === `/${params.storeId}/billboards`,
//     },
//     // Additional routes follow the same pattern for categories, sizes, etc.
//   ];

//   return (
//     <nav
//       className={cn('flex items-center space-x-4 lg:space-x-6 ml-6', className)}
//       {...props}>
//       {' '}
//       {/* Navbar container with flexbox layout and spacing */}
//       {routes.map((route) => (
//         <Link
//           key={route.href}
//           href={route.href} // Navigation link.
//           className={cn(
//             'text-sm font-medium transition-colors hover:text-primary', // Styling for the link.
//             route.active ? 'text-black dark:text-white' : 'text-muted-foreground' // Conditional class for active/inactive links.
//           )}>
//           {route.label} {/* Displays the label for the route */}
//         </Link>
//       ))}
//     </nav>
//   );
// }

('use client');

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  // const pathname = usePathname()

  return (
    <nav className={cn()}>
      <div></div>
    </nav>
  );
}
