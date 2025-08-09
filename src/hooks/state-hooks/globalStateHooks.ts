import { useDispatch } from 'react-redux';
import { setLoading, setNotification } from '../../global-state-context/commonPopUpSlice';
import * as cartActions from '@/global-state-context/cartUpdateSlice';

export const useGlobalUI = () => {
    const dispatch = useDispatch();

    const showLoadingContent = (setStatus: boolean) => {
        dispatch(setLoading(setStatus));
    };

    const openNotificationPopUpMessage = (notificationMessage: string) => {
        dispatch(setNotification({
            isVisible: true,
            message: notificationMessage,
            type: 'info'
        }));
    };

    const openCartUpdatePopUp = (productInfo: {
        itemId: string;
        productId: string;
        productName: string;
        productPrice: number;
        productQuantity: number;
    }) => {
        dispatch(cartActions.setVisibility(true));
        dispatch(cartActions.addCartItem({
            ...productInfo
        }));
    };

    return {
        showLoadingContent,
        openNotificationPopUpMessage,
        openCartUpdatePopUp
    };
};

