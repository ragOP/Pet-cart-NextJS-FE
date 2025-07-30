import React from 'react';
import CustomImage from '@/components/images/CustomImage';
import PawsTitle from "../PawsTitle";
import CurvedText from 'react-curved-text';

const BreedTraits = ({ breed }) => {
    const characteristics = [
        { name: "Good With Kids", rating: "4/5", position: 0 },
        { name: "Playfulness", rating: "4/5", position: 1 },
        { name: "Friendliness", rating: "4/5", position: 2 },
        { name: "Good With Other Dogs", rating: "4/5", position: 3 },
        { name: "First Time Ownership", rating: "4/5", position: 4 },
        { name: "Barking Tendencies", rating: "4/5", position: 5 },
        { name: "Energy Level", rating: "5/5", position: 6 }
    ];

    const getCircularPosition = (index, total, radius = 280) => {
        // Calculate angle for each item (balanced with increased spacing: from 171 to 369 degrees)
        const angle = (171 + (index * 198 / (total - 1))) * (Math.PI / 180);
        
        // Calculate x and y positions
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return {
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            transform: 'translate(-50%, -50%)'
        };
    };

    const CharacteristicItem = ({ char }) => {
        const rating = parseInt(char.rating.split('/')[0]);
        const maxRating = parseInt(char.rating.split('/')[1]);
        const borderCompletion = (rating / maxRating) * 100;
        
        return (
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-[90%] flex flex-row items-center justify-center shadow-lg relative" style={{
                    background: `conic-gradient(from 110deg, #B4700A 0deg ${borderCompletion * 3.6}deg, transparent ${borderCompletion * 3.6}deg 360deg)`,
                    padding: '4px'
                }}>
                    <div className="w-full h-full rounded-[90%] bg-[#f7f5ed] flex flex-row items-center justify-center">
                        <div className="text-3xl font-black text-gray-800">{char.rating.split('/')[0]}</div>
                        <div className="text-lg font-medium text-gray-600">/{char.rating.split('/')[1]}</div>
                    </div>
                </div>
                <p className="w-28 text-base font-medium text-gray-700 text-center leading-tight mt-1">
                    {char.name}
                </p>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-4 sm:gap-6">
            <PawsTitle title={"TRAITS"} classNameTitle={"text-[28px] sm:text-[32px] md:text-[36px] pt-2 font-bold"} imageProps={{
                height: 60,
                width: 60,
                className: "inline-block mr-0 h-6 sm:h-8"
            }} />

            <div className="flex flex-col gap-4 sm:gap-6">
                <p className="text-gray-700 leading-tight text-3xl sm:text-xl text-left w-full lg:w-[70%]">
                    These attributes have been rated by dog trainers, expert vets and pet behaviorists. Remember that all dogs are individuals with their own personalities.
                </p>
            </div>

            {/* Desktop Layout - Circular */}
            <div className="hidden lg:flex justify-center mt-40">
                <div className="flex relative flex-col">
                    {/* Main Circle */}
                    <div className="flex flex-col h-[26rem] w-[26rem] rounded-[50%]" style={{
                        background: 'linear-gradient(90deg, #1C83A8 0%, #48BDE6 31.48%, #2F90B3 75%, rgba(19, 120, 157, 0.901961) 100%)',
                        boxShadow: '0px -17.78px 67.35px 0px #00000080 inset, 0px 6.47px 26.94px 0px #FFFFFF80 inset'
                    }} />

                    {/* Curved Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <CurvedText
                            width={"26rem"}
                            height={"26rem"}
                            cx={208}
                            cy={175}
                            rx={140}
                            ry={120}
                            startOffset={0}
                            reversed={true}
                            text={breed.name?.toUpperCase()}
                            textProps={{
                                style: {
                                    fontSize: '40px',
                                    fontWeight: 'bold',
                                    fill: 'white'
                                }
                            }}
                        />
                    </div>

                    {/* Characteristic Rating Circles */}
                    {characteristics.map((char, index) => {
                        const position = getCircularPosition(index, characteristics.length);
                        
                        return (
                            <div key={index} className="absolute" style={position}>
                                <CharacteristicItem char={char} />
                            </div>
                        );
                    })}

                    {/* German Shepherd Image */}
                    <CustomImage
                        src={'/shepherd-2.png'}
                        alt={`${breed.name} breed illustration`}
                        className="absolute bottom-[-2rem] left-[4rem]"
                        height={400}
                        width={400}
                    />
                </div>
            </div>

            {/* Mobile Layout - Below Image */}
            <div className="lg:hidden flex flex-col items-center gap-8">
                {/* Circle and Image Container - Similar to Desktop */}
                <div className="flex relative flex-col">
                    {/* Main Circle */}
                    <div className="h-80 w-80 rounded-[50%]" style={{
                        background: 'linear-gradient(90deg, #1C83A8 0%, #48BDE6 31.48%, #2F90B3 75%, rgba(19, 120, 157, 0.901961) 100%)',
                        boxShadow: '0px -17.78px 67.35px 0px #00000080 inset, 0px 6.47px 26.94px 0px #FFFFFF80 inset'
                    }} />
                    
                    {/* Curved Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <CurvedText
                            width={"20rem"}
                            height={"20rem"}
                            cx={160}
                            cy={140}
                            rx={100}
                            ry={85}
                            startOffset={0}
                            reversed={true}
                            text={breed.name?.toUpperCase()}
                            textProps={{
                                style: {
                                    fontSize: '28px',
                                    fontWeight: 'bold',
                                    fill: 'white'
                                }
                            }}
                        />
                    </div>

                    {/* German Shepherd Image - Positioned like Desktop */}
                    <CustomImage
                        src={'/shepherd-2.png'}
                        alt={`${breed.name} breed illustration`}
                        className="absolute bottom-[-2rem] left-[12rem] transform -translate-x-1/2 w-60 h-60 object-contain"
                        height={240}
                        width={240}
                    />
                </div>

                {/* Characteristics Grid */}
                <div className="flex flex-wrap justify-center gap-6 max-w-md">
                    {characteristics.map((char, index) => (
                        <CharacteristicItem key={index} char={char} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BreedTraits;