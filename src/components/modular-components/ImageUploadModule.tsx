/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import debounce from "debounce";
import { useState, useEffect, useCallback, useRef } from "react";
import { apiFetchExternalURL } from "@/services/apiInstance";
import { useGlobalUI } from "@/hooks/state-hooks/globalStateHooks";

import LoadingSpinnerBlock from "../placeholder-components/LoadingSpinnerBlock";

const MAX_SIZE_MB = 1;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const MAX_FILES = 3;

export const ImageUploadModule = ({
    className, 
    imageUploadMode, //Decides which update mutation to use: "create" or "edit"
    actionTrigger, 
    resourceId, //Both actionTrigger, and resourceId are used in combo for uploading images in create and update mode.
    oldProductImages,
    pic_url_Builder, 
    updateResourceMutation,
    deleteResourceMutation
} : {
    className?: string, 
    imageUploadMode: "create" | "edit",
    actionTrigger: boolean;
    resourceId?: string, 
    oldProductImages?: Image[], // For edit mode, to show existing images
    pic_url_Builder: (resourceId: string) => string, 
    updateResourceMutation: ({id, imageURLs} : {id: string, imageURLs: string[]}) => void,
    deleteResourceMutation: ({id, imageIds} : {id: string, imageIds: string[]}) => void
}) => {
    const [pendingFiles, setPendingFiles] = useState<File[]>([]); // For prompt mode
    const [productImages, setProductImages] = useState<Image[]>(oldProductImages || []);
    const imageURLsToDeleteRef = useRef<string[]>([]);
    const [isImageDataSyncing, setIsImageDataSyncing] = useState(false);

    const {showLoadingContent, openNotificationPopUpMessage} = useGlobalUI();
    
    useEffect(() => {
        if(oldProductImages){
            setProductImages(oldProductImages);
        }
    }, [oldProductImages]);

    useEffect(() => {
        const objectURLs = pendingFiles.map(file => URL.createObjectURL(file));

        return () => {
            objectURLs.forEach(url => URL.revokeObjectURL(url));
        };
    }, [pendingFiles]);

    useEffect(() => {
        if(resourceId && actionTrigger){
            const uploadResourceImages = async () => {
                const uploadedImageURLs = await uploadFiles(pendingFiles);
                updateResourceMutation({id: resourceId, imageURLs: uploadedImageURLs}); 
            }
            
            uploadResourceImages();
        }
    }, [resourceId, actionTrigger]);
    
    //Image Upload methods
    const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const validFiles = files.filter((file) => file.size <= MAX_SIZE_BYTES);

        if (validFiles.length !== files.length) {
            openNotificationPopUpMessage(`Some files exceed the ${MAX_SIZE_MB}MB limit and were skipped.`);
        }

        const totalFiles = [...pendingFiles, ...validFiles];

        if (totalFiles.length + productImages.length > MAX_FILES) {
            openNotificationPopUpMessage(`You can only upload up to ${MAX_FILES} images.`);
            setPendingFiles(totalFiles.slice(0, MAX_FILES - productImages.length)); // keep only first 3
        } else {
            setPendingFiles(totalFiles);
        }
    };

    const handleRemoveFile = (index: number) => {
        setPendingFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleRemoveUploadedFile = (image_id: string, product_id: string) => {
        setProductImages(productImages.filter((c) => c.id !== image_id));
        imageURLsToDeleteRef.current = [...imageURLsToDeleteRef.current, image_id];
        
        if(imageUploadMode === 'edit'){
            setIsImageDataSyncing(true);
            debouncedDeleteImageURLs(imageURLsToDeleteRef.current);
        }
    };

    const debouncedDeleteImageURLs = useCallback(
        debounce((imageIds: string[]) => {
            deleteResourceMutation({id: resourceId ?? "", imageIds});
        }, 500),
        [] // -> no dependencies, so it will not change
    );
        
    const uploadFiles = async (files: File[]): Promise<string[]> => {
        if (!files || files.length === 0) return [];

        showLoadingContent(true);
        try {
            const uploadedUrls: string[] = [];

            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_UPLOAD_PRESET ?? "");
                formData.append("folder", pic_url_Builder(resourceId ?? ""));

                const res = await apiFetchExternalURL(process.env.NEXT_PUBLIC_PIC_HOST ?? "", {
                    method: "POST",
                    body: formData,
                });

                uploadedUrls.push(res.url);
            }

            setPendingFiles([]);

            return uploadedUrls;
        } catch (err) {
            console.error("Upload failed:", err);
            onPicUpdateFailure();
            return [];
        }
    };
    
    const onPicUpdateFailure = () => {
        showLoadingContent(false);
        openNotificationPopUpMessage("Image saving to DB failed.");
    };

    return (
        <div className={`flex flex-col space-y-2 ${className}`}>
            <label className="text-green-300">Add Product Images</label>

            <div className="flex">
                <input className="w-fit bg-gray-300 text-gray-800" type="file" accept="image/*" onChange={handleFileSelection} multiple />

                <LoadingSpinnerBlock isOpen={isImageDataSyncing} className="w-[30px] h-[30px] ml-2" />
            </div>
            
            {(pendingFiles.length > 0 || productImages.length > 0)&& (
                <div className="flex flex-wrap md:w-[650px] p-2 gap-2 bg-white border-green-600 border-1 rounded-sm">
                    {pendingFiles.map((file, idx) => (
                        <div className="relative flex w-[150px] h-[150px] object-cover rounded-md" key={idx}>
                            <Image    
                                src={URL.createObjectURL(file)}
                                alt={`Pending ${idx}`}
                                width={150}
                                height={150}
                            />

                            <button className="absolute flex justify-center items-center top-0 right-0 bg-red-500 hover:bg-400 h-[20px] w-[20px]" 
                                onClick={() => handleRemoveFile(idx)} type="button">
                                x
                            </button>
                        </div>
                    ))}
                    
                    {productImages && productImages.map((image, idx) => (
                        <div className="relative flex w-[150px] h-[150px] object-cover rounded-md" key={idx}>
                            <Image
                                src={image.url}
                                alt={`Existing ${idx}`}
                                width={150}
                                height={150}
                            />

                            <button className="absolute flex justify-center items-center top-0 right-0 bg-red-500 hover:bg-red-400 h-[20px] w-[20px]" 
                                onClick={() => handleRemoveUploadedFile(image.id, image?.product_id ?? "")} type="button">
                                x
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}