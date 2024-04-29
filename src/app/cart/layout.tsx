import { constructMetadata } from "@/lib/utils";
import React from "react";

export const metadata = constructMetadata({ title: "DigitalHippo - Cart" });

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
