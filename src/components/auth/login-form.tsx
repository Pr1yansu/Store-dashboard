import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLoginMutation } from "@/store/users/user";
import { toast } from "sonner";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [login] = useLoginMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      login(formData)
        .then((result) => {
          if (result.data?.status === "success") {
            toast.success(result.data.message);
            window.location.href = "/products";
          } else {
            toast.error("Invalid credentials");
          }
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <Button className="w-full mt-6" type="submit" disabled={isPending}>
            Log In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
