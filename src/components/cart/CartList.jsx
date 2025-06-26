import React from "react";
import CartItem from "./CartItem";

const CartList = ({ items, onQtyChange, onRemove }) => (
  <div className="flex flex-col gap-4 w-full">
    {items.map((item) => (
      <CartItem key={item.id} item={item} onQtyChange={onQtyChange} onRemove={onRemove} />
    ))}
  </div>
);

export default CartList;
