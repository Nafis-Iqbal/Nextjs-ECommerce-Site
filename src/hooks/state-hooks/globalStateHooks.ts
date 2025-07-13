import { useDispatch } from 'react-redux';
import { setLoading, setNotification, setPhotoUploadView } from '../../global-state-context/commonPopUpSlice';

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

    const openPhotoUploadWindow = (setStatus: boolean, pic_url: string = '') => {
        dispatch(setPhotoUploadView({
            isVisible: setStatus,
            pic_url
        }));
    }

    return {
        showLoadingContent,
        openNotificationPopUpMessage,
        openPhotoUploadWindow
    };
};

