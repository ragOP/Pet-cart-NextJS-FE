import React from "react";
import CartItem from "./CartItem";
import PrimaryLoader from "../loaders/PrimaryLoader";
import PrimaryEmptyState from "../empty-states/PrimaryEmptyState";

const CartList = ({ items, onQtyChange, onRemove, onNavigateToProduct, isLoading, qtyChangeLoadingIds, deleteLoadingIds }) => {

  return (
    <div className="flex flex-col gap-4 h-full w-full">
    {isLoading ? (
      <div className="flex justify-center w-full h-full">
        <PrimaryLoader />
      </div>
    ) : (
      items.length > 0 ? (
        items.map((item) => (
          <CartItem key={item._id} item={item} onQtyChange={onQtyChange} onRemove={onRemove} onNavigateToProduct={onNavigateToProduct} qtyChangeLoadingIds={qtyChangeLoadingIds} deleteLoadingIds={deleteLoadingIds}/>
        ))
      ) : (
        <PrimaryEmptyState title="Your cart is empty" />
      )
    )}
  </div>
)
}

export default CartList;
