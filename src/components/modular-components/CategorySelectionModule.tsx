/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import debounce from "debounce";
import { useState, useEffect, useRef, useCallback } from "react";
import { ProductApi, CategoryApi } from "@/services/api";
import { queryClient } from "@/services/apiInstance";

import BasicButton from "../custom-elements/Buttons";
import LoadingSpinnerBlock from "../placeholder-components/LoadingSpinnerBlock";

const maxCategoriesPerProduct = 4;

export const CategorySelectionModule = ({
  productId = '', 
  className, 
  editMode,
  selectedCategories,
  setSelectedCategories
} : {
  productId?: string, 
  className: string, 
  editMode: 'create' | 'edit',
  selectedCategories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}) => {
    const [categoriesData, setCategoriesData] = useState<Category[]>([]);
    const [isCategoryDataSyncing, setIsCategoryDataSyncing] = useState(false);

    const categoriesToDeleteRef = useRef<string[]>([]);

  // [[HOOKS]]
  // GET => FETCH QUERIES
  const { data: categoriesDataAll, isError: categoriesFetchError, isLoading: categoriesFetchLoading } = CategoryApi.useGetCategoriesRQ();

  const { data: productCategoriesData, isError: productCategoriesFetchError, isLoading: productCategoriesFetchLoading } = ProductApi.useGetProductCategoriesRQ({productId, enabled: editMode === 'edit'});

  // UPDATE + PATCH + DELETE => MUTATIONS
  const { mutate: modifyProductCategoriesMutate } = ProductApi.useModifyProductCategoriesRQ(
    () => {
      setIsCategoryDataSyncing(false);
      queryClient.invalidateQueries({queryKey: ["categories", productId]});
    },
    () => {}
  );

  const debouncedAddProductCategories = useCallback(
    debounce((productId: string, productCategories: Category[]) => {  
      modifyProductCategoriesMutate({
        productId,
        productCategories: productCategories.map((cat) => cat.id),
        action: 'add',
      });
    }, 500), 
    [] // -> no dependencies, so it will not change
  );

  const debouncedDeleteProductCategories = useCallback(
    debounce((productId: string, categoryIds: string[]) => {
      modifyProductCategoriesMutate({ 
        productId, 
        productCategories: categoryIds, 
        action: 'remove'
      });
    }, 500),
    [] // -> no dependencies, so it will not change
  );

  useEffect(() => {
    setCategoriesData(categoriesDataAll?.data ?? []);
    
    if(productCategoriesData?.data && productCategoriesData?.data?.length > 0){
      setSelectedCategories(productCategoriesData?.data ?? []);
    }
  }, [categoriesDataAll, productCategoriesData]);

  // FUNCTION CALLS
  const addProductCategory = (category: Category | undefined) => {
    if (category && selectedCategories.length < maxCategoriesPerProduct) {
      if (!selectedCategories.some((c) => c.id === category.id)) {
        setSelectedCategories((prev) => [...prev, { id: category.id, title: category.title }]);
        
        if(editMode === 'edit'){
          setIsCategoryDataSyncing(true);
          debouncedAddProductCategories(productId, [...selectedCategories, { id: category.id, title: category.title }]);
        }
      }
    }
  };

  const removeProductCategory = (categoryId: string) => {
    setSelectedCategories(selectedCategories.filter((c) => c.id !== categoryId));
    categoriesToDeleteRef.current = [...categoriesToDeleteRef.current, categoryId];
    
    if(editMode === 'edit'){
      setIsCategoryDataSyncing(true);
      debouncedDeleteProductCategories(productId, categoriesToDeleteRef.current);
    }
  };

  return (
    <div className={`flex flex-col space-y-2 mb-4 ${className}`}>
      {/* Product Categories Header */}
      <label className="w-fit">
        Product Categories
      </label>

      {/* Selected Categories */}
      <div className={`h-[100px] gap-2 contain-content rounded-sm bg-gray-400 ${selectedCategories?.length > 0 && ("border-green-700 border-2")}`}>
        {selectedCategories?.length > 0 &&
          selectedCategories.map((category) => (
            <div
              className="relative inline-block w-fit items-center p-1 mx-1 mt-1 text-sm md:text-base text-white rounded-md"
              key={category.id}
            >
              <div className="flex">
                {category.title}
                <div className="min-w-[40px]"></div>
                <button className="absolute flex right-0 top-0 h-[25px] w-[25px] items-center justify-center text-center bg-red-500 hover:bg-red-400" type="button" onClick={() => removeProductCategory(category.id)}>×</button>
              </div>
            </div>
          ))}
      </div>

      <div className="flex flex-row h-[100px] justify-between">
        {/* Button Selection Mode */}
        <div className="h-[100px] w-full contain-content gap-2 rounded-sm bg-gray-600 border-green-900 border-1">
          {categoriesData?.length > 0 &&
            categoriesData.map((category) => (
              <BasicButton
                key={category.id}
                buttonColor="bg-green-500 hover:bg-green-400"
                buttonTextColor="text-white"
                extraStyle="mb-1 mt-1 mr-1 text-sm md:text-base p-1 md:p-2"
                onClick={() => addProductCategory(category)}
              >
                {category.title}
              </BasicButton>
            ))}
        </div>
        
        <div className="flex flex-col items-center">
          <LoadingSpinnerBlock className="h-[50px]" isOpen={isCategoryDataSyncing} />
        </div>
      </div>
    </div>
  );
};
