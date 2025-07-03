import React from "react";
import CartItem from "./CartItem";

const CartList = ({ items, onQtyChange, onRemove, onNavigateToProduct }) => (
  <div className="flex flex-col gap-4 w-full">
    {items.map((item) => (
      <CartItem key={item._id} item={item} onQtyChange={onQtyChange} onRemove={onRemove} onNavigateToProduct={onNavigateToProduct} />
    ))}
  </div>
);

export default CartList;
