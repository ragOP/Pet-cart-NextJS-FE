import Link from "next/link";
import React from "react";

const ProductBreadcrumb = ({ category, subCategory }) => {
  return (
    <div className="text-sm text-gray-500 mb-6">
      <Link href="/">HOME</Link> &gt; <span>{category?.toUpperCase()}</span> &gt; <span>{subCategory?.toUpperCase()}</span>
    </div>
  );
}

export default ProductBreadcrumb;