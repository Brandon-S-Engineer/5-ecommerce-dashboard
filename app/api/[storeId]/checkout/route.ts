import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stipe';
import prismadb from '@/lib/prismadb';

// CORS headers for handling requests across different origins
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handling preflight requests with CORS headers
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Main POST function to create a Stripe checkout session
export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  // Extract product IDs from the request body
  const { productIds } = await req.json();

  // Validate if product IDs are present
  if (!productIds || productIds.length === 0) {
    return new NextResponse('Product IDs are required', { status: 400 });
  }

  // Fetch products based on provided IDs
  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  // Prepare line items for Stripe checkout
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: product.name,
        },
        unit_amount: Math.round(Number(product.price) * 100), // Convert price to cents
      },
    });
  });

  // Create an order in the database
  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: { id: productId },
          },
        })),
      },
    },
  });

  // Create a Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: { enabled: true },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: { orderId: order.id },
  });

  // Return the Stripe session URL for redirection to Stripe to complete payment
  return NextResponse.json({ url: session.url }, { headers: corsHeaders });
}
