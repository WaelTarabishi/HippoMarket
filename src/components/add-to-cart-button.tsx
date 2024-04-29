"use client";

import { Product } from "@/payload-types";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addItem, items } = useCart();
  const [isSuccess, setIsSuccess] = useState<Boolean>(false);

  const handleAddToCart = () => {
    //Verify if the item is in the cart
    const isProductInCart = items.some(
      (item) => item.product.id === product.id
    );

    if (!isProductInCart) {
      toast.success("Product added to cart successfully.");
      addItem(product);
      setIsSuccess(true);
    } else {
      toast.error("Product already in cart.");
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isSuccess]);
  return (
    <Button onClick={handleAddToCart} size={"lg"} className="w-full">
      {isSuccess ? "Added!" : "Add to cart"}{" "}
    </Button>
  );
};

export default AddToCartButton;
