export const endpoints = {
  // auth
  login: "api/auth/user/login",
  register: "api/auth/user/register",
  update_profile: "api/auth/user/update-profile",

  // products
  products: "api/product",

  // blogs
  blogs: "api/blog",
  bannerBlogs: "api/blog?isBanner=true",
  latestBlogs: "api/blog/get-latest-blogs",
  youMayLikeBlogs: "api/blog/you-may-like",
  singleBlog: "api/blog/get-single-blog",

  banners: "api/configuration/banner",

  // sliders
  sliders: "api/sliders/slider",

  // categories
  category: "api/category",

  // sub categories
  sub_category: "api/subcategory",

  // breeds
  breed: "api/breed",

  // collection
  collection: "api/collection",

  // header and footer
  header_footer: "api/settings/header-footer/get",

  // cat banners
  cat_banners: "api/cat-life-banner/get",

  // Ad banners
  ad_banners: "api/configuration/ad-banner",

  // brands
  brands: "api/brand",

  // address
  address: "api/address",
  // product banner
  productBanner: "api/product-banner",

  // cart
  cart: "api/cart",

  // coupons
  coupons: "api/coupon",

  // orders
  orders: "api/orders",
  // featured blog products
  featuredBlogProducts: "api/featured-blog-products/get-featured-products",
  // send otp
  sendOtp: "api/otp/send-otp",
};
