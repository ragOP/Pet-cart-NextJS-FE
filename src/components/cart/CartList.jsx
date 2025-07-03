import React from "react";
import CartItem from "./CartItem";
import PrimaryLoader from "../loaders/PrimaryLoader";

const CartList = ({ items, onQtyChange, onRemove, onNavigateToProduct, isLoading, qtyChangeLoading }) => (
  <div className="flex flex-col gap-4 h-full w-full">
    {isLoading ? (
      <div className="flex justify-center w-full h-full">
        <PrimaryLoader />
      </div>
    ) : (
      items.map((item) => (
        <CartItem key={item._id} item={item} onQtyChange={onQtyChange} onRemove={onRemove} onNavigateToProduct={onNavigateToProduct} qtyChangeLoading={qtyChangeLoading} />
      ))
    )}
  </div>
);

export default CartList;
