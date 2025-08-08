import { ProductApi } from "@/services/api"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"

import { HorizontalDivider } from "@/components/custom-elements/UIUtilities"
import { ReviewListTableRow } from "@/components/data-elements/DataTableRowElements"
import { CustomTextAreaInput } from "@/components/custom-elements/CustomInputElements"
import { StarRating } from "@/components/custom-elements/StarRating"
import RatingStats from "@/components/custom-elements/RatingStats"
import { ImageViewer } from "@/components/custom-elements/ImageViewer"
import ProductEditConsole from "@/components/console-elements/ProductEditConsole"
import ProductCartConsole from "@/components/console-elements/ProductCartConsole"


interface Props {
  params: { product_id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function ProductDetailPage({params} : Props) {
    const productDetails = await ProductApi.getProductDetail(params.product_id);
    const productImages = productDetails?.data?.images;

    const session = await getServerSession(authOptions);

    return (
        <div className="flex flex-col p-2 font-sans">
            <div className="mx-6 my-6 flex flex-col space-y-5">
                <div className="flex w-full space-x-5">
                    <ImageViewer imageList={(productImages ?? []).map((image) => {return {imageURL: image.url, imageAlt: image.altText}})}/>
                    
                    <div className="flex flex-col w-[60%] p-3 border-[0.5px] border-green-800 space-y-2">
                        <div className="flex justify-between w-full">
                            <div className="flex flex-col space-y-4">
                                <h2 className="text-green-500">{productDetails?.data?.title ?? "N/A"}</h2>
                                <h4 className="text-green-200">Price: <span className="text-white">{productDetails?.data?.price ?? "N/A"}</span></h4>
                                
                                <div className="flex items-center space-x-3">
                                    <h4 className="text-green-200">Rating:</h4>

                                    <StarRating rating={productDetails?.data?.rating ?? 0}/>
                                </div>
                            </div>

                            {session && session.user.user_id === productDetails?.data?.user_id && (
                                <ProductEditConsole productId={params.product_id} currentStock={productDetails?.data?.quantity ?? 0} className="w-[40%]"/>
                            )}
                        </div>
                        
                        <label className="mt-5 text-green-200">Product Description</label>
                        <p className="min-h-[100px] md:min-h-[200px]">{productDetails?.data?.description ?? "N/A"}</p>

                        {(!session || (session.user.user_id !== productDetails?.data?.user_id)) && (
                            <ProductCartConsole className="mt-5"/>
                        )}
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