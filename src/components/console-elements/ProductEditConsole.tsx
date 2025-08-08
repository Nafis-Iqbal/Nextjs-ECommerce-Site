"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProductApi } from "@/services/api";

import { EditButton } from "../custom-elements/Buttons";
import { useGlobalUI } from "@/hooks/state-hooks/globalStateHooks";
import { queryClient } from "@/services/apiInstance";
import LoadingSpinnerBlock from "../placeholder-components/LoadingSpinnerBlock";
import { CustomMiniTextInput } from "../custom-elements/CustomInputElements";

const ProductEditConsole = ({productId, currentStock, className = ""} : {productId: string, currentStock: number, className?: string}) => {
    const router = useRouter();
    const params = useParams();

    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [isDataSyncing, setIsDataSyncing] = useState<boolean>(false);
    const [inputStock, setInputStock] = useState<string>(String(currentStock));

    const {showLoadingContent, openNotificationPopUpMessage} = useGlobalUI();

    const {mutate: updateProductMutate} = ProductApi.useUpdateProductRQ(
        (responseData) => {
            if(responseData.status === "success")
            {
                queryClient.invalidateQueries({ queryKey: ["products", productId] });
                setIsDataSyncing(false);
            }
            else {
                setIsDataSyncing(false);
                finishWithMessage("Failed to update product quantity");
            }
        },
        () => {
            setIsDataSyncing(false);
            finishWithMessage("Failed to update product quantity");
        }
    );

    const onEditQuantity = () => {
        if(isEditMode){
            setIsEditMode(false);
            updateProductMutate({id: productId, quantity: Number(inputStock)});
            setIsDataSyncing(true);
        }
        else{
            setIsEditMode(true);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;

        if (val === "") {
            setInputStock("");
            return;
        }

        if (!/^\d+$/.test(val)) {
            return;
        }

        val = val.replace(/^0+/, "");

        if (val === "") val = "0";

        setInputStock(val);
    };

    const finishWithMessage = (message: string) => {
        showLoadingContent(false);
        openNotificationPopUpMessage(message);
    }

    return (
        <div className={`flex flex-col space-y-3 p-2 border-[0.5px] border-green-800 bg-gray-600 ${className}`}>
            <h4 className="text-green-500 font-semibold mb-5">Vendor Console</h4>
            
            <div className="flex justify-between items-center bg-inherit">
                <p className="text-sm text-green-300">Edit Product Details</p>
                <EditButton onClick={() => router.push(`${params.product_id}/edit`)}></EditButton>
            </div>

            <div className="flex justify-between items-end bg-inherit w-full">
                <p className="text-sm text-green-200">Current Stock:</p>

                <LoadingSpinnerBlock isOpen={isDataSyncing} className="w-10 h-10"/>

                <div className="flex justify-between space-x-4 bg-inherit w-[60%]">
                    {!isEditMode ? (<p className="text-3xl text-white">{inputStock}</p>) : (
                        <CustomMiniTextInput 
                            type="number"
                            value={inputStock} 
                            onChange={handleChange} 
                            className="px-1 text-xl w-[40%] bg-white text-gray-800"
                        />
                    )}

                    <button className="p-1 text-xs bg-green-500 hover:bg-green-400 rounded-xs" onClick={onEditQuantity}>
                        {(isEditMode ? "Save Changes" : "Update Quantity")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductEditConsole;