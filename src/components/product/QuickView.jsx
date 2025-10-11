import React, { useState } from 'react';
import CustomImage from '@/components/images/CustomImage';
import { Star, ShoppingCart } from 'lucide-react';
import ProductVariants from './ProductVariants';
import ProductVegIcon from '@/icons/ProductVegIcon';
import ProductNonVegIcon from '@/icons/ProductNonVegIcon';
import { formatPrice } from '@/utils/formatPrice';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const QuickView = ({ product, isOpen, onClose }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    const handleImageHover = (index) => {
        setSelectedImage(index);
    };

    // Combine product images with common images (like product page does)
    const allImages = [
        ...(product.images || []),
        ...(product.commonImages || []),
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="min-w-[80vw] max-w-[80vw] min-h-[70vh] max-h-[90vh] overflow-y-auto p-0" onClick={(e) => e.stopPropagation()}>
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle>Quick View</DialogTitle>
                </DialogHeader>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8" onClick={(e) => e.stopPropagation()}>
                    {/* Product Images - Left Side */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative bg-[#F6F6F6] rounded-lg p-6 border border-[#f19813]">
                            <CustomImage
                                key={selectedImage}
                                src={allImages[selectedImage]}
                                alt={product.title}
                                className="w-full h-80 object-contain"
                                width={500}
                                height={500}
                            />

                            {/* Rating */}
                            {product.ratings?.average > 0 && (
                                <div className="absolute bottom-2 left-2 flex items-center gap-1">
                                    <Star className="h-2.5 w-2.5 fill-amber-400 stroke-amber-400" />
                                    <span className="text-[10px] font-medium text-gray-700">
                                        {product.ratings.average.toFixed(1)}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Image Carousel Row */}
                        {allImages && allImages.length > 1 && (
                            <div className="relative p-4">
                                <Carousel
                                    className="w-full"
                                    opts={{
                                        align: "start",
                                        loop: true,
                                        dragFree: true,
                                    }}
                                >
                                    <CarouselContent className="-mx-2 p-1">
                                        {allImages.map((image, index) => (
                                            <CarouselItem key={index} className="pl-2 basis-auto">
                                                <button
                                                    onClick={() => setSelectedImage(index)}
                                                    className={`w-20 h-20 rounded-lg border-2 transition-all duration-200 ${index === selectedImage
                                                            ? 'border-[#f19813] shadow-md scale-105'
                                                            : 'border-gray-200 hover:border-[#f19813] hover:scale-105'
                                                        } bg-white overflow-hidden`}
                                                >
                                                    <CustomImage
                                                        src={image}
                                                        alt={`${product.title} ${index + 1}`}
                                                        className="w-full h-full object-contain"
                                                        width={100}
                                                        height={100}
                                                    />
                                                </button>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white shadow-lg border-0 z-10" />
                                    <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white shadow-lg border-0 z-10" />
                                </Carousel>
                            </div>
                        )}
                    </div>

                    {/* Product Details - Right Side */}
                    <div className="space-y-6">
                        {/* Brand and Title */}
                        <div>
                            <p className="text-[#F59A11] font-bold text-sm mb-1">
                                {product.brandId?.name || 'Brand'}
                            </p>
                            <h1 className="text-lg font-semibold text-black leading-tight">
                                {product.title}
                            </h1>
                        </div>

                        {/* Price and Veg Icon */}
                        <div className="flex justify-between items-center">
                             <div>
                                 <p className="text-[#218032] text-2xl font-bold mb-1">
                                     ₹{formatPrice(product.salePrice || product.price)}
                                 </p>
                                 {product.price !== product.salePrice && (
                                     <p className="text-gray-500 text-xs line-through">
                                         MRP ₹{formatPrice(product.price)}
                                     </p>
                                 )}
                             </div>
                            <div>
                                {product.isVeg === true && <ProductVegIcon size={24} />}
                                {product.isVeg === false && <ProductNonVegIcon size={24} />}
                            </div>
                        </div>

                        {/* Variants */}
                        <div>
                            <ProductVariants
                                variants={[
                                    {
                                        _id: 'main-product',
                                        productId: product._id,
                                        sku: product.sku,
                                        price: product.price,
                                        salePrice: product.salePrice,
                                        stock: product.stock,
                                        weight: product.weight,
                                        images: product.images,
                                        productLabel: product.productLabel,
                                        attributes: { 'Size': 'Default' },
                                        isMainProduct: true
                                    },
                                    ...(product.variants || [])
                                ]}
                                maxDisplay={9999}
                                showDiscount={true}
                                showAllSelected={true}
                                size="large"
                            />
                        </div>

                        {/* Add to Cart Button */}
                        <div className="pt-4">
                            <button className="w-full bg-[#F59A11] hover:bg-[#e18a0e] text-white py-3 px-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
                                <ShoppingCart className="w-4 h-4" />
                                ADD TO CART
                            </button>
                        </div>

                        {/* Product Description */}
                        {product.description && (
                            <div className="pt-4 border-t border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-900 mb-3">Description</h3>
                                <div
                                    className="text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default QuickView;
