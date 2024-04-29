import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
// import { webpackBundler } from "@payloadcms/bundler-webpack";
import { viteBundler } from "@payloadcms/bundler-vite";

import path from "path";
import dontenv from "dotenv";
import { Products } from "./collections/products/product";
import { Media } from "./collections/media";
import { ProductFiles } from "./collections/ProductFile";
import { Orders } from "./collections/Orders";
import { Users } from "./collections/Users";
dontenv.config({
  path: path.resolve(__dirname, "../env"),
});

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [Users, Products, Media, ProductFiles, Orders],
  routes: {
    admin: "/sell",
  },
  admin: {
    user: "users",
    bundler: viteBundler(),
    meta: {
      titleSuffix: "- DigitalHippo",
      ogImage: "/thumbnail.jpg",
    },
  },
  rateLimit: {
    max: 200,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
