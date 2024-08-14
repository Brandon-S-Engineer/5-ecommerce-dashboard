import prismadb from '@/lib/prismadb'; // Import Prisma client instance from a custom path
import { auth } from '@clerk/nextjs'; // Import auth function to get the authenticated user's details
import { NextResponse } from 'next/server'; // Import NextResponse to handle responses

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the request body as JSON

    const { userId } = auth(); // Retrieve the user ID from the authentication that use clerk
    const { name } = body; // Extract the 'name' field from the body

    /* ------------------------------- Conditions ------------------------------- */
    if (!userId) {
      return new NextResponse('Name is required', { status: 400 }); // Return 400 if 'userId' is missing
    }

    if (!name) {
      return new NextResponse('Bad Request', { status: 400 }); // Return 400 if 'name' is missing
    }

    /* -------------------------------------------------------------------------- */
    /*                             Create a New Store                             */
    /* -------------------------------------------------------------------------- */
    // in the database using Prisma and return the store data to the client
    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store); // Return the created store as a JSON response
  } catch (error) {
    console.log(`[Stores > route.ts] ${error}`, error); // Log the error for debugging

    return new NextResponse('Internal Server Error', { status: 500 }); // Return 500 if there's a server error
  }
}
