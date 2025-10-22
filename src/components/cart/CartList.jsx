import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import CartItemMobile from "./CartItemMobile";
import CartItemSkeleton from "./CartItemSkeleton";
import CartItemMobileSkeleton from "./CartItemMobileSkeleton";
import PrimaryEmptyState from "../empty-states/PrimaryEmptyState";
import { useRouter } from "next/navigation";

const CartList = ({ items, onQtyChange, onRemove, onNavigateToProduct, isLoading, qtyChangeLoadingIds, deleteLoadingIds }) => {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      {isLoading ? (
        // Show skeleton loaders instead of spinner
        Array.from({ length: 3 }).map((_, index) =>
          isMobile ? (
            <CartItemMobileSkeleton key={index} />
          ) : (
            <CartItemSkeleton key={index} />
          )
        )
      ) : (
        items.length > 0 ? (
          items.map((item) =>
            isMobile ? (
              <CartItemMobile
                key={item._id}
                item={item}
                onQtyChange={onQtyChange}
                onRemove={onRemove}
                onNavigateToProduct={onNavigateToProduct}
                qtyChangeLoadingIds={qtyChangeLoadingIds}
                deleteLoadingIds={deleteLoadingIds}
              />
            ) : (
              <CartItem
                key={item._id}
                item={item}
                onQtyChange={onQtyChange}
                onRemove={onRemove}
                onNavigateToProduct={onNavigateToProduct}
                qtyChangeLoadingIds={qtyChangeLoadingIds}
                deleteLoadingIds={deleteLoadingIds}
              />
            )
          )
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full py-12 animate-fade-in">
            <PrimaryEmptyState title="Your Cart is Empty" subtitle="Looks like you haven't added anything to your cart yet." buttonText="Start Shopping" buttonOnClick={() => router.push('/category')} />

          </div>
        )
      )}
    </div >
  )
}

export default CartList;
