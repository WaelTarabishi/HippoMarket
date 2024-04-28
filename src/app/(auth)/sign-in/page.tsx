"use client";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCredentialsValidator } from "@/lib/validators/account-credntials-validators";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");

  const continueAsSeller = () => {
    router.push("?as=seller");
  };
  const continueAsBuyer = () => {
    router.replace("/sign-in", undefined);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof AuthCredentialsValidator>>({
    resolver: zodResolver(AuthCredentialsValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate: SignIn, isLoading } = trpc.auth.SignIn.useMutation({
    onSuccess: () => {
      toast.success("Signed in successfully ");
      router.refresh();
      if (origin) {
        router.push(`/${origin}`);
        return;
      }
      if (isSeller) {
        router.push(`/sell`);
        return;
      }
      router.push("/");
    },
    onError: (err) => {
      if (err?.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password.");
      }
    },
  });

  const onSubmit = ({
    email,
    password,
  }: z.infer<typeof AuthCredentialsValidator>) => {
    SignIn({ email, password });
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">
              Sign in to your {isSeller ? "seller" : ""} account
            </h1>
            <Link
              href={"/sign-up"}
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5 s",
              })}>
              Dont&apos;t have an account?
              <ArrowRight className="h-4 w-4 mt-1  " />
            </Link>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    placeholder="you@example.com"
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    {...register("password")}
                    placeholder="Password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm  ">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <Button type="submit">
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin"></Loader2>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </div>
            </form>
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
            {isSeller ? (
              <Button
                onClick={continueAsBuyer}
                variant="secondary"
                disabled={isLoading}>
                Continue as customer
              </Button>
            ) : (
              <Button
                onClick={continueAsSeller}
                variant="secondary"
                disabled={isLoading}>
                Continue as seller
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
