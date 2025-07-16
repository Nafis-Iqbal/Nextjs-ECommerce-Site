"use client";

import { EditButton } from "./Buttons";

const ProductEditConsole = ({className = ""} : {className?: string}) => {
    const onEditInfo = () => {

    }

    return (
        <div className={`flex flex-col space-y-3 w-[30%] p-2 border-[0.5px] border-green-800 bg-gray-600 ${className}`}>
            <h4 className="text-green-500 font-semibold mb-5">Vendor Console</h4>
            
            <div className="flex justify-between items-center bg-inherit">
                <p className="text-sm text-green-300">Edit Product Details</p>
                <EditButton onClick={() => onEditInfo()}></EditButton>
            </div>

            <div className="flex justify-between items-end bg-inherit">
                <p className="text-sm text-green-200">Current Stock:</p>
                <p className="text-3xl text-white">3</p>
            </div>
        </div>
    )
}

export default ProductEditConsole;