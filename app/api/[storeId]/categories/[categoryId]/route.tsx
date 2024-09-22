import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

import { NextResponse } from 'next/server';

//? GET request
export async function GET(req: Request, { params }: { params: { categoryId: string } }) {
  try {
    if (!params.categoryId) {
      return new NextResponse('Category ID is required', { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: { id: params.categoryId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

//? PATCH request
export async function PATCH(req: Request, { params }: { params: { storeId: string; categoryId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json(); // Parse request body
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 }); // If not authenticated, return 401
    }

    if (!name) {
      return new NextResponse('Name is Required', { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse('Billboard ID is required', { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse('Category ID is Required', { status: 400 });
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

    // Update category
    const category = await prismadb.category.updateMany({
      where: { id: params.categoryId },
      data: { name, billboardId },
    });

    //? Return updated billboard as JSON to the client Update the UI
    return NextResponse.json(category);
  } catch (error: any) {
    console.log(`[CATEGORY_PATCH] `, error);
    return new NextResponse('Internal Server Error', { status: 500 }); // 500 for internal server errors
  }
}

//? DELETE request
export async function DELETE(req: Request, { params }: { params: { storeId: string; categoryId: string } }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse('Category ID is Required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    // Delete store where billboardId and userId match
    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category); // Return deleted store as JSON
  } catch (error: any) {
    console.log(`[CATEGORY_DELETE] `, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
