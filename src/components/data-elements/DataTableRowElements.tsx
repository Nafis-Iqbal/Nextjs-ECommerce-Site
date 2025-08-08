import { NextImage } from "../custom-elements/UIUtilities"
import { StarRating } from "../custom-elements/StarRating"
import { OrderStatus } from "@/types/enums"

export const ProductViewListTableRow = ({
    id, 
    productName, 
    product_id, 
    productImageURL, 
    productCategoryType, 
    price,
    onClickNavigate
} : {
    id: number, 
    productName: string, 
    product_id: string, 
    productImageURL: string, 
    productCategoryType: string, 
    price: number,
    onClickNavigate: () => void
}) => 
{
    return (
        <div className="flex items-center p-2 w-full h-[150px] border-b-1 border-green-900 text-center">
            <p className="w-[5%]">{id}</p>
            <p className="w-[20%]">{productName}</p>
            <NextImage className="w-[35%] h-full cursor-pointer bg-gray-600" nextImageClassName="object-contain" src={productImageURL} alt={productName}/>
            <p className="w-[15%]">{productCategoryType}</p>
            <p className="w-[10%]">{price}</p>
            <button className="w-[15%] hover:bg-gray-600 cursor-pointer" onClick={() => onClickNavigate()}>{product_id}</button>
        </div>
    )
}

export const OrderViewListTableRow = ({id, order_id, orderDate, totalAmount, orderStatus} : 
    {id: number, order_id: string, orderDate: Date, totalAmount: number, orderStatus: OrderStatus}) => 
{
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[5%]">{id}</p>
            <p className="w-[30%]">{order_id}</p>
            <p className="w-[30%]">{orderDate.toDateString()}</p>
            <p className="w-[20%]">{totalAmount}</p>
            <p className="w-[15%]">{orderStatus}</p>
        </div>
    )
}

export const SellerOrderViewListTableRow = ({id, seller_order_id, buyer_id, buyerName, orderDate, totalAmount, orderStatus} : 
    {id: number, seller_order_id: string, buyer_id: string, buyerName: string, orderDate: Date, totalAmount: number, orderStatus: OrderStatus}) => 
{
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[5%]">{id}</p>
            <p className="w-[20%]">{seller_order_id}</p>
            <p className="w-[20%]">{buyer_id}</p>
            <p className="w-[20%]">{buyerName}</p>
            <p className="w-[15%]">{orderDate.toDateString()}</p>
            <p className="w-[10%]">{totalAmount}</p>
            <p className="w-[10%]">{orderStatus}</p>
        </div>
    )
}

export const ReviewListTableRow = ({id, reviewUserName, reviewUserImage = "", reviewDescription, rating} : 
    {id: number, reviewUserName: string, reviewUserImage: string, reviewDescription: string, rating: number}) => 
{
    return (
        <div className="flex flex-col p-2 w-full space-y-5 border-1 border-green-900 bg-gray-700 rounded-md">
            <div className="flex space-x-5 bg-inherit">
                <NextImage className="w-[40px] h-[40px] overflow-hidden rounded-full" src={reviewUserImage} alt="user_image"></NextImage>

                <button className="px-1 self-center hover:outline-1 bg-inherit">{reviewUserName}</button>
            </div>

            <StarRating rating={rating} className="bg-gray-700"/>
            <p className="mb-5">{reviewDescription}</p>
        </div>
    )
}

export default ProductViewListTableRow;