'use client';

import Link from 'next/link'; // Link component for navigation.
import { useParams, usePathname } from 'next/navigation'; // Hooks for getting URL parameters and current path.

import { cn } from '@/lib/utils'; // Utility function for conditionally applying classes.

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname(); // Gets the current URL path.
  const params = useParams(); // Gets the dynamic parameters from the URL.

  const routes = [
    {
      href: `${params.storeId}/settings`, // Dynamic URL for each store-settings
      label: 'Settings', // Label for the UI for navigation

      // The 'active' property Marks the current link as active for styling
      active: pathname === `/${params.storeId}/settings`, // Checks if the current path matches the settings route
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
