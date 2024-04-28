"use client";

import { Product } from "@/payload-types";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";

interface AddToCartButtonProps {
  product: Product;
}
const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState<Boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isSuccess]);
  return (
    <Button
      onClick={() => {
        setIsSuccess(true);
        addItem(product);
      }}
      size={"lg"}
      className="w-full">
      {isSuccess ? "Added!" : "Add to cart"}{" "}
    </Button>
  );
};

export default AddToCartButton;
