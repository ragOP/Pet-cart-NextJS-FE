import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Search, Menu, MapPin, X, ShoppingCart, User, Phone, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomImage from "@/components/images/CustomImage";
import cartIcon from "@/assets/cart.png";
import truckIcon from "@/assets/truck.png";
import petLogo from "@/assets/pet.png";
import loginLogo from "@/assets/login.png";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "@/store/authSlice";
import HeaderUserSection from "./HeaderUserSection";
import { checkDelivery } from "@/app/apis/checkDelivery";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MobileMenu = React.memo(({
  logo,
  animatedPlaceholder,
  menuRef,
  setIsMenuOpen,
  router,
  pincodeValue,
  onPincodeChange,
  onPincodeCheck,
  isCheckingPincode,
  showPincodeResult,
  pincodeResult,
  onClearPincodeResult
}) => {
  return (
    <div
      ref={menuRef}
      className="fixed inset-0 bg-white z-50 flex flex-col"
      style={{ height: "100dvh" }}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={() => {
            router.push('/');
            setIsMenuOpen(false);
          }}
          className="hover:opacity-80 transition"
        >
          <CustomImage
            src={logo || petLogo}
            alt="PetCaart Logo"
            className="h-8 w-auto"
            width={120}
            height={32}
          />
        </button>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-600" />
            <input
              type="text"
              placeholder="Enter PINCODE to check delivery date"
              value={pincodeValue}
              onChange={(e) => onPincodeChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onPincodeCheck()}
              maxLength={6}
              className="w-full pl-10 pr-12 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={onPincodeCheck}
              disabled={isCheckingPincode}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-1.5 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {isCheckingPincode ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Search size={16} />
              )}
            </button>
          </div>
          
          {/* Pincode Result Display */}
          {showPincodeResult && pincodeResult && (
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Delivery Status</span>
                <button
                  onClick={onClearPincodeResult}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="text-sm text-gray-600">
                {pincodeResult.success ? (
                  <div className="text-green-600">
                    ✓ Delivery available to {pincodeValue}
                    {pincodeResult.data && (
                      <div className="mt-1 text-xs">
                        Expected: {pincodeResult.data}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-red-600">
                    ✗ Delivery not available to {pincodeValue}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <button
            className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 rounded-xl transition"
            onClick={() => {
              router.push('/track-order');
              setIsMenuOpen(false);
            }}
          >
            <CustomImage src={truckIcon} alt="Track Order" className="h-6 w-6" width={24} height={24} />
            <span className="text-gray-700">Track Order</span>
          </button>
          <button
            className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 rounded-xl transition"
            onClick={() => {
              router.push('/cart');
              setIsMenuOpen(false);
            }}
          >
            <CustomImage src={cartIcon} alt="Cart" className="h-6 w-6" width={24} height={24} />
            <span className="text-gray-700">Cart</span>
          </button>
        </div>
      </div>

      <div className="p-4 border-t">
        <button
          className="bg-[#0888B1] w-full text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center space-x-2"
          onClick={() => {
            router.push('/auth/login');
            setIsMenuOpen(false);
          }}
        >
          <CustomImage src={loginLogo} alt="Login" className="h-4 w-auto" width={20} height={20} />
          <span>LOGIN / SIGNUP</span>
        </button>
      </div>
    </div>
  );
});

MobileMenu.displayName = 'MobileMenu';

const Header = ({ logo }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [pincodeValue, setPincodeValue] = useState("");
  const [pincodeResult, setPincodeResult] = useState(null);
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);
  const [showPincodeResult, setShowPincodeResult] = useState(false);
  const [isPincodeDialogOpen, setIsPincodeDialogOpen] = useState(false);
  const [dialogPincodeValue, setDialogPincodeValue] = useState("");
  const [dialogPincodeResult, setDialogPincodeResult] = useState(null);
  const [showDialogPincodeResult, setShowDialogPincodeResult] = useState(false);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const isLoggedIn = !!token;
  const suggestions = ["Dog Food", "Cat Food", "Helno", "Royal Canin"];
  const [index, setIndex] = useState(0);
  const searchInputRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [suggestions.length]);

  useEffect(() => {
    if (isMenuOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") setIsMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const debouncedSearch = useCallback((searchTerm) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      setSearchValue(searchTerm);
    }, 300);
  }, []);

  const handlePincodeCheck = async () => {
    if (!pincodeValue || pincodeValue.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }

    setIsCheckingPincode(true);
    setShowPincodeResult(false);
    
    try {
      const result = await checkDelivery({ 
        pincode: pincodeValue, 
        productId: "general" // Using a general product ID for pincode validation
      });
      setPincodeResult(result);
      setShowPincodeResult(true);
      
      // Auto-hide result after 5 seconds
      setTimeout(() => {
        setShowPincodeResult(false);
      }, 5000);
      
    } catch (error) {
      console.error("Pincode check failed:", error);
      toast.error(error.message || "Failed to check pincode. Please try again.");
      setPincodeResult(null);
    } finally {
      setIsCheckingPincode(false);
    }
  };

  const handlePincodeKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePincodeCheck();
    }
  };

  const clearPincodeResult = () => {
    setShowPincodeResult(false);
    setPincodeResult(null);
  };

  const handleDialogPincodeCheck = async () => {
    if (!dialogPincodeValue || dialogPincodeValue.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }

    setIsCheckingPincode(true);
    
    try {
      const result = await checkDelivery({ 
        pincode: dialogPincodeValue, 
        productId: "general"
      });
      setDialogPincodeResult(result);
      setShowDialogPincodeResult(true);
      
      // Don't auto-close immediately, let user see the results
      // User can manually close the dialog when ready
      
    } catch (error) {
      console.error("Pincode check failed:", error);
      toast.error(error.message || "Failed to check pincode. Please try again.");
    } finally {
      setIsCheckingPincode(false);
    }
  };

  const handleDialogPincodeKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleDialogPincodeCheck();
    }
  };

  const openPincodeDialog = () => {
    setIsPincodeDialogOpen(true);
    setDialogPincodeValue("");
    setShowDialogPincodeResult(false);
    setDialogPincodeResult(null);
  };

  const handleSearchChange = useCallback((value) => {
    // Update the search value immediately for the input display
    setSearchValue(value);
    
    // Clear any existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    // Always redirect, even for empty searches
    debounceTimeoutRef.current = setTimeout(() => {
      if (value.trim()) {
        // If there's search text, redirect with search query
        router.push(`/category?search=${encodeURIComponent(value.trim())}`);
      } else {
        // If search is empty, redirect to category page without search query
        router.push('/category');
      }
    }, 500);
  }, [router]);

  const handleSearchSubmit = () => {
    if (searchValue.trim()) {
      router.push(`/category?search=${encodeURIComponent(searchValue.trim())}`);
    } else {
      // Handle empty search submission
      router.push('/category');
    }
  };

  const handleSearchButtonClick = () => {
    handleSearchSubmit();
  };

  const animatedPlaceholder = `Search "${suggestions[index]}"`;

  return (
    <div className="bg-[#FEF5E7] text-[#333] shadow-sm sticky top-0 z-40 overflow-x-hidden">
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-white/50 rounded-full transition"
          >
            <Menu size={24} />
          </button>

          <button
            onClick={() => router.push('/')}
            className="hover:opacity-80 transition"
          >
            <CustomImage
              src={logo || petLogo}
              alt="PetCaart Logo"
              className="h-8 w-auto"
              width={120}
              height={32}
            />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSearch(prev => !prev)}
              className="p-2 hover:bg-white/50 rounded-full transition"
            >
              <Search size={22} />
            </button>
            <button
              className="p-2 hover:bg-white/50 rounded-full transition relative"
              onClick={() => router.push('/cart')}
            >
              <ShoppingCart size={22} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </button>
          </div>
        </div>

        {/* Collapsible Search Bar */}
        {showSearch && (
          <div className="px-4 pb-3 animate-in slide-in-from-top">
            <form
              className="relative"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchSubmit();
              }}
            >
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder={animatedPlaceholder}
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </form>
          </div>
        )}

        {isMenuOpen && (
          <MobileMenu
            logo={logo}
            animatedPlaceholder={animatedPlaceholder}
            menuRef={menuRef}
            setIsMenuOpen={setIsMenuOpen}
            router={router}
            pincodeValue={pincodeValue}
            onPincodeChange={setPincodeValue}
            onPincodeCheck={handlePincodeCheck}
            isCheckingPincode={isCheckingPincode}
            showPincodeResult={showPincodeResult}
            pincodeResult={pincodeResult}
            onClearPincodeResult={clearPincodeResult}
          />
        )}
      </div>

      {/* Desktop Layout - Responsive */}
      <div className="hidden md:flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/')}
            className="hover:opacity-80 transition"
          >
            <CustomImage
              src={logo || petLogo}
              alt="PetCaart Logo"
              className="h-10 w-auto"
              width={160}
              height={140}
              priority
            />
          </button>
        </div>

        {/* Responsive search + pincode: row on xl, column on smaller screens */}
        <div className="flex flex-1 items-center justify-center mx-8">
          <div className="flex flex-col xl:flex-row gap-2 xl:gap-4 w-full max-w-3xl">
            <form
              className="flex w-full xl:w-[360px]"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchSubmit();
              }}
            >
              <input
                type="text"
                placeholder={animatedPlaceholder}
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="bg-white w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none text-sm"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="bg-white px-4 py-2 border border-l-0 border-gray-300 rounded-r-md text-blue-500 flex items-center justify-center hover:bg-blue-50 focus:bg-blue-100"
                aria-label="Search"
                onClick={handleSearchButtonClick}
              >
                <Search size={18} />
              </button>
            </form>

            <div className="w-full xl:w-[420px] relative">
              <MapPin
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-600"
              />
              <input
                type="text"
                placeholder="Enter PINCODE to check delivery date"
                onClick={openPincodeDialog}
                readOnly
                className="w-full pl-10 pr-12 py-2 bg-white border border-gray-300 rounded-l-md text-sm cursor-pointer hover:border-blue-500 transition-colors"
                aria-label="Click to check delivery by pincode"
              />
              <Search
                size={18}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 flex-shrink-0">
          <button
            className="rounded-full p-2 hover:bg-gray-100 focus:bg-gray-200 transition cursor-pointer"
            aria-label="Track Order"
            type="button"
            onClick={() => router.push('/account/track-order')}
          >
            <CustomImage
              src={truckIcon}
              alt="Delivery"
              className="h-6 w-6"
              width={24}
              height={24}
            />
          </button>
          <button
            className="rounded-full p-2 hover:bg-gray-100 focus:bg-gray-200 transition cursor-pointer"
            aria-label="Cart"
            type="button"
            onClick={() => router.push('/cart')}
          >
            <CustomImage
              src={cartIcon}
              alt="Cart"
              className="h-6 w-6"
              width={24}
              height={24}
            />
          </button>
          <HeaderUserSection />
        </div>
      </div>

      {/* Pincode Check Dialog */}
      <Dialog open={isPincodeDialogOpen} onOpenChange={setIsPincodeDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">Check Delivery by Pincode</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-600" />
              <input
                type="text"
                placeholder="Enter 6-digit pincode"
                value={dialogPincodeValue}
                onChange={(e) => setDialogPincodeValue(e.target.value.replace(/\D/g, '').slice(0, 6))}
                onKeyPress={handleDialogPincodeKeyPress}
                maxLength={6}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-base"
              />
            </div>
            
            <button
              onClick={handleDialogPincodeCheck}
              disabled={isCheckingPincode || dialogPincodeValue.length !== 6}
              className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isCheckingPincode ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Checking...
                </div>
              ) : (
                "Check Delivery"
              )}
            </button>
            
            {showDialogPincodeResult && dialogPincodeResult && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="text-center">
                  {dialogPincodeResult.success ? (
                    <div className="text-green-600">
                      <div className="text-2xl mb-2">✓</div>
                      <div className="font-medium text-lg mb-1">Delivery Available!</div>
                      <div className="text-sm text-gray-600">
                        We deliver to pincode {dialogPincodeValue}
                      </div>
                      {dialogPincodeResult.data && (
                        <div className="mt-1 text-sm text-gray-500">
                          Expected delivery: {dialogPincodeResult.data}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-red-600">
                      <div className="text-2xl mb-2">✗</div>
                      <div className="font-medium text-lg mb-1">Delivery Not Available</div>
                      <div className="text-sm text-gray-600">
                        Sorry, we don't deliver to pincode {dialogPincodeValue}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
