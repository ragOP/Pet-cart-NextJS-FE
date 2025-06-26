import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const AccordionItem = ({ title, children, open, onClick }) => (
  <div className="bg-white rounded-xl mb-3 shadow-none border-none">
    <button
      className="w-full cursor-pointer flex items-center justify-between px-6 py-5 focus:outline-none"
      onClick={onClick}
      aria-expanded={open}
    >
      <span className="text-lg font-semibold text-gray-900">{title}</span>
      {open ? (
        <Minus className="w-6 h-6 text-gray-900" />
      ) : (
        <Plus className="w-6 h-6 text-gray-900" />
      )}
    </button>
    {open && (
      <div className="px-6 pb-5 text-gray-700 text-base animate-fade-in">
        {children}
      </div>
    )}
  </div>
);

const ProductAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full mt-8">
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          title={item.title}
          open={openIndex === idx}
          onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default ProductAccordion;
