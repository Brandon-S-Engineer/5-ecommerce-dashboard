'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

import { Modal } from '@/components/ui/modal'; // Modal component
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useStoreModal } from '@/hooks/use-store-modal'; // Custom Hook that uses zustand for global state management
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Store name is required.' }).max(50),
});

export const StoreModal = () => {
  const storeModal = useStoreModal(); // Accessing the custom hook

  const [loading, setLoading] = useState(false);

  // Define the Form using useForm Hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Zod schema for validation
    defaultValues: {
      name: '',
    },
  });

  /* ---------------------- Asynchronous Submit Handler: ---------------------- */
  // A function that processes the form values upon submission, ensuring they are validated and type-safe.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('values', values);
    try {
      setLoading(true); // request is in progress

      //? Make a POST request to the '/api/stores' endpoint with the form values using axios
      const response = await axios.post('/api/stores', values);

      // Redirect the user to the new store page using the ID from the response
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      // request is complete
      setLoading(false);
    }
  };

  return (
    <Modal
      title='Create Store'
      description='Add a new store to manage products and categories'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}>
      <div>
        <div>
          {/* Pass the form methods and properties to the Form component */}
          <Form {...form}>
            {/* Form tag with handleSubmit to validate and handle form submission */}
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8'>
              {/* FormField component to handle the username field */}
              <FormField
                control={form.control} // Bind form control to the field
                name='name'
                render={({ field }) => (
                  // The field object contains auto generated: name, value, onChange, onBlur
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    {/* Message component to display validation messages */}
                    <FormMessage />

                    {/* Control wrapper for the input */}
                    <FormControl>
                      {/* Input component with placeholder and binding to form control */}
                      <Input
                        disabled={loading}
                        placeholder='Store Name Here...'
                        {...field}
                      />
                    </FormControl>

                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                  </FormItem>
                )}
              />

              <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                <Button
                  disabled={loading}
                  variant='outline'
                  onClick={storeModal.onClose}>
                  Cancel
                </Button>

                <Button
                  disabled={loading}
                  type='submit'>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

//? https://ui.shadcn.com/docs/components/form
