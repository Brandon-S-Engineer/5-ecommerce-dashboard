import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stipe';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  // 1. Read the request body and Stripe signature from headers
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    // 2. Verify the webhook using Stripe's SDK
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // 3. Extract session and customer details
  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  // 4. Format the address into a string
  const addressComponents = [address?.line1, address?.line2, address?.city, address?.postal_code, address?.country];
  const addressString = addressComponents.filter((c) => c !== null).join(', ');

  // 5. Handle completed session and update order details
  if (event.type === 'checkout.session.completed') {
    const order = await prismadb.order.update({
      where: { id: session?.metadata?.orderId },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || '',
      },
      include: { orderItems: true },
    });

    // 6. Update related product data
    const productIds = order.orderItems.map((orderItem) => orderItem.productId);

    await prismadb.product.updateMany({
      where: { id: { in: [...productIds] } },
      data: { isArchived: true },
    });
  }

  // 7. Return a successful response
  return new NextResponse(null, { status: 200 });
}
