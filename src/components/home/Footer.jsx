'use client';

import React from 'react';
import petFooterBg from '@/assets/pet-footer.png';
import petCaartLogo from '@/assets/footer/petcaart-logo.png';
import instagramIcon from '@/assets/footer/instagram.png';
import faceBookIcon from '@/assets/footer/facebook.png';
import youTubeIcon from '@/assets/footer/youtube.png';
import linkedInIcon from '@/assets/footer/Linkedin.png';
import twitterIcon from '@/assets/footer/X.png';
import { Mail, Phone} from 'lucide-react'
import CustomImage from '@/components/images/CustomImage';

const Footer = () => {
  return (
    <div className="relative text-black py-10 px-6 md:px-16 overflow-hidden">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none z-0"
        style={{
          backgroundImage: `url(${petFooterBg.src})`,
          opacity: 0.85,
        }}
        aria-hidden="true"
      />
      {/* Content */}
      <div className="relative z-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-sm">
          {/* ONLINE SHOPPING */}
          <div>
            <h3 className="text-[#004E6A] font-bold uppercase mb-2">Online Shopping</h3>
            <ul className="space-y-1 text-[#181818]">
              <li className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">Dogs</li>
              <li className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">Cats</li>
              <li className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">Small Pets</li>
            </ul>
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="text-[#004E6A] font-bold uppercase mb-2">Explore</h3>
            <ul className="space-y-1 text-[#181818]">
              <li className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">Our story</li>
              <li className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">FAQs</li>
              <li className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">Blog</li>
              <li className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">Contact Us</li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-[#004E6A] font-bold uppercase mb-2">Quick Links</h3>
            <ul className="space-y-1 text-[#181818]">
              <li className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">My Account</li>
              <li className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">Track Your Order</li>
              <li className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">Refund policy</li>
              <li className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">Return policy</li>
              <li className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">Privacy Policy</li>
              <li className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">Terms of Use</li>
              <li className="text-[#181818] hover:text-[#004E6A] hover:underline transition-colors cursor-pointer">Refer and save</li>
            </ul>
          </div>

          {/* GET IN TOUCH */}
          <div>
            <h3 className="text-[#004E6A] font-bold uppercase mb-2">Get in Touch</h3>
            <div className="flex items-center gap-2 mb-1">
              <Phone className="w-4 h-4" />
              <span>1800-5723-575</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-4 h-4" />
              <a href="mailto:support@petcaart.com" className="underline hover:text-[#004E6A] hover:underline focus:text-[#004E6A] transition-colors">
                support@petcaart.com
              </a>
            </div>

            <h4 className="text-[#004E6A] font-bold uppercase mb-2">Follow Us</h4>
            <div className="flex gap-3">
              <CustomImage src={instagramIcon} alt="Instagram" className="w-6 h-6" />
              <CustomImage src={faceBookIcon} alt="Facebook" className="w-6 h-6" />
              <CustomImage src={youTubeIcon} alt="YouTube" className="w-6 h-6" />
              <CustomImage src={linkedInIcon} alt="LinkedIn" className="w-6 h-6" />
              <CustomImage src={twitterIcon} alt="Twitter" className="w-6 h-6" />
            </div>
          </div>

          {/* LOGO */}
          <div className="flex justify-center md:justify-end">
            <CustomImage src={petCaartLogo} alt="PetCaart" className="w-36 md:w-45 md:h-30" />
          </div>
        </div>

        {/* Popular Searches */}
        <div className="mt-10">
          <h3 className="text-[#004E6A] font-bold uppercase mb-2">Popular Searches</h3>
          <p className="text-[13px] leading-6 text-[#181818]">
            Dog Food | Dog Collars Leashes Harnesses | Me-O | Cat Clothes | Cat Litter |
            Dog Raincoat | Dog Toys | Dog Beds | Veg Dog Food | Dog Biscuits Cookies | Cat Dry Food | <br />
            Cat Food | Pet Pharmacy | Pedigree | Cat Toys | Drools | Royal Canin | Dog Grooming |
            Dog Carrier | Dogs Bones Chews | Pedigree Pro | Sheba | Whiskas | <br />
            Cat Collars Leashes Harnesses | Cat Wet Food | Dog Shampoos & Conditioners |
            Cat Carriers Travel Supplies | Dog Accessories | Dog Bowls Feeders | Dog Clothes |
            Dog Treats | <br />
            Cat Accessories | Cat Litter Boxes | Cat Treats | Farmina | Dog Leashes |
            Cat Kitten Food | Cat Beds Mats Tents | Deworming Tablets | Cat Shampoo & Conditioners
          </p>
        </div>

        {/* Office Address */}
        <div className="mt-6">
          <h3 className="text-[#004E6A] font-bold uppercase mb-1">Pet Caart Head Office</h3>
          <p className="text-[15px] ">
            1335, 11th Cross Rd, Stage 3, Rajkot, Delhi 560038
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
