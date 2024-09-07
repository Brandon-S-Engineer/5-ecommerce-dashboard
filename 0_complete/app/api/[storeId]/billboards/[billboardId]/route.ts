import prismadb from '@/lib/prismadb'; // Importing Prisma database instance
import { auth } from '@clerk/nextjs'; // Importing authentication from Clerk
import { NextResponse } from 'next/server'; // Importing Next.js response utilities

// GET request to fetch a specific billboard by ID
export async function GET(req: Request, { params }: { params: { billboardId: string } }) {
  try {
    if (!params.billboardId) {
      // Check if billboard ID is provided
      return new NextResponse('Billboard id is required', { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      // Fetch the billboard from DB
      where: { id: params.billboardId },
    });

    return NextResponse.json(billboard); // Return the billboard data as JSON
  } catch (error) {
    console.log('[BILLBOARD_GET]', error); // Log errors
    return new NextResponse('Internal error', { status: 500 }); // Return error response
  }
}

// PATCH request to update a specific billboard
export async function PATCH(req: Request, { params }: { params: { storeId: string; billboardId: string } }) {
  try {
    const { userId } = auth(); // Get authenticated user ID
    if (!userId) {
      // Check if user is authenticated
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const { billboardId } = params;
    const body = await req.json(); // Parse request body
    const { label, imageUrl } = body; // Destructure required fields

    if (!label || !imageUrl) {
      // Validate required fields
      return new NextResponse('Label and Image URL are required', { status: 400 });
    }

    if (!params.storeId || !params.billboardId) {
      // Validate params
      return new NextResponse('Store and Billboard IDs are required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      // Check store ownership
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      // Check if the user owns the store
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const billboard = await prismadb.billboard.updateMany({
      // Update the billboard
      where: { id: params.billboardId },
      data: { label, imageUrl },
    });

    return NextResponse.json(billboard); // Return updated billboard data
  } catch (error: any) {
    console.log(`[STORE_PATCH] `, error); // Log errors
    return new NextResponse('Internal Server Error', { status: 500 }); // Return error response
  }
}

// DELETE request to delete a specific billboard
export async function DELETE(req: Request, { params }: { params: { storeId: string; billboardId: string } }) {
  try {
    const { userId } = auth(); // Get authenticated user ID
    if (!userId) {
      // Check if user is authenticated
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.storeId || !params.billboardId) {
      // Validate required fields
      return new NextResponse('Store and Billboard IDs are required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      // Check store ownership
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      // Check if the user owns the store
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const billboard = await prismadb.billboard.deleteMany({
      // Delete the billboard
      where: { id: params.billboardId },
    });

    return NextResponse.json(billboard); // Return deleted billboard data
  } catch (error: any) {
    console.log(`[BILLBOARDS_DELETE] `, error); // Log errors
    return new NextResponse('Internal Server Error', { status: 500 }); // Return error response
  }
}

// import prismadb from '@/lib/prismadb';
// import { auth } from '@clerk/nextjs';
// import { NextResponse } from 'next/server';

// export async function GET(req: Request, { params }: { params: { billboardId: string } }) {
//   try {
//     if (!params.billboardId) {
//       return new NextResponse('Billboard id is required', { status: 400 });
//     }

//     const billboard = await prismadb.billboard.findUnique({
//       where: {
//         id: params.billboardId,
//       },
//     });

//     return NextResponse.json(billboard);
//   } catch (error) {
//     console.log('[BILLBOARD_GET]', error);
//     return new NextResponse('Internal error', { status: 500 });
//   }
// }

// export async function PATCH(
//   req: Request,
//   {
//     params,
//   }: {
//     params: {
//       storeId: string;
//       billboardId: string;
//     };
//   }
// ) {
//   try {
//     const { userId } = auth();
//     if (!userId) {
//       return new NextResponse('Unauthorized', { status: 401 });
//     }
//     const { billboardId } = params;
//     const body = await req.json();
//     const { label, imageUrl } = body;

//     if (!label) {
//       return new NextResponse('Label is Required', { status: 400 });
//     }

//     if (!imageUrl) {
//       return new NextResponse('Image URL is Required', { status: 400 });
//     }

//     if (!params.storeId) {
//       return new NextResponse('Store ID is Required', { status: 400 });
//     }
//     if (!params.billboardId) {
//       return new NextResponse('Billboard ID is Required', { status: 400 });
//     }

//     const storeByUserId = await prismadb.store.findFirst({
//       where: {
//         id: params.storeId,
//         userId,
//       },
//     });

//     if (!storeByUserId) {
//       return new NextResponse('Unauthorized', { status: 403 });
//     }

//     // find and update billboard

//     const billboard = await prismadb.billboard.updateMany({
//       where: {
//         id: params.billboardId,
//       },
//       data: {
//         label,
//         imageUrl,
//       },
//     });

//     return NextResponse.json(billboard);
//   } catch (error: any) {
//     console.log(`[STORE_PATCH] `, error);
//     return new NextResponse('Internal Server Error', {
//       status: 500,
//     });
//   }
// }

// export async function DELETE(req: Request, { params }: { params: { storeId: string; billboardId: string } }) {
//   try {
//     const { userId } = auth();
//     if (!userId) {
//       return new NextResponse('Unauthorized', { status: 401 });
//     }
//     const { storeId } = params;

//     if (!storeId) {
//       return new NextResponse('Store ID is Required', { status: 400 });
//     }

//     if (!params.billboardId) {
//       return new NextResponse('Billboard ID is Required', { status: 400 });
//     }

//     const storeByUserId = await prismadb.store.findFirst({
//       where: {
//         id: params.storeId,
//         userId,
//       },
//     });

//     if (!storeByUserId) {
//       return new NextResponse('Unauthorized', { status: 403 });
//     }

//     // find and update store

//     const billboard = await prismadb.billboard.deleteMany({
//       where: {
//         id: params.billboardId,
//       },
//     });
//     return NextResponse.json(billboard);
//   } catch (error: any) {
//     console.log(`[BILLBOARDS_DELETE] `, error);
//     return new NextResponse('Internal Server Error', {
//       status: 500,
//     });
//   }
// }
