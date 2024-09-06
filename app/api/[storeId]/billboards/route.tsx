import prismadb from '@/lib/prismadb'; // Prisma client instance from a custom path
import { auth } from '@clerk/nextjs'; // auth function to get the authenticated user's details
import { NextResponse } from 'next/server'; // NextResponse to handle responses

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the request body as JSON
    const { userId } = auth(); // Retrieve the user ID from the authentication that use clerk

    const { label, imageUrl } = body; // Extract label and imageUrl from the body

    /* ------------------------------- Conditions ------------------------------- */
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 }); // Return 401 if 'userId' is missing
    }

    if (!label) {
      return new NextResponse('Label is required', { status: 400 }); // Return 400 if 'name' is missing
    }

    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 }); // Return 400 if 'name' is missing
    }

    /* --------------------------- Create a New Store --------------------------- */
    // Properties defined in the schema
    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.
      },
    });

    return NextResponse.json(store); // Return the created store as a JSON response
  } catch (error) {
    console.log(`[Stores > route.ts] ${error}`, error); // Log the error for debugging

    return new NextResponse('Internal Server Error', { status: 500 }); // Return 500 if there's a server error
  }
}
