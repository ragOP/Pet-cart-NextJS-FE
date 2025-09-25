import Link from "next/link";
import React from "react";

const ProductBreadcrumb = ({ category, subCategory }) => (
  <div className="text-sm text-black-600 mb-2 px-4">
    <Link href="/">HOME</Link> &gt; <Link href={`/category?categorySlug=${category?.slug}`}><span>{category?.name?.toUpperCase()}</span></Link>&gt; <Link href={`/category?categorySlug=${category?.slug}&subCategorySlug=${subCategory?.slug}`}><span className="font-[600]">{subCategory?.name?.toUpperCase()}</span></Link>
  </div>
);
export default ProductBreadcrumb;