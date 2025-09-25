"use client";

import React, { useEffect, useState } from "react";
import RequireAuth from "@/components/auth/RequireAuth";
import CartSavingsBanner from "@/components/cart/CartSavingsBanner";
import CartList from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";
import CartCouponSection from "@/components/cart/CartCouponSection";
import PincodeInput from "@/components/pincode/PincodeInput";
import SpecialDeals from "@/components/cart/SpecialDeals";
import LastMinuteAddOns from "@/components/cart/LastMinuteAddOns";
import CategoryBanner from "@/components/category/CategoryBanner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCart } from "@/app/apis/getCart";
import { addProductToCart } from "@/app/apis/addProductToCart";
import { getCoupons } from "@/app/apis/getCoupons";
import { getAddresses } from "@/app/apis/getAddresses";
import { createOrder } from "@/app/apis/createOrder";
import { checkDelivery } from "@/app/apis/checkDelivery";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/cookies/getCookie";
import { setCookie } from "@/utils/cookies/setCookie";
import CheckoutDialog from "@/components/cart/CheckoutDialog";
import { apiService } from "../apis/apiService";
import AddressSelection from "@/components/cart/AddressSelection";

const CartPage = () => {
  const [pincode, setPincode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [qtyChangeLoadingIds, setQtyChangeLoadingIds] = useState([]);
  const [deleteLoadingIds, setDeleteLoadingIds] = useState([]);
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false);
  const [deliveryLoading, setDeliveryLoading] = useState(false);
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();
  const [params, setParams] = useState({
    address_id: getCookie("addressId"),
    coupon_id: appliedCoupon,
  });
  const width = window.innerWidth;
  const type = width > 1024 ? "web" : width > 768 ? "tablet" : "mobile";

  const {
    data: cartData,
    isLoading: cartLoading,
    isError: cartError,
  } = useQuery({
    queryKey: ["cart", params],
    queryFn: () => getCart({ params }),
    select: (res) => res?.data || null,
  });

  const user = localStorage.getItem("persist:auth");
  const userData = JSON.parse(user)?.user;

  const { data: couponsData } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => getCoupons(),
    select: (res) => res?.data?.data || [],
  });

  const { data: addressesData } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => getAddresses(),
    select: (data) => data?.data || [],
  });

  const { mutate: addToCart } = useMutation({
    mutationFn: (payload) => addProductToCart(payload),
    onSuccess: (res) => {
      if (res?.success) {
        toast.success(res?.message || "Cart updated successfully", {
          position: "top-right",
        });
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      } else {
        toast.error(res?.message || "Failed to update cart", {
          position: "top-right",
        });
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Request failed", {
        position: "top-right",
      });
    },
  });

  const { mutate: createOrderMutation } = useMutation({
    mutationFn: (payload) => createOrder({ data: payload }),
    onSuccess: (res) => {
      if (res?.success) {
        toast.success("Order Placed", {
          description: "Your order has been placed successfully.",
          position: "top-right",
        });
        setAppliedCoupon(null);
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        router.push(`/account/orders`);
      } else {
        toast.error("Failed to create order", {
          description: res?.message || "Failed to create order",
          position: "top-right",
        });
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Request failed", {
        position: "top-right",
      });
    },
  });

  const handleQtyChange = (productId, variantId, quantity) => {
    const id = variantId || productId;
    setQtyChangeLoadingIds((prev) => [...prev, id]);

    const prevQty =
      cartData?.items?.find((item) =>
        variantId
          ? item.variantId === variantId
          : item.productId._id === productId
      )?.quantity || 0;

    const newQty = prevQty + quantity;

    addToCart(
      { productId, variantId, quantity: newQty },
      {
        onSettled: () => {
          setQtyChangeLoadingIds((prev) =>
            prev.filter((loadingId) => loadingId !== id)
          );
        },
      }
    );
  };

  const handleRemove = (productId, variantId) => {
    const id = variantId || productId;
    setDeleteLoadingIds((prev) => [...prev, id]);

    addToCart(
      { productId, variantId, quantity: 0 },
      {
        onSettled: () => {
          setDeleteLoadingIds((prev) =>
            prev.filter((loadingId) => loadingId !== id)
          );
        },
      }
    );
  };

  const handleApplyCoupon = (couponId) => {
    setAppliedCoupon(couponId);
    setParams((prev) => ({ ...prev, coupon_id: couponId }));
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setParams((prev) => ({ ...prev, coupon_id: null }));
  };

  const onCheckDelivery = async () => {
    if (!pincode || pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }

    setDeliveryLoading(true);
    try {
      const response = await checkDelivery({
        pincode: pincode,
        productId: cartData?.items?.[0]?.productId?._id || null,
      });
      
      if (response?.success) {
        setExpectedDeliveryDate(response?.data || "Available for delivery");
        toast.success("Delivery available for this pincode!");
      } else {
        setExpectedDeliveryDate("Not available for delivery");
        toast.error(response?.message || "Delivery not available for this pincode");
      }
    } catch (error) {
      console.error("Delivery check error:", error);
      setExpectedDeliveryDate("Error checking delivery");
      toast.error("Failed to check delivery. Please try again.");
    } finally {
      setDeliveryLoading(false);
    }
  };

  const onNavigateToProduct = (id) => {
    router.push(`/product/${id}`);
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js").then(
      (result) => {
        if (result) {
          console.log("Razorpay script loaded successfully");
        }
      }
    );
  }, []);


  const handleConfirmCheckout = async ({ note, addressId }) => {
    console.log("addressId", addressId);
    try {
      const res = await apiService({
        endpoint: "api/razorpay/create-payment",
        method: "POST",
        data: {
          cartId: cartData?._id,
          couponId: appliedCoupon,
          addressId,
          note,
        },
      });
      const data = res.response.data;

      console.log(data, "data");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: data.amount,
        currency: data.currency,
        name: "Pet Caart",
        description: "Order Payment",
        order_id: data.orderId,
        handler: function (response) {
          createOrderMutation({
            cartId: cartData?._id,
            couponId: appliedCoupon,
            addressId,
            note,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });
        },
        prefill: {
          name: userData?.name,
          email: userData?.email,
          contact: userData?.phone,
        },
        theme: {
          color: "#00BFA5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice =
    cartData?.items?.reduce((acc, item) => acc + item.total, 0) || 0;
  const shipping = cartData?.shippingDetails?.totalCost || 0;
  const finalPayableAmount = cartData?.total_price || 0;
  const estimatedDeliveryDate = cartData?.shippingDetails?.estimatedDate || "N/A";
  // const couponDiscount = Math.max(finalPayableAmount - discountPrice, 0);

  const { cgst, sgst, igst, cess } = cartData?.items?.reduce(
    (acc, item) => {
      acc.cgst += item.cgst || 0;
      acc.sgst += item.sgst || 0;
      acc.igst += item.igst || 0;
      acc.cess += item.cess || 0;
      return acc;
    },
    { cgst: 0, sgst: 0, igst: 0, cess: 0 }
  ) || { cgst: 0, sgst: 0, igst: 0, cess: 0 };

  const couponDiscount = cartData?.discount_amount;

  return (
    <RequireAuth>
      <div className="bg-[#FFFBF6] min-h-screen w-full">
        {cartData && !cartLoading ? (
          <CartSavingsBanner savings={couponDiscount} />
        ) : (
          <div className="h-16 bg-white rounded-lg shadow-sm animate-pulse" />
        )}

        <div className="flex flex-col lg:flex-row gap-8 mx-auto px-4 md:px-8 mt-6">
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {cartLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : cartError ? (
              <div className="text-center text-red-500 py-4">
                Failed to load cart data. Please try refreshing the page.
              </div>
            ) : (
              <CartList
                items={cartData?.items || []}
                onQtyChange={handleQtyChange}
                onRemove={handleRemove}
                onNavigateToProduct={onNavigateToProduct}
                isLoading={cartLoading}
                qtyChangeLoadingIds={qtyChangeLoadingIds}
                deleteLoadingIds={deleteLoadingIds}
              />
            )}
          </div>
          {/* Right: Summary */}
          <div className="w-full lg:w-1/2 flex flex-col bg-white rounded-xl h-fit border border-[#F59A1133]">
            <PincodeInput
              pincode={pincode}
              onPincodeChange={setPincode}
              onCheckDelivery={onCheckDelivery}
              className={"m-4"}
            />

            {/* Delivery Status Display */}
            {deliveryLoading ? (
              <div className="mx-4 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-700">Delivery Status:</span>
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="font-semibold text-blue-600">Calculating delivery date...</span>
                  </div>
                </div>
              </div>
            ) : expectedDeliveryDate ? (
              <div className="mx-4 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-700">Delivery Status:</span>
                  <span className={`font-semibold ${
                    expectedDeliveryDate === "Available for delivery" 
                      ? "text-green-600" 
                      : expectedDeliveryDate === "Not available for delivery"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}>
                    {expectedDeliveryDate}
                  </span>
                </div>
              </div>
            ) : null}

            <CartCouponSection
              coupons={couponsData || []}
              appliedCoupon={appliedCoupon}
              onApply={handleApplyCoupon}
              onRemove={handleRemoveCoupon}
              cartTotal={totalPrice}
            />
            
            <AddressSelection
              addresses={addressesData || []}
              selectedAddressId={params.address_id}
              onAddressChange={(addressId) => {
                setParams(prev => ({ ...prev, address_id: addressId }));
                setCookie("addressId", addressId);
              }}
            />
            
            <div className="border-b border-[#0000001A]" />
            <CartSummary
              totalMrp={totalPrice}
              totalPrice={finalPayableAmount}
              shipping={shipping}
              estimatedDeliveryDate={estimatedDeliveryDate}
              taxBreakup={{ cgst, sgst, igst, cess }}
              couponDiscount={couponDiscount}
              onPay={() => setIsCheckoutDialogOpen(true)}
            />
          </div>
        </div>

        <SpecialDeals />
        <div className="px-4 mb-2">
          <CategoryBanner type={type} />
        </div>
        <LastMinuteAddOns />

        <CheckoutDialog
          isOpen={isCheckoutDialogOpen}
          onClose={() => setIsCheckoutDialogOpen(false)}
          addresses={addressesData || []}
          selectedAddressId={params.address_id}
          onConfirmCheckout={handleConfirmCheckout}
        />
      </div>
    </RequireAuth>
  );
};

export default CartPage;
