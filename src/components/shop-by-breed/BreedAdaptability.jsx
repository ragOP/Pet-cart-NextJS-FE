import React from 'react';
import CustomImage from '@/components/images/CustomImage';
import PawsTitle from '../PawsTitle';
import HotWeatherIcon from '@/icons/HotWeatherIcon';
import ColdWeatherIcon from '@/icons/ColdWeatherIcon';

const BreedAdaptability = ({ breed }) => {
  // Fallback if adaptability data is not provided
  if (!breed?.adaptability) {
    return null;
  }

  const { adaptability } = breed;

  return (
    <div className="relative px-[5%] mt-8 mb-8 lg:mb-0 h-auto lg:h-[60vh]">
      {/* Title */}
      <div className="mb-4 lg:mb-0">
        <PawsTitle title={"ADAPTABILITY"} classNameTitle={"text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] pt-2 "} imageProps={{
          height: 60,
          width: 60,
          className: "inline-block mr-0 h-8"
        }} />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-full">
        {/* Left Content */}
        <div className="w-full lg:w-[35%] flex flex-col justify-center">
          <div className="flex flex-col gap-4">
            <p 
              className="leading-tight text-2xl sm:text-3xl lg:text-3xl font-bold text-left w-full"
              dangerouslySetInnerHTML={{ __html: adaptability.description }}
            />

            {/* Weather Tolerance Cards */}
            <div className="flex flex-col gap-4 lg:gap-6 w-full mt-4 lg:mt-6">
              {/* Hot Weather Tolerance */}
              <div className="flex flex-row gap-2 w-full lg:w-[20vw] px-3 sm:px-4 py-2 rounded-lg" style={{
                background: 'linear-gradient(270deg, #FFB653 0%, #FFCB85 29.41%, #FFECD3 51.89%, #FFCB85 73.68%, #FFB653 100%)',
                border: '2.08px solid #FF9C00',
                borderImageSlice: '1',
              }}>
                <div className="flex items-center pr-1">
                  <HotWeatherIcon width={24} height={24} className="sm:w-8 sm:h-8" />
                </div>
                <p className="text-gray-800 font-medium text-xs sm:text-sm lg:text-base">
                  Hot weather tolerance: <br /> up to <strong className="text-[#4A90E2]">{adaptability.hotWeatherTolerance || '28°C'}</strong>
                </p>
              </div>

              {/* Cold Weather Tolerance */}
              <div className="flex flex-row gap-2 px-3 sm:px-4 py-2 w-full lg:w-[20vw] rounded-lg" style={{
                background: 'linear-gradient(270deg, #3DAEFF 0%, #9ED2F5 21.52%, #ECF9FF 50.3%, #9ED2F5 75.73%, #3DAEFF 100%)',
                border: '2.08px solid #1CC7FF',
                borderImageSlice: '1',
              }}>
                <div className="flex items-center pr-1">
                  <ColdWeatherIcon width={24} height={24} className="sm:w-8 sm:h-8" />
                </div>
                <p className="text-gray-800 font-medium text-xs sm:text-sm lg:text-base">
                  Cold weather tolerance: <br /> up to <strong className="text-[#D2691E]">{adaptability.coldWeatherTolerance || '8°C'}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Image */}
        <div className="w-full lg:w-[70%] relative flex justify-center lg:justify-end">
          <CustomImage
            src={adaptability.image || '/gm-1.png'}
            alt={`${breed.name} - Adaptability`}
            className="w-full h-full object-contain relative top-[-5%] lg:top-[-10%] lg:right-[-5%]"
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default BreedAdaptability;  