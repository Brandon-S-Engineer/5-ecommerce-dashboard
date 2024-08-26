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

export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth(); // Get userId from authenticated session

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 }); // If not authenticated, return 401
    }

    const { storeId } = params; // Get storeId from request params
    const body = await req.json(); // Parse request body
    const { name } = body; // Extract 'name' from the parsed body

    if (!name) {
      return new NextResponse('Name is Required', { status: 400 }); // If 'name' is missing, return 400
    }
    if (!storeId) {
      return new NextResponse('Store ID is Required', { status: 400 }); // If 'storeId' is missing, return 400
    }

    // Update store where storeId and userId match
    const store = await prismadb.store.updateMany({
      where: {
        id: storeId,
        userId,
      },
      data: {
        name,
      },
    });

    //? Return updated store as JSON tothe client Update the UI
    return NextResponse.json(store);
  } catch (error: any) {
    console.log(`[STORE_PATCH] `, error); // Log any error that occurs
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

// import prismadb from '@/lib/prismadb';
// import { auth } from '@clerk/nextjs';
// import { NextResponse } from 'next/server';

// export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {
//   try {
//     const { userId } = auth();
//     if (!userId) {
//       return new NextResponse('Unauthorized', { status: 401 });
//     }
//     const { storeId } = params;
//     const body = await req.json();
//     const { name } = body;

//     if (!name) {
//       return new NextResponse('Name is Required', { status: 400 });
//     }
//     if (!storeId) {
//       return new NextResponse('Store ID is Required', { status: 400 });
//     }

//     // find and update store

//     const store = await prismadb.store.updateMany({
//       where: {
//         id: storeId,
//         userId,
//       },
//       data: {
//         name,
//       },
//     });
//     return NextResponse.json(store);
//   } catch (error: any) {
//     console.log(`[STORE_PATCH] `, error);
//     return new NextResponse('Internal Server Error', {
//       status: 500,
//     });
//   }
// }

// export async function DELETE(req: Request, { params }: { params: { storeId: string } }) {
//   try {
//     const { userId } = auth();
//     if (!userId) {
//       return new NextResponse('Unauthorized', { status: 401 });
//     }
//     const { storeId } = params;

//     if (!storeId) {
//       return new NextResponse('Store ID is Required', { status: 400 });
//     }

//     // find and update store

//     const store = await prismadb.store.deleteMany({
//       where: {
//         id: storeId,
//         userId,
//       },
//     });
//     return NextResponse.json(store);
//   } catch (error: any) {
//     console.log(`[STORE_DELETE] `, error);
//     return new NextResponse('Internal Server Error', {
//       status: 500,
//     });
//   }
// }
