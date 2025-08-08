"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const ProductCartConsole = ({className} : {className?: string}) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    return (
        <div className={`flex flex-col space-y-2 ${className}`}>
            <div className="flex items-center space-x-1 mb-10">
                <button onClick={handleDecrement} className="p-2 bg-gray-500 rounded hover:bg-gray-400">
                    <FaMinus />
                </button>

                <span className="px-3 text-lg">{quantity}</span>

                <button onClick={handleIncrement} className="p-2 bg-gray-500 rounded hover:bg-gray-400">
                    <FaPlus />
                </button>

                <button className="ml-4 px-4 py-2 text-white rounded-xs bg-green-600 hover:bg-green-500">Add to Cart</button>
            </div>

            <div className="flex flex-col mt-auto space-y-3">
                <label>Payment Options:</label>

                <div className="flex justify-left space-x-10 w-full">
                    <div className="w-40% min-h-[80px] px-8 py-4 border-1 border-green-800">
                        Payment Option 1
                    </div>

                    <div className="w-40% min-h-[80px] px-8 py-4 border-1 border-green-800">
                        Payment Option 2
                    </div>

                    <div className="w-40% min-h-[80px] px-8 py-4 border-1 border-green-800">
                        Others
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCartConsole;