'use client';

import * as z from 'zod'; // import { z } from 'zod'; // Zod for schema validation
import axios from 'axios';
import { useState } from 'react';
import { Billboard } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import Heading from '@/components/ui/heading'; // Component for titles
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AlertModal } from '@/components/modals/alert-modal';
import { useOrigin } from '@/hooks/use-origin';
import ImageUpload from '@/components/ui/image-upload';

// Store type is generated by Prisma from the Store model in schema.prisma.
interface BillboardFormProps {
  initialData: Billboard | null;
}

//? (1/4) Schema definition for form validation using Zod
const formSchema = z.object({
  // Validation: String, 3-25 characters, non-empty
  // label: z.string().min(3, { message: 'Store name is required, (min 3 characters).' }).max(25),
  label: z.string().min(1),
  imageUrl: z.string().url(), // Image URL must be valid
});

//? (2/4) Type inference for the values from the schema created with Zod
type BillboardFormValues = z.infer<typeof formSchema>;

export const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
  const params = useParams(); // Hook to access URL parameters (id)
  const router = useRouter(); // Hook to manage navigation and refreshing

  const [open, setOpen] = useState(false); // Modal State
  const [loading, setLoading] = useState(false);

  // Data based on initialData
  const title = initialData ? 'Edit Billboard' : 'Create Billboard';
  const description = initialData ? 'Edit your Billboard' : 'Add a new billboard';
  const toastMessage = initialData ? 'Billboard updated successfully' : 'Billboard created successfully';
  const action = initialData ? 'Save Changes' : 'Create';

  //? (3/4) Setup form validation with useForm
  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema), // Use zodResolver for form validation from schema
    defaultValues: initialData || { label: '', imageUrl: '' }, // Initalize form with provided prop (store name)
  });

  /* -------------------- Submit handler for form submition ------------------- */
  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        /* ----------------------------- Edit Billboard ----------------------------- */
        await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
      } else {
        /* ---------------------------- Create Billboard ---------------------------- */
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }

      router.refresh(); // Refresh page after success
      router.push(`/${params.storeId}/billboards`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }

    console.log(data);
  };

  /* --------------------- Handler for deleting Billboard --------------------- */
  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);

      router.refresh();
      router.push(`/${params.storeId}/billboards`); // Redirect

      toast.success('Billboard deleted successfully');
    } catch (error) {
      toast.error('Make sure you deleted all categories using this billboard first');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)} // Close modal handler
        onConfirm={onDelete} // Delete Handler
        loading={loading}
      />
      <div className='flex items-center justify-between'>
        <Heading
          title={title}
          description={description}
        />

        {/* Render Delete button only if there is data */}
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
      <Separator /> {/* UI separator */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)} //? (4/4)
          className='space-y-8 w-full'>
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='label' // Field name for validation, <Input />
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Billboard Label'
                      {...field} // Spread field props (onChange, onBlur...)
                    />
                  </FormControl>
                  <FormMessage /> {/* Validation Message Display */}
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
