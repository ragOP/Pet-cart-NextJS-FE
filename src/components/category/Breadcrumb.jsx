import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function CategoryBreadcrumb() {
  return (
    <div className="text-sm text-muted-foreground space-x-2 px-6 flex uppercase">
      <div className="border-r-2 pr-4 py-7 flex space-x-1 justify-center items-center text-xs">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-[#6A6868]" asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="text-[#6A6868]" asChild> 
                <Link href="/category">Category</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage >Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* <div className="h-full w-1 p-1 bg-[#C3C3C3]" /> */}
      <div className="flex items-center justify-center space-x-2"> 
        <Image src="/product-icon.png" alt="paws-logo" width={20} height={20} />
        <span className="text-xl"><span className="font-bold text-black">
          500
          </span> Products</span>
      </div>
    </div>
  )
}
