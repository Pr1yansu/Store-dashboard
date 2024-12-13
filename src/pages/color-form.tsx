import { useState } from "react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import SuccessMessage from "@/components/essentials/success-handler";
import { useCreateColorMutation } from "@/store/color/color";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  hex: z.string().min(7, {
    message: "Hex must be at least 7 characters.",
  }),
});

const ColorForm = () => {
  const [isPending, startTransition] = useTransition();
  const [createColor] = useCreateColorMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      hex: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSuccess(false);
    startTransition(() => {
      createColor(values).then((result) => {
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
        <CardTitle>Create Color</CardTitle>
        <CardDescription>Add a new color to your collection.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter color label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="hex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter color label"
                      type="color"
                      {...field}
                    />
                  </FormControl>
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
      {isSuccess && <SuccessMessage message="Color created successfully!" />}
    </Card>
  );
};

export default ColorForm;
