import React, { useState } from "react";
import ProductReviews from "./ProductReviews";
import { Plus, Minus } from "lucide-react";

const ProductTabs = ({ items }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedTabs, setExpandedTabs] = useState(new Set([0]));

  const toggleTab = (index) => {
    const newExpandedTabs = new Set(expandedTabs);
    if (expandedTabs.has(index)) {
      newExpandedTabs.delete(index);
    } else {
      newExpandedTabs.add(index);
    }
    setExpandedTabs(newExpandedTabs);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const renderContent = (content, title) => {
    if (typeof content === 'object' && content !== null) {
      if (content.reviews && Array.isArray(content.reviews)) {
        return (
          <ProductReviews
            reviews={content}
            productName="Product"
            productId={content.productId}
          />
        );
      }

      if (title === "Additional Information") {
        return (
          <div className="rounded-lg bg-white mb-4">
            <div className="space-y-0">
              {Object.entries(content).map(([key, value], index) =>
                value ? (
                  <div key={key} className={`py-3 ${index !== Object.keys(content).length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <div className="flex items-center">
                      <div className="font-semibold text-gray-700 text-sm">
                        {key === 'productName' ? 'Product name' : key.replace(/([A-Z])/g, ' $1').trim()}:
                      </div>
                      <div className="text-gray-600 text-sm ml-2">
                        {value}
                      </div>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        );
      }

      return (
        <div className="py-4 space-y-2">
          {Object.entries(content).map(([key, value]) =>
            value ? (
              <div key={key} className="flex flex-col sm:flex-row sm:items-center py-1 border-b border-gray-200 last:border-b-0">
                <div className="w-full sm:w-1/3 font-medium text-gray-700 capitalize mb-1 sm:mb-0">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </div>
                <div className="w-full sm:w-2/3 text-gray-900">
                  {value}
                </div>
              </div>
            ) : null
          )}
        </div>
      );
    }
    return (
      <div
        className="prose prose-sm max-w-none bg-white py-4"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  return (
    <div className="w-full mt-4 px-[10%]">
      {/* Desktop Tab Design */}
      <div className="hidden md:block">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Tab Headers */}
          <div className="flex gap-2 p-2 border-b border-gray-200 justify-center">
            {items.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = activeTab === index;

              return (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={`flex items-center gap-2 px-4 cursor-pointer py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                    ? 'bg-orange-100 text-orange-400 border border-orange-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent'
                    }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="px-6 py-3">
            {renderContent(items[activeTab].content, items[activeTab].title)}
          </div>
        </div>
      </div>

      {/* Mobile Accordion Design */}
      <div className="md:hidden">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {items.map((item, index) => {
            const IconComponent = item.icon;
            const isExpanded = expandedTabs.has(index);
            const isLastTab = index === items.length - 1;

            return (
              <div key={index}>
                {/* Tab Header */}
                <button
                  onClick={() => toggleTab(index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                      <IconComponent className="w-4 h-4 text-gray-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-base">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                    {isExpanded ? (
                      <Minus className="w-4 h-4 text-gray-600" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                </button>

                {/* Tab Content */}
                {isExpanded && (
                  <div className={`px-6 ${!isLastTab ? 'border-b border-gray-200' : ''}`}>
                    {renderContent(item.content, item.title)}
                  </div>
                )}

                {/* Separator line between tabs (except for the last tab) */}
                {!isExpanded && !isLastTab && (
                  <div className="border-b border-gray-200"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
