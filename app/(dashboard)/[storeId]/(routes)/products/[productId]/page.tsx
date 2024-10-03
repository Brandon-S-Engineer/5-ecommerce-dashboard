import prismadb from '@/lib/prismadb';
import { ProductForm } from './components/product-form';
import { Product, Category, Size, Color, Image } from '@prisma/client'; // Include Image type for correct typing

// Define types for ProductPageProps
interface ProductPageProps {
  params: {
    productId: string;
    storeId: string;
  };
}

// Extend the Product type to include images as an array of Image objects
type ProductWithImages = Product & {
  images: Image[]; // Use the Image type from Prisma
};

const ProductPage = async ({ params }: ProductPageProps) => {
  let product: ProductWithImages | null = null;
  let categories: Category[] = [];
  let sizes: Size[] = [];
  let colors: Color[] = [];

  // Check if the productId is valid (24 characters for MongoDB ObjectId)
  if (params.productId.length === 24) {
    try {
      // Fetch product data, including associated images
      product = await prismadb.product.findFirst({
        where: {
          id: params.productId,
        },
        include: {
          images: true, // This includes the full Image objects
        },
      });
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }

  try {
    // Fetch categories, sizes, and colors in parallel for the provided storeId
    [categories, sizes, colors] = await Promise.all([
      prismadb.category.findMany({
        where: {
          storeId: params.storeId,
        },
      }),
      prismadb.size.findMany({
        where: {
          storeId: params.storeId,
        },
      }),
      prismadb.color.findMany({
        where: {
          storeId: params.storeId,
        },
      }),
    ]);
  } catch (error) {
    console.error('Error fetching product-related data:', error);
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductForm
          initialData={product} // Pass product data or null for new product
          categories={categories} // Categories fetched based on storeId
          sizes={sizes} // Sizes fetched based on storeId
          colors={colors} // Colors fetched based on storeId
        />
      </div>
    </div>
  );
};

export default ProductPage;
