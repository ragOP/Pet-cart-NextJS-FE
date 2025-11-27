"use client";

import React from "react";
import petFooterBg from "@/assets/pet-footer.png";
import instagramIcon from "@/assets/footer/instagram.png";
import faceBookIcon from "@/assets/footer/facebook.png";
import youTubeIcon from "@/assets/footer/youtube.png";
import linkedInIcon from "@/assets/footer/Linkedin.png";
import twitterIcon from "@/assets/footer/X.png";
import { Mail, Phone } from "lucide-react";
import CustomImage from "@/components/images/CustomImage";
import Link from "next/link";
import petLogo from "@/assets/pet.png";

const Footer = ({
  logo,
  address,
  phone,
  email,
  instagram,
  facebook,
  twitter,
  linkedin,
  youtube,
}) => {
  return (
    <div className="relative text-black py-10 px-6 md:px-16 overflow-hidden">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none z-0"
        aria-hidden="true"
      />
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 122, 154, 0.09), rgba(245, 180, 65, 0.09))'
        }}
        aria-hidden="true"
      />
      {/* Content */}
      <div className="relative z-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-sm">
          {/* ONLINE SHOPPING */}
          <div>
            <h3 className="text-[#004E6A] font-bold uppercase mb-2">
              Online Shopping
            </h3>
            <ul className="space-y-1 text-[#181818]">
              <li>
                <Link href="/category?subCategorySlug=dog-food&collectionSlug=dog-dry-food&sort_by=priceLowToHigh&page=1" className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">
                  Dogs
                </Link>
              </li>
              <li>
                <Link href="/category?subCategorySlug=cat-food&collectionSlug=cat-dry-food&sort_by=priceLowToHigh&page=1" className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">
                  Cats
                </Link>
              </li>
            </ul>
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="text-[#004E6A] font-bold uppercase mb-2">Explore</h3>
            <ul className="space-y-1 text-[#181818]">
              <li>
                <Link href="/support" className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">
                  Our story
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/account/contact-us" className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-[#004E6A] font-bold uppercase mb-2">
              Quick Links
            </h3>
            <ul className="space-y-1 text-[#181818]">
              <li>
                <Link href="/account/profile" className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/refund-and-return-policy" className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">
                  Refund & Return policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-policy" className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/account/invite-friends" className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">
                  Refer and save
                </Link>
              </li>
            </ul>
          </div>

          {/* GET IN TOUCH */}
          <div>
            <h3 className="text-[#004E6A] font-bold uppercase mb-2">
              Get in Touch
            </h3>
            <div className="flex items-center gap-2 mb-1">
              <Phone className="w-4 h-4" />
              <span>{phone || "1800-5723-575"}</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-4 h-4" />
              <a
                href={`mailto:${email || "support@petcaart.com"}`}
                className="underline hover:text-[#004E6A] hover:underline focus:text-[#004E6A] transition-colors"
              >
                {email || "support@petcaart.com"}
              </a>
            </div>

            <h4 className="text-[#004E6A] font-bold uppercase mb-2">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {instagram && (
                <Link href={instagram} target="_blank" rel="noopener noreferrer">
                  <CustomImage
                    src={instagramIcon}
                    alt="Instagram"
                    className="w-6 h-6"
                  />
                </Link>
              )}
              {facebook && (
                <Link href={facebook} target="_blank" rel="noopener noreferrer">
                  <CustomImage
                    src={faceBookIcon}
                    alt="Facebook"
                    className="w-6 h-6"
                  />
                </Link>
              )}
              {youtube && (
                <Link href={youtube} target="_blank" rel="noopener noreferrer">
                  <CustomImage
                    src={youTubeIcon}
                    alt="youtube"
                    className="w-6 h-6"
                  />
                </Link>
              )}
              {linkedin && (
                <Link href={linkedin} target="_blank" rel="noopener noreferrer">
                  <CustomImage
                    src={linkedInIcon}
                    alt="LinkedIn"
                    className="w-6 h-6"
                  />
                </Link>
              )}
              {twitter && (
                <Link href={twitter} target="_blank" rel="noopener noreferrer">
                  <CustomImage
                    src={twitterIcon}
                    alt="Twitter"
                    className="w-6 h-6"
                  />
                </Link>
              )}
            </div>
          </div>

          {/* LOGO */}
          <div className="flex justify-center md:justify-end">
            <CustomImage
              src={logo || petLogo}
              alt="PetCaart"
              className="w-44 md:w-45 md:h-30 object-contain"
              width={180}
              height={144}
            />
          </div>
        </div>

        {/* Popular Searches */}
        <div className="mt-10">
          <h3 className="text-[#004E6A] font-bold uppercase mb-2">
            Popular Searches
          </h3>
          <p className="text-[13px] leading-6 text-[#181818]">
            Dog Food | Dog Collars Leashes Harnesses | Me-O | Cat Clothes | Cat
            Litter | Dog Raincoat | Dog Toys | Dog Beds | Veg Dog Food | Dog
            Biscuits Cookies | Cat Dry Food | <br />
            Cat Food | Pet Pharmacy | Pedigree | Cat Toys | Drools | Royal Canin
            | Dog Grooming | Dog Carrier | Dogs Bones Chews | Pedigree Pro |
            Sheba | Whiskas | <br />
            Cat Collars Leashes Harnesses | Cat Wet Food | Dog Shampoos &
            Conditioners | Cat Carriers Travel Supplies | Dog Accessories | Dog
            Bowls Feeders | Dog Clothes | Dog Treats | <br />
            Cat Accessories | Cat Litter Boxes | Cat Treats | Farmina | Dog
            Leashes | Cat Kitten Food | Cat Beds Mats Tents | Deworming Tablets
            | Cat Shampoo & Conditioners
          </p>
        </div>

        {/* Office Address */}
        <div className="mt-6">
          <h3 className="text-[#004E6A] font-bold uppercase mb-1">
            Pet Caart Head Office
          </h3>
          <p className="text-[15px] ">
            {address || "1335, 11th Cross Rd, Stage 3, Rajkot, Delhi 560038"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
