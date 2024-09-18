// Import Clerk's middleware helper from the Clerk Next.js server package
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/api/:path*'], // Specifies routes that are publicly accessible (do not require authentication)
});

export const config = {
  // Specify which routes should use the middleware
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
