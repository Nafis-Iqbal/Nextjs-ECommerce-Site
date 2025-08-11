import { NextImage } from "../custom-elements/UIUtilities";

interface ProductInfoCardProps {
    className?: string;
    productInfo: Product;
}

export const ProductInfoCard = ({ className, productInfo }: ProductInfoCardProps) => {
    return (
        <div className={`flex flex-col border-1 border-green-600 p-4 rounded-lg space-y-4 shadow-md ${className}`}>
            <h2 className="text-lg font-semibold">{productInfo.title}</h2>
            
            <NextImage
                className="w-full h-[300px] object-contain" 
                src={productInfo.images?.[0]?.url ?? "/CPUPIC.webp"} 
                alt={productInfo.images?.[0]?.url ?? "Some stuff about the pic."}
            />
            
            <span className="text-xl font-bold">${productInfo.price}</span>
        </div>
    );
};
