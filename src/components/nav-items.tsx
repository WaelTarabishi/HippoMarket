"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useState } from "react";
import NavItem from "./nav-item";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  return (
    <div className="flex gap-4 h-full items-center">
      {PRODUCT_CATEGORIES.map((category, index) => {
        const handleOpen = () => {
          if (activeIndex === index) setActiveIndex(null);
          else setActiveIndex(index);
        };
        const isAnyOpen = activeIndex !== null;
        const isOpen = index === activeIndex;

        return (
          <NavItem
            category={category}
            handleOpen={handleOpen}
            isAnyOpen={isAnyOpen}
            isOpen={isOpen}
            key={category.value}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
