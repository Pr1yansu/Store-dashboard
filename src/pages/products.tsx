import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "./product-form";
import ColorForm from "./color-form";
import CategoryForm from "./category-form";
import { ListFilterPlus, LogOut, PaintBucket, ShoppingBag } from "lucide-react";
import { useTransition } from "react";
import { useLogoutMutation } from "@/store/users/user";

const Products = () => {
  const [isPending, startTransition] = useTransition();
  const [logout] = useLogoutMutation();
  return (
    <div className="flex justify-center items-center min-h-screen gap-2 flex-wrap max-w-screen-sm mx-auto">
      <Dialog modal={false}>
        <DialogTrigger asChild>
          <Button>
            <ShoppingBag size={24} />
            Create Product
          </Button>
        </DialogTrigger>
        <DialogContent onInteractOutside={(event) => event.preventDefault()}>
          <DialogHeader>
            <ProductForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <ListFilterPlus size={24} />
            Create Category
          </Button>
        </DialogTrigger>
        <DialogContent>
          <CategoryForm />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PaintBucket size={24} />
            Create Color
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <ColorForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Button
        variant={"destructive"}
        onClick={() => {
          startTransition(() => {
            logout().then(() => {
              window.location.href = "/";
            });
          });
        }}
        disabled={isPending}
      >
        <LogOut size={24} />
        Logout
      </Button>
    </div>
  );
};

export default Products;
