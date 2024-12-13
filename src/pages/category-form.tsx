import { useState } from "react";
import { useCreateCategoryMutation } from "@/store/category/category";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import SuccessMessage from "@/components/essentials/success-handler";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  image: z.string().url({
    message: "Please enter a valid URL for the image.",
  }),
});

const CategoryForm = () => {
  const [isPending, startTransition] = useTransition();
  const [createCategory] = useCreateCategoryMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSuccess(false);
    startTransition(() => {
      createCategory(values).then((result) => {
        if (result.data?.status === "success") {
          setIsSuccess(true);
          form.reset();
        }
      });
    });
  };

  return (
    <Card className="border-none">
      <CardHeader className="p-0 py-4">
        <CardTitle>Create Category</CardTitle>
        <CardDescription>
          Add a new category to your collection.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of your category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter category description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe your category in a few sentences.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image URL" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a URL for the category image.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="p-0 py-4">
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={isPending}
          className="w-full"
        >
          {isPending ? "Creating..." : "Create Category"}
        </Button>
      </CardFooter>
      {isSuccess && <SuccessMessage message="Category created successfully!" />}
    </Card>
  );
};

export default CategoryForm;
