import Link from "next/link"

import DivGap, { HorizontalDivider } from "@/components/custom-elements/UIUtilities"
import TableLayout from "@/components/layout-elements/TableLayout"
import { CustomTextInput } from "@/components/custom-elements/CustomInputElements"

export default function CartPage() {
    return (
        <div className="flex flex-col p-2 mt-5">
            <div className="ml-6 flex flex-col space-y-2 border-1 border-green-800 ">
                <div className="flex flex-col items-center text-left">
                    <h1 className="mt-7 font-satisfy">Cart</h1>

                    <HorizontalDivider className="w-[95%] border-green-800"/>
                    
                    <div className="flex flex-col font-sans space-y-2 w-[85%]">
                        <h4 className="text-green-300">Ordered Items</h4>
                        <TableLayout className="">
                            <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
                                <p className="w-[5%] text-green-200">Sr No.</p>
                                <p className="w-[60%] text-green-200">Product Name</p>
                                <p className="w-[15%] text-green-200">Price</p>
                                <p className="w-[5%] text-green-200">Quantity</p>
                                <p className="w-[15%] text-green-200">Total</p>
                            </div>

                            <OrderItemListRow id="1" productName="Laptop1" quantity={2} price={250}></OrderItemListRow>
                            <OrderItemListRow id="1" productName="Laptop1" quantity={2} price={250}></OrderItemListRow>
                            <OrderItemListRow id="1" productName="Laptop1" quantity={2} price={250}></OrderItemListRow>

                            <DivGap customHeightGap="h-[15px]"/>

                            <div className="flex flex-col w-[30%] self-end mr-3">
                                <div className="flex justify-between">
                                    <p className="text-green-200">Items Total:</p>
                                    <p>750</p>
                                </div>

                                <div className="flex justify-between">
                                    <p className="text-green-200">Shipping Cost::</p>
                                    <p>0</p>
                                </div>

                                <div className="flex justify-between">
                                    <p className="text-green-200">Grand Total:</p>
                                    <p>750</p>
                                </div>
                            </div>
                        </TableLayout>

                        <div className="flex flex-col space-y-2">
                            <h4 className="text-green-300">Apply Coupons</h4>

                            <div className="flex space-x-3 w-[100%]">
                                <div className="flex space-x-2 w-[50%]">
                                    <CustomTextInput className="flex-grow"></CustomTextInput>
                                    <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm text-sm">Apply Coupon</button>
                                </div>

                                <div className="flex space-x-2 w-[50%]">
                                    <CustomTextInput className="flex-grow"></CustomTextInput>
                                    <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm text-sm">Apply Vouchers</button>    
                                </div>
                            </div>
                        </div>

                        <HorizontalDivider className="my-7 border-green-800"/>

                        <div className="flex justify-between mb-10">
                            <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm">Continue Shopping</button>  
                            <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm">Confirm Order</button>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const OrderItemListRow = ({id, productName, quantity, price} : {id: string, productName: string, quantity: number, price: number}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[5%]">{id}</p>
            <p className="w-[60%]">{productName}</p>
            <p className="w-[15%]">{price}</p>
            <p className="w-[5%]">{quantity}</p>
            <p className="w-[15%]">{quantity * price}</p>
        </div>
    )
}