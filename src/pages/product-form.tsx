import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useCreateProductMutation,
  useCreateSizeMutation,
  useGetSizesQuery,
} from "@/store/products/products";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactCreateSelect from "react-select/creatable";
import ReactSelect from "react-select";
import UploadImages from "@/components/essentials/upload-images";
import { useGetColorsQuery } from "@/store/color/color";
import { Textarea } from "@/components/ui/textarea";
import { useGetCategoriesQuery } from "@/store/category/category";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.string().min(1, {
    message: "Price must be at least 1 character.",
  }),
  currency: z.string().min(1, {
    message: "Currency must be at least 1 character.",
  }),
  colorIDs: z.array(
    z.string().min(1, {
      message: "Colors must be at least 1 character.",
    })
  ),
  sizeIDs: z.array(
    z.string().min(1, {
      message: "Sizes must be at least 1 character.",
    })
  ),
  images: z.array(
    z.string().min(1, {
      message: "Images must be at least 1 character.",
    })
  ),
  categoryID: z.string().min(1, {
    message: "Category must be at least 1 character.",
  }),
});

const ProductForm = () => {
  const {
    data: colors,
    isLoading: isColorsLoading,
    isError: isColorsError,
  } = useGetColorsQuery();
  const {
    data: sizes,
    isLoading: isSizesLoading,
    isError: isSizesError,
    refetch,
  } = useGetSizesQuery();
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategoriesQuery();
  const [isPending, startTransition] = useTransition();
  const [createSize] = useCreateSizeMutation();
  const [createProduct] = useCreateProductMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      currency: "",
      colorIDs: [],
      sizeIDs: [],
      images: [],
      categoryID: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      createProduct({
        categoryID: values.categoryID,
        name: values.name,
        description: values.description,
        price: parseFloat(values.price),
        currency: values.currency,
        colorIDs: values.colorIDs,
        sizeIDs: values.sizeIDs,
        images: values.images,
      })
        .then((result) => {
          if (result.data?.status === "success") {
            form.reset();
            toast.success("Product created successfully");
          }
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  }

  const colorsOptions = colors?.data.map((color) => ({
    value: color._id,
    label: color.name,
  }));

  const sizesOptions = sizes?.data.map((size) => ({
    value: size._id,
    label: size.variant,
  }));

  const categoriesOptions = categories?.data.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  if (isColorsLoading || isSizesLoading || isCategoriesLoading) {
    return <div>Loading...</div>;
  }

  if (isColorsError || isSizesError || isCategoriesError) {
    return <div>Error</div>;
  }

  return (
    <>
      <h4 className="text-xl font-semibold pb-4">Create a product</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
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
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Currency type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["USD", "EUR", "GBP", "INR"].map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <h4 className="py-2">Colors</h4>
              <ReactSelect
                isMulti
                options={colorsOptions}
                styles={{
                  indicatorSeparator: () => ({
                    display: "none",
                  }),
                }}
                placeholder="Colors"
                onChange={(selectedOptions) => {
                  form.setValue(
                    "colorIDs",
                    selectedOptions.map((option) => option.value)
                  );
                }}
              />
            </div>
            <div>
              <h4 className="py-2">Sizes</h4>
              <ReactCreateSelect
                isMulti
                options={sizesOptions}
                onCreateOption={async (inputValue) => {
                  const res = await createSize({
                    variant: inputValue,
                  });
                  if (res.data?.status === "success") {
                    refetch();
                  }
                }}
                onChange={(selectedOptions) => {
                  form.setValue(
                    "sizeIDs",
                    selectedOptions.map((option) => option.value)
                  );
                }}
                styles={{
                  indicatorSeparator: () => ({
                    display: "none",
                  }),
                }}
                placeholder="Sizes"
              />
            </div>
          </div>

          <div>
            <h4 className="py-2">Category</h4>
            <ReactSelect
              options={categoriesOptions}
              placeholder="Category"
              onChange={(selectedOption) => {
                if (!selectedOption) return;
                form.setValue("categoryID", selectedOption.value);
              }}
              styles={{
                indicatorSeparator: () => ({
                  display: "none",
                }),
              }}
            />
          </div>

          <div>
            <h4 className="py-2">Upload Images</h4>
            <UploadImages
              onChange={(images) => {
                form.setValue("images", images);
              }}
              value={form.getValues("images")}
              disable={isPending}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
