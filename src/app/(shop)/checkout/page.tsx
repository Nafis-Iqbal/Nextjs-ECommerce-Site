import Link from "next/link"
import { HorizontalDivider } from "@/components/custom-elements/UIUtilities"
import TableLayout from "@/components/layout-elements/TableLayout"
import { CustomTextInput } from "@/components/custom-elements/CustomInputElements"

export default function CheckoutPage() {
    const payOnline = true;

    return (
        <div className="flex flex-col p-2 mt-5">
            <div className="ml-6 flex flex-col items-center text-left space-y-2 border-1 border-green-800 ">
                <h1 className="mt-7">Checkout</h1>

                <HorizontalDivider className="w-[95%] border-green-800"/>

                <div className="w-[60%] font-sans space-y-5">
                    <div className="flex flex-col">
                        <p className="text-green-300 text-xl">Name:&nbsp;&nbsp;<span className="text-white">Nafis</span></p>
                        <p className="text-green-300 text-xl">Email:&nbsp;&nbsp;<span className="text-white">nafisiqbal53@gmail.com</span></p>
                        <p className="text-green-300 text-xl">Phone:&nbsp;&nbsp;<span className="text-white">01884694591</span></p>
                    </div>
                    
                    <div className="flex flex-col space-y-3">
                        <p className="text-green-300 text-xl">Shipping Address:</p>
                        
                        <div className="flex space-x-3">
                            <p>addressLine1, </p>
                            <p>addressLine2</p>
                        </div>

                        <div className="flex space-x-3">
                            <p className="text-green-300">Country:&nbsp; <span className="text-white">Bangladesh</span></p>
                            <p className="text-green-300">City:&nbsp; <span className="text-white">Mirpur</span></p>
                            <p className="text-green-300">State:&nbsp; <span className="text-white">Dhaka</span></p>
                        </div>
                        
                        <div className="flex space-x-3">
                            <p className="text-green-300">Postal Code:&nbsp; <span className="text-white">2100</span></p>
                            <p className="text-green-300">Phone Number:&nbsp; <span className="text-white">01884694591</span></p>
                        </div>
                    </div>
                    
                    
                    <div className="flex flex-col space-y-2">
                        <p className="text-green-300 text-xl">Items:</p>

                        <TableLayout className="">
                            <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
                                <p className="w-[10%] text-green-200">Sr No.</p>
                                <p className="w-[45%] text-green-200">Product Name</p>
                                <p className="w-[35%] text-green-200">Quantity</p>
                                <p className="w-[35%] text-green-200">Price</p>
                                <p className="w-[35%] text-green-200">Total</p>
                            </div>

                            <CartItemListRow id="1" productName="Laptop1" quantity={2} price={250}></CartItemListRow>
                            <CartItemListRow id="1" productName="Laptop1" quantity={2} price={250}></CartItemListRow>
                            <CartItemListRow id="1" productName="Laptop1" quantity={2} price={250}></CartItemListRow>

                            <div className="flex flex-col w-[40%] self-end mr-3">
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
                    </div>
                    
                    
                    <div className="flex flex-col space-y-2">
                        <p className="text-green-300">Apply Coupons:</p>

                        <div className="flex space-x-5">
                            <CustomTextInput></CustomTextInput>

                            <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm">Apply Coupon</button>
                        </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                        <p className="text-green-300">Payment Method:</p>

                        <div className="flex space-x-5">
                            <div className="px-2 py-1 bg-gray-600 border-1">Cash on Delivery</div>

                            <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm">Choose Another</button>
                        </div>

                        <p>Badges & stuff</p>
                    </div>

                    <HorizontalDivider/>

                    <div className="flex justify-between items-center mb-10">
                        <div className="flex space-x-5">
                            <input className="w-6 h-6" type="checkbox"></input>
                            <p className="">Terms & Conditions box</p>
                        </div>
                        
                        {
                            payOnline ? (
                                <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm">Proceed to Payment</button>
                            ) : ( 
                            <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm">Confirm Order</button>
                            )
                        }
                    </div>  
                </div>
            </div>
        </div>
    )
}

const CartItemListRow = ({id, productName, quantity, price} : {id: string, productName: string, quantity: number, price: number}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[10%]">{id}</p>
            <p className="w-[45%]">{productName}</p>
            <p className="w-[35%]">{quantity}</p>
            <p className="w-[35%]">{price}</p>
            <p className="w-[35%]">{quantity * price}</p>
        </div>
    )
}