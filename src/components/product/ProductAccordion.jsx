import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const AccordionItem = ({ title, children, open, onClick }) => (
  <div className="bg-white rounded-xl mb-3 shadow-none border-2 border-yellow-500">
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

  console.log("items", items)

  return (
    <div className="w-full mt-8">
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          title={item.title}
          open={openIndex === idx}
          onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
        >
          {typeof item.content === 'object' && item.content !== null ? (
            <div className="space-2">
              {Object.entries(item.content).map(([key, value]) =>
                value ? (
                  <div key={key} className="flex flex-col py-1 sm:flex-row gap-2">
                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:{" "}</span>
                    <span>{value}</span>
                  </div>
                ) : null
              )}
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          )}
        </AccordionItem>
      ))}
    </div>
  );
};

export default ProductAccordion;
