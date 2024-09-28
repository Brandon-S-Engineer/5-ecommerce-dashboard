import prismadb from '@/lib/prismadb';
import { ColorForm } from './components/color-form';

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  let color = null; // Default value for new color

  // Check if it's an existing color or a new one
  if (params.colorId !== 'new') {
    try {
      // Fetch color data only if it's not a "new" color
      color = await prismadb.color.findFirst({
        where: {
          id: params.colorId,
        },
      });
    } catch (error) {
      console.error('Error fetching color:', error);
    }
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ColorForm initialData={color} /> {/* Pass fetched color or null for new color */}
      </div>
    </div>
  );
};

export default ColorPage;

//! Check this component
