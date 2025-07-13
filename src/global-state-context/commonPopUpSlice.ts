import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonPopupState{
    isLoading: boolean;
    notification: {
        message: string;
        type: 'success' | 'error' | 'info' | null;
        isVisible: boolean;
    };
    photoUploadView: {
        pic_url: string;
        isVisible: boolean;
    }
}

const initialState: CommonPopupState = {
    isLoading: false,
    notification: {
        message: '',
        type: 'info',
        isVisible: false,
    },
    photoUploadView: {
        pic_url: '',
        isVisible: false,
    }
}

const commonPopUpSlice = createSlice({
    name: 'popUps',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setNotification: (
            state, 
            action: PayloadAction<{
                message: string; 
                type: 'success' | 'error' | 'info'; 
                isVisible: boolean;
            }>
        ) => {
            state.notification = action.payload;
        },
        setPhotoUploadView: (
            state, 
            action: PayloadAction<{
                pic_url: string;
                isVisible: boolean;
            }>
        ) => {
            state.photoUploadView = action.payload;
        }
    },
});

export const {setLoading, setNotification, setPhotoUploadView} = commonPopUpSlice.actions;
export default commonPopUpSlice.reducer;