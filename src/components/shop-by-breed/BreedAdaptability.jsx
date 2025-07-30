import React from 'react';
import { PawPrint, Sun, Snowflake, Thermometer } from 'lucide-react';
import CustomImage from '@/components/images/CustomImage';
import PawsTitle from '../PawsTitle';

const BreedAdaptability = ({ breed }) => {
  return (
    <div className="flex flex-col relative">
      {/* Title */}
      <PawsTitle title={"ADAPTABILITY"} classNameTitle={"text-[24px] sm:text-[28px] md:text-[32px] pt-2"} imageProps={{
        height: 60,
        width: 60,
        className: "inline-block mr-0 h-6 sm:h-8"
      }} />

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Left Content - 40% */}
        <div className="w-full lg:w-2/5 flex items-center">
          <p className="text-gray-700 leading-relaxed text-lg sm:text-2xl lg:text-3xl text-left w-full lg:w-[70%]">
            {breed.name} adapts well to both <strong>hot</strong> and <strong>cold</strong> climates,
            thanks to their <strong>double coat</strong>.
          </p>
        </div>

        {/* Right Content - 60% */}
        <div className="w-full lg:w-3/5 flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Weather Tolerance Cards */}
          <div className="flex flex-col gap-4 sm:gap-6 items-center justify-center">
            {/* Hot Weather Tolerance */}
            <div className="flex flex-row gap-2 p-2 rounded-lg w-full max-w-xs" style={{
              background: 'linear-gradient(270deg, #FFB653 0%, #FFCB85 29.41%, #FFECD3 51.89%, #FFCB85 73.68%, #FFB653 100%)',
              border: '2.08px solid',
              borderImageSource: 'linear-gradient(90deg, #B4700A 0%, #FFBC57 18.96%, #FFE1B4 46.22%, #FFBC57 73.34%, #B4700A 100%)',
              borderImageSlice: '1',
              borderRadius: '8px'
            }}>
              <div className="flex items-center">
                <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                <Thermometer className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              </div>
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                Hot weather tolerance: <br /> up to <strong className="text-[#4A90E2]">{breed.hotWeatherTolerance || '28°C'}</strong>
              </p>
            </div>

            {/* Cold Weather Tolerance */}
            <div className="flex flex-row gap-2 p-2 rounded-lg w-full max-w-xs" style={{
              background: 'linear-gradient(270deg, #3DAEFF 0%, #9ED2F5 21.52%, #ECF9FF 50.3%, #9ED2F5 75.73%, #3DAEFF 100%)',
              border: '2.08px solid',
              borderImageSource: 'linear-gradient(90deg, #0888B1 0%, #71C4FF 14.25%, #ECECEC 50%, #71C4FF 87.83%, #0888B1 100%)',
              borderImageSlice: '1',
              borderRadius: '8px'
            }}>
              <div className="flex items-center">
                <Snowflake className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                <Thermometer className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              </div>
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                Cold weather tolerance: <br /> up to <strong className="text-[#D2691E]">{breed.coldWeatherTolerance || '8°C'}</strong>
              </p>
            </div>
          </div>

          {/* German Shepherd Image */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <CustomImage
              // src={breed.adaptabilityImage || breed.image || "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=300&fit=crop"}
              src={'/german-shephard-sitting.png'}
              alt={`${breed.name} - Adaptability`}
              className="w-full max-w-xs lg:max-w-none h-48 sm:h-80 object-contain"
              width={400}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreedAdaptability;  