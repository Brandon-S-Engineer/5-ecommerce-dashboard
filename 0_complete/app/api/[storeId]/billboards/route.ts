import prismadb from '@/lib/prismadb'; // Prisma client instance from a custom path
import { auth } from '@clerk/nextjs'; // auth function to get the authenticated user's details
import { NextResponse } from 'next/server'; // NextResponse to handle responses

// Function to handle POST requests for creating a new billboard
export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const body = await req.json(); // Parse the request body as JSON
    const { userId } = auth(); // Retrieve the user ID from the authentication that use Clerk

    const { label, imageUrl } = body; // Extract label and imageUrl from the body

    /* ------------------------------- Conditions ------------------------------- */
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 }); // Return 401 if 'userId' is missing
    }

    if (!label) {
      return new NextResponse('Label is required', { status: 400 }); // Return 400 if 'label' is missing from the body
    }

    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 }); // Return 400 if 'imageUrl' is missing from the body
    }

    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 }); // Return 400 if 'storeId' is missing from the URL parameters
    }

    // Check if the store exists and belongs to the authenticated user
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId, // Match the store ID from the parameters
        userId, // Ensure the store belongs to the authenticated user
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 }); // Return 403 if the store does not belong to the user
    }

    /* -------------------------- Create a New Billboard -------------------------- */
    // Create a new billboard using the properties defined in the schema
    const billboard = await prismadb.billboard.create({
      data: {
        label, // Set the billboard label
        imageUrl, // Set the billboard image URL
        storeId: params.storeId, // Associate the billboard with the provided store ID
      },
    });

    return NextResponse.json(billboard); // Return the created billboard as a JSON response
  } catch (error) {
    console.log(`[Billboards > route.ts, POST] ${error}`, error); // Log the error for debugging

    return new NextResponse('Internal Server Error', { status: 500 }); // Return 500 if there's a server error
  }
}

// Function to handle GET requests for retrieving billboards for a specific store
export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  try {
    // Uncomment if user-specific filtering is needed
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse('Unauthenticated', { status: 401 });
    // }

    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 }); // Return 400 if 'storeId' is missing from the URL parameters
    }

    // Retrieve all billboards associated with the provided store ID
    const billboard = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId, // Match the store ID from the parameters
      },
    });

    return NextResponse.json(billboard); // Return the list of billboards as a JSON response
  } catch (error) {
    console.log(`[Billboards > route.ts, GET] ${error}`, error); // Log the error for debugging

    return new NextResponse('Internal Server Error', { status: 500 }); // Return 500 if there's a server error
  }
}

// import prismadb from '@/lib/prismadb';
// import { auth } from '@clerk/nextjs';
// import { NextResponse } from 'next/server';

// export async function POST(req: Request, { params }: { params: { storeId: string } }) {
//   try {
//     const { userId } = auth(); // we have access to the user id here that wants to create new store using our api

//     const body = await req.json();
//     const { label, imageUrl } = body;

//     if (!userId) {
//       return new NextResponse('Unautheticated', { status: 401 });
//     }
//     if (!label) {
//       return new NextResponse('Label is required', { status: 400 });
//     }
//     if (!imageUrl) {
//       return new NextResponse('Image URL is required', { status: 400 });
//     }

//     if (!params.storeId) {
//       return new NextResponse('Store ID is required', { status: 400 });
//     }

//     //! check if the storeId exists for the authenticated user

//     const storeByUserId = await prismadb.store.findFirst({
//       where: {
//         id: params.storeId,
//         userId,
//       },
//     });

//     if (!storeByUserId) {
//       return new NextResponse('Unauthorized', { status: 403 });
//     }
//     // create new billboard using prisma client instance and return the billboard data to the client

//     const billboard = await prismadb.billboard.create({
//       data: {
//         label,
//         imageUrl,
//         storeId: params.storeId,
//       },
//     });

//     return NextResponse.json(billboard);
//   } catch (error) {
//     console.log(`[BILLBOARDS_POST] ${error}`, error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }

// // Getting all the billboards for a store by storeId

// export async function GET(req: Request, { params }: { params: { storeId: string } }) {
//   try {
//     const { userId } = auth(); // we have access to the user id here that wants to create new store using our api

//     if (!userId) {
//       return new NextResponse('Unautheticated', { status: 401 });
//     }

//     if (!params.storeId) {
//       return new NextResponse('Store ID is required', { status: 400 });
//     }

//     // get all the billboards for the storeId

//     const billboards = await prismadb.billboard.findMany({
//       where: {
//         storeId: params.storeId,
//       },
//     });

//     return NextResponse.json(billboards);
//   } catch (error) {
//     console.log(`[BILLBOARDS_GET] ${error}`, error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }
