import prismadb from '@/lib/prismadb'; // Prisma client instance
import { auth } from '@clerk/nextjs'; // Import authentication helper from Clerk
import { NextResponse } from 'next/server'; // Import Next.js response object

// PATCH handler to update store
// { params }: | Destructuring, coming from the

// {
//   params: {
//     storeId: "some-id" // storeId is a string inside the params object
//   }
// }

//? PATCH request to update specific billboard
export async function PATCH(req: Request, { params }: { params: { storeId: string; billboardId: string } }) {
  try {
    const { userId } = auth();
    const { storeId } = params;
    const body = await req.json(); // Parse request body
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 }); // If not authenticated, return 401
    }

    if (!label) {
      return new NextResponse('Label is Required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image URL is requires', { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse('Billboard ID is Required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      // Check store ownership
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    // Update billboard
    const billboard = await prismadb.billboard.updateMany({
      where: { id: params.billboardId },
      data: { label, imageUrl },
    });

    //? Return updated billboard as JSON to the client Update the UI
    return NextResponse.json(billboard);
  } catch (error: any) {
    console.log(`[BILLBOARD_PATCH] `, error);
    return new NextResponse('Internal Server Error', { status: 500 }); // Return 500 for internal server errors
  }
}

/* --------------------- DELETE handler to delete store --------------------- */
export async function DELETE(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth(); // Get userId from authenticated session
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 }); // If not authenticated, return 401
    }

    const { storeId } = params; // Get storeId from request params

    if (!storeId) {
      return new NextResponse('Store ID is Required', { status: 400 }); // If 'storeId' is missing, return 400
    }

    // Delete store where storeId and userId match
    const store = await prismadb.store.deleteMany({
      where: {
        id: storeId,
        userId,
      },
    });
    return NextResponse.json(store); // Return deleted store as JSON
  } catch (error: any) {
    console.log(`[STORE_DELETE] `, error); // Log any error that occurs
    return new NextResponse('Internal Server Error', { status: 500 }); // Return 500 for internal server errors
  }
}
