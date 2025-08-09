import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    itemId: string;
    productId: string;
    productName: string;
    productPrice: number;
    productQuantity: number;
}

interface CartState {
    isOpen: boolean;
    items: CartItem[];
    recentProductName: string;
    recentProductId: string;
}

const initialState: CartState = {
    isOpen: false,
    items: [],
    recentProductName: '',
    recentProductId: '',
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setVisibility: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        addCartItem: (
            state, 
            action: PayloadAction<CartItem>
        ) => {
            const existingItem = state.items.find(
                (item) => item.productId === action.payload.productId
            );

            if (existingItem) {
                existingItem.productQuantity += action.payload.productQuantity;
            } else {
                state.items.push(action.payload);
            }

            state.recentProductName = action.payload.productName;
            state.recentProductId = action.payload.productId;
        },
        updateCartItemQuantity: (
            state,
            action: PayloadAction<{ productId: string; quantity: number }>
        ) => {
            const item = state.items.find(
                (item) => item.productId === action.payload.productId
            );

            if (item) {
                item.productQuantity = action.payload.quantity;
            }
        },
        removeCartItem: (
            state, 
            action: PayloadAction<string>
        ) => {
            state.items = state.items.filter(
                (item) => item.productId !== action.payload
            );
        },
        clearCart: (
            state
        ) => {
            state.items = [];
        },
    },
});

export const { addCartItem, updateCartItemQuantity, removeCartItem, clearCart, setVisibility } =
  cartSlice.actions;
export default cartSlice.reducer;
