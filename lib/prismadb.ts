import { PrismaClient } from '@prisma/client';

// Declare a global variable 'prisma' that can be undefined or a PrismaClient instance
declare global {
  var prisma: PrismaClient | undefined;
}

// Use the existing PrismaClient instance if available globally, or create a new one
const prismadb = globalThis.prisma || new PrismaClient();

// In non-production environments, assign the PrismaClient instance to globalThis.prisma
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prismadb;
}

// Export the PrismaClient instance for use in the project
export default prismadb;
