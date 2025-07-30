import paswIcon from "@/assets/bestseller/paws.png";
import CustomImage from "./images/CustomImage";

const PawsTitle = ({ title, className, classNameTitle, imageProps }) => {
    return (
        <div className={`align-middle flex flex-row gap-2 ${className}`}>
            <CustomImage
                src={paswIcon}
                alt="Paw Logo"
                className="inline-block mr-0 h-6"
                width={50}
                height={60}
                {...imageProps}
            />
            <span className={`text-[#0888B1] font-bold text-[28px] leading-[28.5px] tracking-[0.57px] ${classNameTitle}`}>
                {title}
            </span>
        </div>
    );
}

export default PawsTitle;