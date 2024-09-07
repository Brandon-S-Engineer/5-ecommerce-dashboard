import prismadb from '@/lib/prismadb'; // Prisma client instance from a custom path
import { auth } from '@clerk/nextjs'; // auth function to get the authenticated user's details
import { NextResponse } from 'next/server'; // NextResponse to handle responses

// export async function POST(req: Request, { params }: { params: { storeId: string } }) {
export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const body = await req.json(); // Parse the request body as JSON
    const { userId } = auth(); // Retrieve the user ID from the authentication that use clerk

    const { label, imageUrl } = body; // Extract label and imageUrl from the body

    /* ------------------------------- Conditions ------------------------------- */
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 }); // Return 401 if 'userId' is missing
    }

    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    // Store ID exists for authenticated user
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unautorized', { status: 403 });
    }

    /* --------------------------- Create a New Store --------------------------- */
    // Properties defined in the schema
    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard); // Return the created store as a JSON response
  } catch (error) {
    console.log(`[Billboards > route.ts] ${error}`, error); // Log the error for debugging

    return new NextResponse('Internal Server Error', { status: 500 }); // Return 500 if there's a server error
  }
}
