import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import CartItemMobile from "./CartItemMobile";
import CartItemSkeleton from "./CartItemSkeleton";
import CartItemMobileSkeleton from "./CartItemMobileSkeleton";
import PrimaryLoader from "../loaders/PrimaryLoader";
import PrimaryEmptyState from "../empty-states/PrimaryEmptyState";

const CartList = ({ items, onQtyChange, onRemove, onNavigateToProduct, isLoading, qtyChangeLoadingIds, deleteLoadingIds }) => {
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
        <PrimaryEmptyState title="Your cart is empty" />
      )
    )}
  </div>
)
}

export default CartList;
