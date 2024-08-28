'use client';

import { AlertModal } from '@/components/modals/alert-modal'; // Import AlertModal component for confirmation modals
import { ApiAlert } from '@/components/ui/api-alert'; // Import ApiAlert for showing API-related alerts
import { Button } from '@/components/ui/button'; // Import Button component
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'; // Import form components for structure and validation
import Heading from '@/components/ui/heading'; // Import Heading component for titles
import { Input } from '@/components/ui/input'; // Import Input component for input fields
import { Separator } from '@/components/ui/separator'; // Import Separator for UI division
import { useOrigin } from '@/hooks/use-origin'; // Custom hook for origin URL
import { zodResolver } from '@hookform/resolvers/zod'; // Zod resolver for validation with react-hook-form
import axios from 'axios'; // Axios for HTTP requests
import { Trash } from 'lucide-react'; // Icon for trash/delete button
import { useParams, useRouter } from 'next/navigation'; // React Router hooks for navigation and params

import { useState } from 'react'; // State management for loading, modal, etc.
import { useForm } from 'react-hook-form'; // react-hook-form for form handling
import toast from 'react-hot-toast'; // Toast notifications
import { z } from 'zod'; // Zod for schema validation

interface SettingsFormProps {
  initialData: any;
}

// Schema definition for validation using Zod
const formSchema = z.object({
  name: z.string().min(3).max(25).nonempty(), // Validation: String, between 3-25 characters, non-empty
});

// Type inference for form values from the schema
type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams(); // Hook to access URL parameters
  const router = useRouter(); // Hook to manage navigation and refreshing

  const [open, setOpen] = useState(false); // Modal state management
  const [loading, setLoading] = useState(false); // Loading state for buttons and forms
  const origin = useOrigin(); // Get the origin URL using custom hook

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema), // Use zodResolver for form validation
    defaultValues: initialData, // Initialize form with provided data
  });

  // Submit handler for form submission
  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);

      /* ------------------------------ Update Store ------------------------------ */
      await axios.patch(`/api/stores/${params.storeId}`, data); // via API

      router.refresh(); // Refresh the page after success

      toast.success('Store updated successfully'); // Success notification
    } catch (error) {
      toast.error('Something went wrong'); // Error notification
    } finally {
      setLoading(false);
    }
  };

  /* --------------------- Handler for deleting the store --------------------- */
  const onDelete = async () => {
    try {
      setLoading(true); // Set loading state
      await axios.delete(`/api/stores/${params.storeId}`); // Delete store via API
      router.refresh(); // Refresh the page after success
      router.push('/'); // Redirect to root page after deletion
      toast.success('Store deleted successfully'); // Success notification
    } catch (error) {
      toast.error('Make sure you removed all products and categories first'); // Error notification if dependent data exists
    } finally {
      setLoading(false); // Reset loading state
      setOpen(false); // Close modal
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open} // Modal visibility controlled by state
        onClose={() => setOpen(false)} // Close modal handler
        onConfirm={onDelete} // Delete confirmation handler
        loading={loading} // Pass loading state to modal
      />
      <div className='flex items-center justify-between'>
        <Heading
          title='Settings' // Page title
          description='Manage your store settings' // Page description
        />
        <Button
          disabled={loading} // Disable button when loading
          variant='destructive' // Styling variant for destructive action
          size='icon' // Icon size for button
          onClick={() => setOpen(true)}>
          <Trash className='h-4 w-4' /> {/* Trash icon inside button */}
        </Button>
      </div>
      <Separator />
      {/* Form wrapping react-hook-form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)} // Form submission handler
          className='space-y-8 w-full'>
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control} // Control from react-hook-form
              name='name' // Field name for validation and form data
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel> {/* Label for input */}
                  <FormControl>
                    <Input
                      disabled={loading} // Disable input when loading
                      placeholder='Store Name' // Placeholder text
                      {...field} // Spread field props from react-hook-form
                    />
                  </FormControl>
                  <FormMessage /> {/* Validation message display */}
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading} // Disable submit button when loading
            className='ml-auto'
            type='submit'>
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator /> {/* UI separator */}
      <ApiAlert
        title='NEXT_PUBLIC_API_URL' // Title for API alert
        description={`${origin}/api/${params.storeId}`} // Dynamic API URL display
        variant='public' // Public API alert variant
      />
    </>
  );
};

// 'use client';

// import { AlertModal } from '@/components/modals/alert-modal';
// import { ApiAlert } from '@/components/ui/api-alert';
// import { Button } from '@/components/ui/button';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import Heading from '@/components/ui/heading';
// import { Input } from '@/components/ui/input';
// import { Separator } from '@/components/ui/separator';
// import { useOrigin } from '@/hooks/use-origin';
// import { zodResolver } from '@hookform/resolvers/zod';
// import axios from 'axios';
// import { Trash } from 'lucide-react';
// import { useParams, useRouter } from 'next/navigation';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { z } from 'zod';

// interface SettingsFormProps {
//   initialData: any;
// }

// // formSchema -> SettingsFormValues -> SettingsForm using react hook form -> onSubmit -> update store
// const formSchema = z.object({
//   name: z.string().min(3).max(25).nonempty(),
// });

// type SettingsFormValues = z.infer<typeof formSchema>;

// export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
//   const params = useParams();
//   const router = useRouter();

//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const origin = useOrigin();
//   const form = useForm<SettingsFormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: initialData,
//   });

//   // onDelete -> delete store -> refresh page -> redirect to root page (root layout will check if user has store and open createStore Modal if not found -> create store page will check if user has store and redirect to dashboard if found )

//   const onSubmit = async (data: SettingsFormValues) => {
//     try {
//       setLoading(true);
//       // Update store
//       await axios.patch(`/api/stores/${params.storeId}`, data);

//       router.refresh();
//       toast.success('Store updated successfully');
//     } catch (error) {
//       toast.error('Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onDelete = async () => {
//     try {
//       setLoading(true);
//       // Delete store
//       await axios.delete(`/api/stores/${params.storeId}`);
//       router.refresh();

//       router.push('/');
//       toast.success('Store deleted successfully');
//     } catch (error) {
//       toast.error('Make sure you removed all products and categories first');
//     } finally {
//       setLoading(false);
//       setOpen(false);
//     }
//   };

//   return (
//     <>
//       <AlertModal
//         isOpen={open}
//         onClose={() => setOpen(false)}
//         onConfirm={onDelete}
//         loading={loading}
//       />
//       <div className='flex items-center justify-between'>
//         <Heading
//           title='Settings'
//           description='Manage your store settings'
//         />

//         <Button
//           disabled={loading}
//           variant='destructive'
//           size='icon'
//           onClick={() => setOpen(true)}>
//           <Trash className='h-4 w-4' />
//         </Button>
//       </div>
//       <Separator />

//       {/* Form  and spreading the form using react hook form */}

//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className='space-y-8 w-full'>
//           <div className='grid grid-cols-3 gap-8'>
//             <FormField
//               control={form.control}
//               name='name'
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={loading}
//                       placeholder='Store Name'
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <Button
//             disabled={loading}
//             className='ml-auto'
//             type='submit'>
//             Save Changes
//           </Button>
//         </form>
//       </Form>
//       <Separator />
//       <ApiAlert
//         title='NEXT_PUBLIC_API_URL'
//         description={`${origin}/api/${params.storeId}`}
//         variant='public'
//       />
//     </>
//   );
// };
