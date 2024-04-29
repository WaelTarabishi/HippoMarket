import MaxWidthWrapper from "@/components/max-width-wrapper";
import ProductReel from "@/components/product-reel";
import { PRODUCT_CATEGORIES } from "@/config";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({ title: "DigitalHippo - Products" });

type Param = string | string[] | undefined;

interface ProductsPageProps {
  searchParams: { [key: string]: Param };
}

const parse = (param: Param) => {
  return typeof param === "string" ? param : undefined;
};

const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category
  )?.label;

  return (
    <MaxWidthWrapper>
      <ProductReel
        title={label ?? "Browse high-quality assets"}
        query={{
          category,
          limit: 40,
          sort: sort === "desc" || sort === "asc" ? sort : undefined,
        }}
      />
    </MaxWidthWrapper>
  );
};

export default ProductsPage;
