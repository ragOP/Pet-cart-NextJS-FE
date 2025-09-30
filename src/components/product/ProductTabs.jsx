import React, { useState } from "react";
import ProductReviews from "./ProductReviews";
import { Plus, Minus } from "lucide-react";

const ProductTabs = ({ items }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedTabs, setExpandedTabs] = useState(new Set([0])); // Product Details (index 0) open by default

  const toggleTab = (index) => {
    const newExpandedTabs = new Set(expandedTabs);
    if (expandedTabs.has(index)) {
      newExpandedTabs.delete(index);
    } else {
      newExpandedTabs.add(index);
    }
    setExpandedTabs(newExpandedTabs);
  };

  const renderContent = (content, title) => {
    if (typeof content === 'object' && content !== null) {
      // Check if it's reviews data
      if (content.reviews && Array.isArray(content.reviews)) {
        return (
          <ProductReviews 
            reviews={content}
            productName="Product"
            productId={content.productId}
          />
        );
      }
      
      // Special styling for Additional Information
      if (title === "Additional Information") {
        return (
          <div className="border border-orange-300 rounded-lg bg-white mb-4">
            <div className="p-4 space-y-0">
              {Object.entries(content).map(([key, value], index) =>
                value ? (
                  <div key={key} className={`py-3 ${index !== Object.keys(content).length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <div className="flex flex-col">
                      <div className="font-semibold text-gray-700 text-sm mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </div>
                      <div className="text-gray-600 text-sm">
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
      
      // Default object rendering for other sections
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
    <div className="w-full mt-8">
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
  );
};

export default ProductTabs;
