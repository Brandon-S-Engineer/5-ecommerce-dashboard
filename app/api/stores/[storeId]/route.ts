import prismadb from '@/lib/prismadb'; // Prisma client instance
import { auth } from '@clerk/nextjs'; // Authentication
import { NextResponse } from 'next/server'; // Custom HTTP Error/Success Responses

/* ------------------------------ Patch Handler ----------------------------- */
export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {
  try {
    // 1. Authenticate user
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 }); // Return if user not authenticated
    }

    // 2. Parse request body
    const body = await req.json();
    const { name } = body;

    // 3. Check if 'name' is provided
    if (!name) {
      return new NextResponse('Name is Required', { status: 400 }); // Return if 'name' missing
    }

    // 4. Extract 'storeId' from params
    const { storeId } = params;

    // 5. Check if 'storeId' is provided
    if (!storeId) {
      return new NextResponse('Store ID is Required', { status: 400 }); // Return if 'storeId' missing
    }

    // 6. Update store where storeId and userId match
    // updateMany method provided by prisma
    const store = await prismadb.store.updateMany({
      where: {
        id: storeId,
        userId,
      },

      data: {
        name,
      },
    });

    //? Return updated store as JSON to the client for UI Update
    return NextResponse.json(store);
  } catch (error: any) {
    console.log(`[Stores > [storeId] > route.ts, PATCH] ${error}`, error); // Log the error for debugging
    return new NextResponse('Internar Error', { status: 500 });
  }
}

/* ----------------------------- Delete Handler ----------------------------- */
export async function DELETE(req: Request, { params }: { params: { storeId: string } }) {
  try {
    // 1. Authenticate user
    const { userId } = auth(); // Get user ID from authenticated session
    if (!userId) {
      return new NextResponse('Unautorized', { status: 401 }); // Return if user not authenticated
    }

    // 2. Extract 'storeId' from params
    const { storeId } = params;

    // 3. Check if storeId exists
    if (!storeId) {
      return new NextResponse('Store ID is Required', { status: 400 }); // Return if 'stireId' is missing
    }

    // 6. Update Store where storeId and userID match
    const store = await prismadb.store.deleteMany({
      where: {
        id: storeId,
        userId,
      },
    });

    //? Return updated store as JSON to the client for UI Update
    return NextResponse.json(store);
  } catch (error: any) {
    console.log('[Stores > [storeId] > route.ts, DELETE]', error); // Internal Server Error
    return new NextResponse('Internal server error', { status: 500 }); // Send err to the client for UI update
  }
}
