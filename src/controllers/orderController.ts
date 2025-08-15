import prismadb from "@/prisma/prismadb";

import { errorResponse } from "@/utilities/utilities";
import { OrderStatus, Role  } from "@/types/enums";

import { AddressController, CartController } from "@/controllers";

//can use user's address, or new address
export async function createOrderForUser(user_id: string, data: {
    cartItems?: {product_id: string, product_quantity: number}[],
    addressId?: string
})
{
    try{
        const {cartItems, addressId} = data;

        let newOrder: Order | null = null;
        let orderAddress: Address | null = null;
        let cartItemList: CartItem[];

        if(!cartItems){
            cartItemList = await prismadb.cartItem.findMany({
                where: {
                    user_id
                }
            })
        }
        else cartItemList = cartItems;

        if(!cartItemList) {
            return new Response(
                JSON.stringify({
                    status: "failed",
                    message: "Error fetching cart items of user.",
                    data: []
                }),
                {status: 200}
            )
        }
        
        const productIds = cartItemList.map(item => item.product_id);

        const totalAmount = await calculateCartTotal(productIds, cartItemList) ?? 0;

        if(addressId){
            orderAddress = await prismadb.address.findUnique({
                where: {
                    id: addressId
                }
            });
        }
        else {
            const orderUser = await prismadb.user.findUnique({
                where: {
                    id: user_id
                }
            });

            if(orderUser)
            {
                orderAddress = await prismadb.address.findFirst({
                    where: {
                        user_id: orderUser.id
                    }
                });
            }
        }

        if(orderAddress)
        {
            newOrder = await prismadb.order.create({
                data: {
                    totalAmount,
                    address_id: orderAddress?.id,
                    buyer_id: user_id,
                }
            })
        }
        else{
            return new Response(
                JSON.stringify({
                    status: "failed",
                    message: "Error fetching address. Failed to create new order.",
                    data: []
                }),
                {status: 200}
            )
        }

        if(newOrder && cartItemList){
            try{
                await createOrderItemsFromCartItems(newOrder.id, orderAddress?.id ?? "", productIds, cartItemList, user_id);

                await CartController.clearCartItemList(user_id);

                return new Response(
                    JSON.stringify({
                        status: "success",
                        message: "New Order created successfully.",
                        data: newOrder
                    }),
                    {status: 200}
                );
            }
            catch(error){
                return errorResponse(error);
            }
        }
        else{
            return new Response(
                JSON.stringify({
                    status: "failed",
                    message: "Failed to create new order.",
                    data: []
                }),
                {status: 200}
            )
        }
    }
    catch(error){
        return errorResponse(error);
    }
}

//use new address
export async function createOrderForGuest(data: {
    addressId: string,
    cartItems: {product_id: string, product_quantity: number}[]
})
{
    try{
        const {addressId, cartItems} = data;

        const createdAddress = await prismadb.address.findUnique({
            where: {
                id: addressId
            }
        });

        const productIds = cartItems.map(item => item.product_id);

        const totalAmount = await calculateCartTotal(productIds, cartItems);

        if(createdAddress)
        {
            const newOrder = await prismadb.order.create({
                data: {
                    totalAmount,
                    address_id: createdAddress.id,
                    isGuestUser: true
                }
            })

            try{
                await createOrderItemsFromCartItems(newOrder.id, createdAddress.id, productIds, cartItems);

                return new Response(
                    JSON.stringify({
                        status: "success",
                        message: "New Order created successfully.",
                        data: newOrder
                    }),
                    {status: 200}
                );
            }
            catch(error){
                return errorResponse(error);
            }
        }
        else{
            return new Response(
                JSON.stringify({
                    status: "failed",
                    message: "Failed to create new order. Problems with address",
                    data: []
                }),
                {status: 200}
            )
        }
    }
    catch(error){
        return errorResponse(error);
    }
}

async function calculateCartTotal(productIds: string[], cartItemList: CartItem[]): Promise<number>
{
    try{
        const productsDataInOrder = await prismadb.product.findMany({
            where: {
                id: {in: productIds}
            }
        })

        const totalAmount = productsDataInOrder.reduce((total, productData) => {
            const quantity = cartItemList.find(item => item.product_id === productData.id)?.product_quantity ?? 0;

            return total = total + productData.price * quantity;
        }, 0);

        return totalAmount;
    }
    catch(error){
        throw error;
    }
}

async function createSellerOrders(order_id: string, address_id: string, productIds: string[], user_id?: string): Promise<SellerOrder[] | null>
{
    try{
        const productSellerIds = await prismadb.product.findMany({
            where: {
                id : {in: productIds}
            },
            distinct: ['user_id'],
            select: {
                user_id: true
            }
        })
        
        const sellerOrdersData = productSellerIds.map(product => {
            return {
                seller_id: product.user_id,
                buyer_id: user_id,
                order_id,
                address_id
            }
        })
        
        await prismadb.sellerOrder.createMany({
            data: sellerOrdersData
        });

        const newSellerOrders = await prismadb.sellerOrder.findMany({
            where: {
                order_id
            }
        })

        return newSellerOrders;
    }
    catch(error){
        throw error;
    }
}

async function createOrderItemsFromCartItems(order_id: string, address_id: string, productIds: string[], cartItems: {product_id: string, product_quantity: number}[], user_id?: string)
{
    try{
        const newSellerOrders = await createSellerOrders(order_id, address_id, productIds, user_id);

        const productData = await prismadb.product.findMany({
            where: {
                id: {in: productIds}
            },
            select: {
                id: true,
                title: true,
                price: true,
                user_id: true
            }
        })

        const orderItems = cartItems.map(item => {
            const product = productData.find(product => product.id === item.product_id);
            const sellerOrder = newSellerOrders?.find(sellerOrder => sellerOrder.seller_id === product?.user_id);

            if(!product) throw new Error("Product not found");

            return {
                order_id: order_id,
                product_id: item.product_id,
                product_quantity: item.product_quantity,
                product_name: product.title,
                product_price: product.price,
                seller_order_id: sellerOrder?.id
            }
        });

        const newOrderItems = await prismadb.orderItem.createMany({
            data: orderItems
        }) 
    }
    catch(error){
        throw error;
    }
}

export async function updateOrderStatus(id: string, data: {orderStatus: OrderStatus}, self_user_data: {user_id: string; email: string; role: Role})
{
    try{
        await prismadb.order.update({
            where: {
                id_buyer_id: {
                    id,
                    buyer_id: self_user_data.user_id
                }
            },
            data: {
                ...data
            }
        })

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Order status updated successfully.",
                data: []
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function getOrderDetail(id: string, self_user_data: {user_id: string; email: string; role: Role})
{
    try{
        let orderDetail: Order | null;

        if(self_user_data.role === Role.MASTER_ADMIN){
            orderDetail = await prismadb.order.findUnique({
                where: {
                    id
                },
                include: {
                    items: true,
                    buyer: true
                }
            })
        }
        else{
            orderDetail = await prismadb.order.findUnique({
                where: {
                    id_buyer_id: {
                        id,
                        buyer_id: self_user_data.user_id
                    }
                },
                include: {
                    items: true,
                    buyer: true
                }
            })
        }
        
        return new Response(
            JSON.stringify({
                status: "success",
                message: "Order detail retrieved successfully.",
                data: orderDetail ?? []
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function getOrderListOfUser(user_id: string)
{
    //access permissions is handled inside route handler
    try{
        const ordersOfUser = await prismadb.order.findMany({
            where: {
                buyer_id: user_id
            }
        })

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Orders of user retrieved successfully.",
                data: ordersOfUser
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function deleteOrder(id: string, self_user_data?: {user_id: string; email: string; role: Role})
{
    try{
        if(self_user_data){
            const {user_id} = self_user_data;

            await prismadb.$transaction([
                prismadb.orderItem.deleteMany({
                    where: {
                        order_id: id
                    }
                }),
                prismadb.sellerOrder.deleteMany({
                    where: {
                        order_id: id
                    }
                }),
                prismadb.order.delete({
                    where: {
                        id_buyer_id: {
                            id,
                            buyer_id: user_id
                        }
                    }
                })
            ]);
        }
        else{
            const orderAddress = await AddressController.getAddressByOrderID(id);

            await prismadb.$transaction([
                prismadb.orderItem.deleteMany({
                    where: {
                        order_id: id
                    }
                }),
                prismadb.sellerOrder.deleteMany({
                    where: {
                        order_id: id
                    }
                }),
                prismadb.order.delete({
                    where: {
                        id
                    }
                }),
                prismadb.address.delete({
                    where: {
                        id: orderAddress?.id
                    }
                })
            ])
        }
        
        return new Response(
            JSON.stringify({
                status: "success",
                message: "Orders deleted successfully.",
                data: []
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}