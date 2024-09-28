'use client';

import Link from 'next/link'; // Link component for navigation
import { useParams, usePathname } from 'next/navigation'; // Hooks for getting URL parameters and current path

import { cn } from '@/lib/utils'; // Utility function for conditionally applying classes

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname(); // Current URL path
  const params = useParams(); // Dynamic parameters from the URL

  const routes = [
    {
      href: `/${params.storeId}`, // Dynamic URL for each store-settings
      label: 'Overview',
      // The 'active' property Marks the current link as active for styling
      active: pathname === `/${params.storeId}`, // Checks if the current path matches the settings route
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: 'Sizes',
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: 'Colors',
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6 ml-6', className)}
      {...props}>
      {/* Create navigation links using the routes array */}
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',

            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}>
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
