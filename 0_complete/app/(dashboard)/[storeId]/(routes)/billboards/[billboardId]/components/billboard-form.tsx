'use client';

import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Heading from '@/components/ui/heading';
import ImageUpload from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useOrigin } from '@/hooks/use-origin';
import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

interface BillboardFormProps {
  initialData: Billboard | null;
}

// formSchema -> BillboardFormValues -> BillboardForm using react hook form -> onSubmit -> update store
const formSchema = z.object({
  label: z.string().min(3).nonempty(),
  imageUrl: z.string().url(),
});

type BillboardFormValues = z.infer<typeof formSchema>;

export const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Billboard' : 'Create Billboard';

  const description = initialData ? 'Edit your billboard' : 'Create a new billboard';

  const toastMessage = initialData ? 'Billboard updated successfully' : 'Billboard created successfully';

  const action = initialData ? 'Save Changes' : 'Create Billboard';

  const origin = useOrigin();
  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: '',
    },
  });

  // onDelete -> delete store -> refresh page -> redirect to root page (root layout will check if user has store and open createStore Modal if not found -> create store page will check if user has store and redirect to dashboard if found )

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);

      //& if initialData is true then we are updating the store else we are creating a new store (initialData is null)

      if (initialData) {
        await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
      router.refresh();
      router.push('/');
      toast.success('Billboard deleted successfully');
    } catch (error) {
      toast.error('Make sure you removed all categories using this billboard first. ');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className='flex items-center justify-between'>
        <Heading
          title={title}
          description={description}
        />

        {initialData && (
          <Button
            disabled={loading}
            variant='destructive'
            size='icon'
            onClick={() => setOpen(true)}>
            <Trash className='h-4 w-4' />
          </Button>
        )}
      </div>
      <Separator />

      {/* Form  and spreading the form using react hook form */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'>
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Billboard label'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            className='ml-auto'
            type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

// 'use client';

// import { AlertModal } from '@/components/modals/alert-modal'; // Component for modal alerts
// import { Button } from '@/components/ui/button';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'; // Form components
// import Heading from '@/components/ui/heading'; // Heading component for titles and descriptions
// import ImageUpload from '@/components/ui/image-upload'; // ImageUpload component for uploading images
// import { Input } from '@/components/ui/input';
// import { Separator } from '@/components/ui/separator';
// import { useOrigin } from '@/hooks/use-origin';
// import { zodResolver } from '@hookform/resolvers/zod'; // Resolver for form validation using Zod schema
// import { Billboard } from '@prisma/client'; // Billboard type from Prisma client
// import axios from 'axios';
// import { Trash } from 'lucide-react'; // Trash icon
// import { useParams, useRouter } from 'next/navigation'; // Hooks for navigation

// import { useState } from 'react';
// import { useForm } from 'react-hook-form'; // useForm hook for managing form state
// import toast from 'react-hot-toast'; // Notifications
// import { z } from 'zod'; // Zod for creating validation schemas

// // Define form schema using Zod
// const formSchema = z.object({
//   label: z.string().min(3).nonempty(), // Label must be at least 3 characters
//   imageUrl: z.string().url(), // Image URL must be a valid URL
// });

// type BillboardFormValues = z.infer<typeof formSchema>; // Infer TypeScript type from schema

// interface BillboardFormProps {
//   initialData: Billboard | null; // Props for optional initial data
// }

// export const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
//   const params = useParams(); // Dynamic route parameters
//   const router = useRouter(); // Navigation

//   const [open, setOpen] = useState(false); // Manage modal visibility
//   const [loading, setLoading] = useState(false); // Manage  loading status

//   const title = initialData ? 'Edit Billboard' : 'Create Billboard'; // Dynamic title based on initialData presence
//   const description = initialData ? 'Edit your billboard' : 'Create a new billboard'; // Dynamic description
//   const toastMessage = initialData ? 'Billboard updated successfully' : 'Billboard created successfully'; // Dynamic toast message
//   const action = initialData ? 'Save Changes' : 'Create Billboard'; // Button label

//   const origin = useOrigin(); // Custom hook for origin data

//   const form = useForm<BillboardFormValues>({
//     resolver: zodResolver(formSchema), // Use Zod schema for form validation
//     defaultValues: initialData || { label: '', imageUrl: '' }, // Set default form values
//   });

//   const onSubmit = async (data: BillboardFormValues) => {
//     try {
//       setLoading(true); // Set loading state

//       if (initialData) {
//         await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
//       } else {
//         // If creating, send a POST request
//         await axios.post(`/api/${params.storeId}/billboards`, data);
//       }

//       router.refresh(); // Refresh the current page
//       router.push(`/${params.storeId}/billboards`); // Redirect to billboards page
//       toast.success(toastMessage); // Show success message
//     } catch (error) {
//       toast.error('Something went wrong'); // Show error message
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   const onDelete = async () => {
//     try {
//       setLoading(true); // Set loading state
//       await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`); // Send DELETE request
//       router.refresh(); // Refresh the current page
//       router.push('/'); // Redirect to root page
//       toast.success('Billboard deleted successfully'); // Show success message
//     } catch (error) {
//       toast.error('Make sure you removed all categories using this billboard first.'); // Show specific error message
//     } finally {
//       setLoading(false); // Reset loading state
//       setOpen(false); // Close modal
//     }
//   };

//   return (
//     <>
//       <AlertModal
//         isOpen={open} // Control modal visibility
//         onClose={() => setOpen(false)} // Handle modal close
//         onConfirm={onDelete} // Handle delete action
//         loading={loading} // Pass loading state to modal
//       />
//       <div className='flex items-center justify-between'>
//         <Heading
//           title={title} // Display dynamic title
//           description={description} // Display dynamic description
//         />
//         {initialData && (
//           <Button
//             disabled={loading} // Disable button while loading
//             variant='destructive' // Style as destructive button
//             size='icon'
//             onClick={() => setOpen(true)} // Open delete modal
//           >
//             <Trash className='h-4 w-4' /> {/* Trash icon */}
//           </Button>
//         )}
//       </div>
//       <Separator />

//       {/* Render form using react-hook-form */}
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)} // Handle form submission
//           className='space-y-8 w-full'>
//           <FormField
//             control={form.control} // Hook form control
//             name='imageUrl' // Field name
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Background image</FormLabel>
//                 <FormControl>
//                   <ImageUpload
//                     value={field.value ? [field.value] : []} // Display uploaded images
//                     disabled={loading} // Disable while loading
//                     onChange={(url) => field.onChange(url)} // Handle image change
//                     onRemove={() => field.onChange('')} // Handle image removal
//                   />
//                 </FormControl>
//                 <FormMessage /> {/* Show field errors */}
//               </FormItem>
//             )}
//           />
//           <div className='grid grid-cols-3 gap-8'>
//             <FormField
//               control={form.control} // Hook form control
//               name='label' // Field name
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Label</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={loading} // Disable input while loading
//                       placeholder='Billboard label' // Placeholder text
//                       {...field} // Spread field props
//                     />
//                   </FormControl>
//                   <FormMessage /> {/* Show field errors */}
//                 </FormItem>
//               )}
//             />
//           </div>
//           <Button
//             disabled={loading} // Disable button while loading
//             className='ml-auto'
//             type='submit' // Submit button
//           >
//             {action} {/* Dynamic button label */}
//           </Button>
//         </form>
//       </Form>
//     </>
//   );
// };
