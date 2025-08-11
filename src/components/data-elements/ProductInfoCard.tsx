import Link from "next/link";
import { NextImage } from "../custom-elements/UIUtilities";

import ProductCartConsole from "../console-elements/ProductCartConsole";

interface ProductInfoCardProps {
    className?: string;
    productInfo: Product;
}

export const ProductInfoCard = ({ className, productInfo }: ProductInfoCardProps) => {
    return (
        <div className={`relative flex flex-col space-y-4 p-4 rounded-lg bg-gray-700 border-1 border-green-600 font-sans shadow-md ${className}`}>
            <NextImage
                className="w-full h-[300px] object-contain" 
                src={productInfo.images?.[0]?.url ?? "/CPUPIC.webp"} 
                alt={productInfo.images?.[0]?.url ?? "Some stuff about the pic."}
            />

            <Link className="text-xl text-center truncate hover:text-green-300 transition-all duration-150 hover:scale-110" href={`/products/${productInfo.id}`}>{productInfo.title}</Link>

            <span className="text-xl text-center text-green-400 font-bold">${productInfo.price}</span>

            <ProductCartConsole productDetails={productInfo} minimalMode={true} />
        </div>
    );
};
