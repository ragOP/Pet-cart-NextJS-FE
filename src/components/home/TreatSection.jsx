'use client';

import React from 'react';
import discountLogo from '@/assets/treats/discount.png';
import treat1 from '@/assets/treats/treat1.png';
import treat2 from '@/assets/treats/treat2.png';
import treat3 from '@/assets/treats/treat3.png';
import treat4 from '@/assets/treats/treat4.png';
import CustomImage from '@/components/images/CustomImage';

const treats = [
	{ id: 1, image: treat1, name: 'Chicken Sticks', price: 999, oldPrice: 1159 },
	{ id: 2, image: treat2, name: 'Chicken Sticks', price: 999, oldPrice: 1159 },
	{ id: 3, image: treat3, name: 'Chicken Sticks', price: 999, oldPrice: 1159 },
	{ id: 4, image: treat4, name: 'Chicken Sticks', price: 999, oldPrice: 1159 },
];

const TreatSection = () => {
	return (
		<div className="bg-[#FFF2809E] p-4 md:py-6 md:pl-8 rounded-2xl mt-6 flex flex-col md:flex-row justify-between gap-6 m-4">
			{/* Left: Text & CTA */}
			<div className="flex-1 max-w-md  justify-between">
				<h2 className="text-[40px] font-bold text-[#814E00] leading-tight font-holtwood uppercase">
					JUST TREATS. BAKED <br /> TO BE REAL.
				</h2>
				<p className="text-[25px] text-black mt-2">
					more protein, more crunch, more taste
				</p>
				<button className="bg-[#F59A11] text-white text-lg font-semibold mt-12 px-6 py-2 rounded-xl md:w-45 md:h-15">
					Shop now
				</button>
			</div>

			{/* Right: Product Cards */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
				{treats.map((item) => (
					<div key={item.id} className=" ">
						<div className="relative">
							<CustomImage
								src={item.image}
								alt={item.name}
								className="w-32 h-40 object-contain mx-auto"
							/>
							<span className="absolute top-0 left-1/2 transform -translate-x-1/2 px-2 py-1 align-center">
								<img
									src={discountLogo}
									alt="Discount"
									className="w-25 h-6 align-center inline-block"
								/>
							</span>
						</div>
						<p className="mt-2 text-sm font-medium text-center">
							{item.name}
						</p>
						<div className="mt-1 text-center text-sm font-semibold">
							₹{item.price}{' '}
							<span className="line-through text-gray-500 font-normal text-sm">
								₹{item.oldPrice}
							</span>
						</div>
						<button className="w-30 mt-2 border-2 border-[#004E6A] text-[#004E6A] py-1 rounded-md font-semibold md:w-35 md:h-10 hover:bg-[#004E6A] hover:text-white transition-colors duration-300 ml-6">
							Add
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default TreatSection;
