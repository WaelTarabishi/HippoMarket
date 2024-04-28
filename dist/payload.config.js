"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("payload/config");
var db_mongodb_1 = require("@payloadcms/db-mongodb");
var richtext_slate_1 = require("@payloadcms/richtext-slate");
var bundler_webpack_1 = require("@payloadcms/bundler-webpack");
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var product_1 = require("./collections/products/product");
var media_1 = require("./collections/media");
var ProductFile_1 = require("./collections/ProductFile");
var Orders_1 = require("./collections/Orders");
var Users_1 = require("./collections/Users");
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../env"),
});
exports.default = (0, config_1.buildConfig)({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
    collections: [Users_1.Users, product_1.Products, media_1.Media, ProductFile_1.ProductFiles, Orders_1.Orders],
    routes: {
        admin: "/sell",
    },
    admin: {
        user: "users",
        bundler: (0, bundler_webpack_1.webpackBundler)(),
        meta: {
            titleSuffix: "- DigitalHippo",
            ogImage: "/thumbnail.jpg",
        },
    },
    rateLimit: {
        max: 200,
    },
    editor: (0, richtext_slate_1.slateEditor)({}),
    db: (0, db_mongodb_1.mongooseAdapter)({
        url: process.env.MONGODB_URL,
    }),
    typescript: {
        outputFile: path_1.default.resolve(__dirname, "payload-types.ts"),
    },
});
