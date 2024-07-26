// Import Clerk's middleware helper from the Clerk Next.js server package
import { authMiddleware } from '@clerk/nextjs';

//? This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about
export default authMiddleware({
  publicRoutes: ['/api/:path*'],
});

export const config = {
  // Specify which routes should use the middleware
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
