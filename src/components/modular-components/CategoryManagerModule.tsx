"use client";

import React, { useState, useEffect } from 'react';

import { queryClient } from '@/services/api/apiInstance';
import { CategoryApi } from '@/services/api';
import { useGlobalUI } from '../../hooks/state-hooks/globalStateHooks';

import { TableDataBlock } from '../custom-elements/TableDataBlock';
import CreateCategoryModal from '../modals/CreateCategoryModal';
import { HorizontalDivider } from '../custom-elements/UIUtilities';

const CategoryManagerModule:React.FC<{className?: string}> = ({className}) => {
    const [categoriesData, setCategoriesData] = useState<Category[]>([]);
    const [categoriesFetchMessage, setCategoriesFetchMessage] = useState<string>("");
    const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
    const {showLoadingContent, openNotificationPopUpMessage} = useGlobalUI();

    const {data: categoriesDataAll, isLoading: categoriesDataLoading} = CategoryApi.useGetCategoriesRQ();

    const {mutate: deleteCategoryMutate} = CategoryApi.useDeleteCategoryRQ(
        (responseData) => {
            if(responseData.status === "success")
            {
                showLoadingContent(false);
                openNotificationPopUpMessage("Category deleted successfully.");

                queryClient.invalidateQueries({ queryKey: ["categories"] });
            }
            else{
                showLoadingContent(false);
                openNotificationPopUpMessage("Failed to delete category. Try again");
            }
            
        },
        () => {
            showLoadingContent(false);
            openNotificationPopUpMessage("Failed to delete category. Try again");
        }
    );

    useEffect(() => {
        if(categoriesDataAll?.data)
        {
            setCategoriesData(categoriesDataAll.data);
        }
    }, [categoriesDataAll])

    const openCreateCategoryForm = () => {
        setIsCreateCategoryOpen(true);
    }

    const onCreateCategorySubmit = () => {
        showLoadingContent(true);
    }

    const onCreateCategorySuccess = (formData: Category) => {
        showLoadingContent(false);

        openNotificationPopUpMessage("Tag created successfully!");

        if(categoriesData){
            setCategoriesData((prevTags) => [
                ...prevTags,
                {
                id: formData.id, // Generate a new task ID
                title: formData.title,
                }
            ]);
        }

        queryClient.invalidateQueries({ queryKey: ["categories"] });
    }

    const onCreateCategoryFailure = () => {
        showLoadingContent(false);
        openNotificationPopUpMessage("Error creating task tag!");
    }

    return (
        <div id="tag_section" className={`relative flex flex-col justify-left ${className}`}>
            <h4 className="text-white mb-5">Category Manager</h4>

            <CreateCategoryModal
                isOpen={isCreateCategoryOpen}
                onClose={() => setIsCreateCategoryOpen(false)}
                onSubmit={onCreateCategorySubmit}
                onSuccess={onCreateCategorySuccess}
                onFailure={onCreateCategoryFailure}
            />

            <table className="w-full border-1 border-green-900 space-y-1">
                <thead>
                    <tr className="bg-gray-600 w-[100%]">
                        <th className="px-4 w-[20%] rounded-tl-sm">Category Title</th>
                        <th className="px-4 w-[30%]">Edit</th>
                        <th className="px-4 w-[10%]"></th>
                        <th className="px-4 w-[20%]">Actions</th>
                        <th className="px-4 w-[20%] rounded-tr-sm">
                            <button className='p-2 mx-2 bg-green-600 hover:bg-green-500 text-white rounded-sm' onClick={() => openCreateCategoryForm()}>Create New Tag</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <TableDataBlock
                    dataList={categoriesData}
                    isDataLoading={categoriesDataLoading}
                    dataFetchMessage={categoriesFetchMessage}
                    noContentColSpan={5}
                    onDataDelete={(id: string) => deleteCategoryMutate(id)}
                    />
                </tbody>
            </table>

            <HorizontalDivider className='mt-20 mb-10'/>
        </div>
    );
}

export default CategoryManagerModule;