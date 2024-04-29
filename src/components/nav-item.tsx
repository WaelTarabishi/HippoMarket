"use client";
import { PRODUCT_CATEGORIES } from "@/config";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import React from "react";

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}
const NavItem = ({ category, handleOpen, isAnyOpen, isOpen }: NavItemProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{category.label}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[700px] grid-cols-3 gap-6 p-4  ">
              {category.featured.map((item) => (
                <div
                  key={item.name}
                  className="group relative w-full  text-base sm:text-sm">
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                    <Image
                      src={item.imageSrc}
                      alt="product category image"
                      fill
                      className="object-cover object-center absolute inset-0 w-full h-full"
                    />
                  </div>
                  <Link
                    href={item.href}
                    className="mt-6 block font-medium text-gray-900">
                    {item.name}
                  </Link>
                  <p className="mt-1" aria-hidden="true">
                    Shop now
                  </p>
                </div>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavItem;
