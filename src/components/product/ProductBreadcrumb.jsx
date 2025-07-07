import Link from "next/link";
import React from "react";

const ProductBreadcrumb = ({ category, subCategory }) => (
  <div className="text-sm text-gray-500 mb-6">
    <Link href="/">HOME</Link> &gt; <Link href={`/category?categorySlug=${category?.slug}`}><span>{category?.name?.toUpperCase()}</span></Link>&gt; <Link href={`/category?categorySlug=${category?.slug}&subCategorySlug=${subCategory?.slug}`}><span>{subCategory?.name?.toUpperCase()}</span></Link>
  </div>
);
export default ProductBreadcrumb;