import prismadb from '@/lib/prismadb';

// Function to get total revenue for a specific store
export const getTotalRevenue = async (storeId: string) => {
  // 1. Fetch all paid orders for the given store
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  // 2. Calculate the total revenue
  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      // Directly add the item.product.price to the orderSum
      return orderSum + item.product.price;
    }, 0);

    // Add the current order total to the overall total
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
