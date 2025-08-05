import { NextImage, VerticalDivider, HorizontalDivider } from "@/components/custom-elements/UIUtilities"

import { ReviewListTableRow } from "@/components/data-elements/DataTableRowElements"
import { StarRating } from "@/components/custom-elements/StarRating"
import RatingStats from "@/components/custom-elements/RatingStats"
import { CustomTextAreaInput } from "@/components/custom-elements/CustomInputElements"
import ProductEditConsole from "@/components/custom-elements/ProductEditConsole"

export default function ProductDetailPage() {

    return (
        <div className="flex flex-col p-2 font-sans">
            <div className="mx-6 my-6 flex flex-col space-y-5">
                <div className="flex w-full space-x-5">
                    <div className="flex flex-col w-[40%]">
                        <NextImage className="w-full h-[250px] md:h-[400px]" src="/CPUPIC.webp" alt="CPU Image"></NextImage>

                        <div className="flex flex-grow justify-between">
                            <button className="w-[20%]">Prev Img</button>
                            <button className="w-[20%]">Next Img</button>
                        </div>
                    </div>
                    
                    <div className="flex flex-col w-[60%] p-3 border-[0.5px] border-green-800 space-y-2">
                        <div className="flex justify-between w-full">
                            <div className="flex flex-col">
                                <h3>Product Name</h3>
                                <h4>Price: 2100</h4>
                                
                                <div className="flex items-center space-x-3">
                                    <h4>Rating:</h4>

                                    <StarRating rating={4}/>
                                </div>
                            </div>

                            <ProductEditConsole/>
                        </div>
                        
                        <p className="mt-5 text-green-200">Product Description</p>
                        <p className="min-h-[100px] md:min-h-[200px]">It's a fine product</p>

                        <div className="flex flex-col mt-auto space-y-3">
                            <label>Payment Options:</label>

                            <div className="flex justify-left space-x-5 w-full">
                                <div className="w-40% min-h-[80px] px-8 py-4 ml-5 border-1 border-green-800">
                                    Payment Option 1
                                </div>

                                <div className="w-40% min-h-[80px] px-8 py-4 ml-5 border-1 border-green-800">
                                    Payment Option 2
                                </div>

                                <div className="w-40% min-h-[80px] px-8 py-4 ml-5 border-1 border-green-800">
                                    Others
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col p-2 border-[0.5px] border-green-800">
                    <h3 className="text-green-500 mt-5 pl-2">Reviews</h3>

                    <div className="flex justify-between px-2">
                        <div className="flex flex-col justify-between space-y-5 mt-5 w-[65%]">
                            <h4>Write a review</h4>

                            <pre className="">for    <span className="text-lg text-green-500">Product Name</span></pre>

                            <CustomTextAreaInput className="min-h-[50px] md:min-h-[150px]" placeholderText="Does this product make you calm? or angry?"></CustomTextAreaInput>

                            <div className="flex justify-end">
                                <button className="px-8 py-2 bg-green-700 hover:bg-green-600 rounded-md">Submit</button>
                            </div>
                        </div>

                        <div className="flex flex-col w-[30%] space-y-1 mt-5">
                            <h4 className="font-semibold text-green-500">Customer Reviews</h4>
                            <h4 className="text-green-200">4.5 stars out of 5</h4>
                            <p>400 user ratings</p>

                            <RatingStats totalReviews={100} expectedReviews={13} rating={5}></RatingStats>
                            <RatingStats totalReviews={100} expectedReviews={43} rating={4}></RatingStats>
                            <RatingStats totalReviews={100} expectedReviews={30} rating={3}></RatingStats>
                            <RatingStats totalReviews={100} expectedReviews={10} rating={2}></RatingStats>
                            <RatingStats totalReviews={100} expectedReviews={4} rating={1}></RatingStats>
                        </div>
                    </div>
                    
                    <HorizontalDivider className="my-6"/>

                    <div className="flex justify-between mb-10">
                        <h4>User reviews</h4>
                        <button className="px-2 bg-green-700 hover:bg-green-600 self-baseline-last rounded-md">Sort by Rating</button>
                    </div>

                    <div className="flex flex-col space-y-5">
                        <ReviewListTableRow id={1} reviewUserName="Nafis" reviewDescription="Nice GG" reviewUserImage="/DP.jpg" rating={4}></ReviewListTableRow>
                        <ReviewListTableRow id={1} reviewUserName="Nafis" reviewDescription="Nice GG" reviewUserImage="/DP.jpg" rating={3}></ReviewListTableRow>
                        <ReviewListTableRow id={1} reviewUserName="Nafis" reviewDescription="Nice GG" reviewUserImage="/DP.jpg" rating={2.5}></ReviewListTableRow>
                    </div>
                </div>
            </div>
        </div>
    )
}