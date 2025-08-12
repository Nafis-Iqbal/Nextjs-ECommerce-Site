import Link from "next/link";
import { NextImage } from "../custom-elements/UIUtilities";

import ProductCartConsole from "../console-elements/ProductCartConsole";

interface ProductInfoCardProps {
    className?: string;
    productInfo: Product;
    sessionUserId: string | undefined;
}

export const ProductInfoCard = ({ className, productInfo, sessionUserId }: ProductInfoCardProps) => {
    return (
        <div className={`relative flex flex-col space-y-4 p-4 rounded-lg bg-gray-700 border-1 border-green-600 font-sans shadow-md ${className}`}>
            <NextImage
                className="w-full h-[300px] object-contain" 
                src={productInfo.images?.[0]?.url ?? "/CPUPIC.webp"} 
                alt={productInfo.images?.[0]?.url ?? "Some stuff about the pic."}
            />

            <Link className="text-xl text-center truncate hover:text-green-300 transition-all duration-150 hover:scale-110" href={`/products/${productInfo.id}`}>{productInfo.title}</Link>

            <span className="text-xl text-center text-green-400 font-bold">${productInfo.price}</span>

            {(sessionUserId !== productInfo.user_id) ? <ProductCartConsole productDetails={productInfo} minimalMode={true}/> : 
            <button className="absolute bottom-5 right-5 hover:scale-110 transition-all duration-150 cursor-pointer 
                text-xs p-1 bg-green-600 hover:bg-green-500 rounded-sm"
            >
                View Stats
            </button>
            }
        </div>
    );
};
