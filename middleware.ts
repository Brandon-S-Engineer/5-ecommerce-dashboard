// Import Clerk's middleware helper from the Clerk Next.js server package
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

// Configuration for the middleware
export const config = {
  // Specify which routes should use the middleware
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
