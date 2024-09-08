import prismadb from '@/lib/prismadb'; // Prisma client instance
import { auth } from '@clerk/nextjs'; // Authentication helper from Clerk
import { NextResponse } from 'next/server';

//? GET request
export async function GET(req: Request, { params }: { params: { billboardId: string } }) {
  try {
    if (!params.billboardId) {
      return new NextResponse('Billboard ID is required', { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: { id: params.billboardId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

//? PATCH request
export async function PATCH(req: Request, { params }: { params: { storeId: string; billboardId: string } }) {
  try {
    const { userId } = auth();
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
      where: {
        id: params.storeId,
        userId,
      },
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
    return new NextResponse('Internal Server Error', { status: 500 }); // 500 for internal server errors
  }
}

//? DELETE request
export async function DELETE(req: Request, { params }: { params: { storeId: string; billboardId: string } }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse('Billboard ID is Required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    // Delete store where billboardId and userId match
    const billboard = await prismadb.store.deleteMany({
      where: {
        id: params.billboardId,
        userId,
      },
    });

    return NextResponse.json(billboard); // Return deleted store as JSON
  } catch (error: any) {
    console.log(`[BILLBOARD_DELETE] `, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
