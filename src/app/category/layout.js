import CategoryBreadcrumb from "@/components/category/Breadcrumb";

export default function CategoryLayout({ children }) {
  return (
    <div className="">
      <CategoryBreadcrumb />
      {children}
    </div>
  );
}
