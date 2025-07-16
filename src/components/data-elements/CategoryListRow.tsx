import { useState, useRef, useEffect } from "react";

import BasicButton from "../custom-elements/Buttons";
import LoadingSpinnerBlock from "../placeholder-components/LoadingSpinnerBlock";

const CategoryListRow = ({category, onUpdate, onDelete} : {category: Category, onUpdate: (category: Category) => void, onDelete: (category_id:string) => void}) => {
    const [categoryTitle, setCategoryTitle] = useState<string>(category.title);
    const [isSpinnerActive, setIsSpinnerActive] = useState(false);

    const currentCategoryTitle = useRef<string>(category.title);

    useEffect(() => {
        currentCategoryTitle.current = categoryTitle;
        setIsSpinnerActive(false);
    }, [categoryTitle]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryTitle(e.target.value);
    }

    const handleBlur = () => {
        setTimeout(() => {
            setCategoryTitle(currentCategoryTitle.current);
        }, 500);
    }

    return(
        <tr className="bg-pink-200 p-4 rounded-lg w-1/2 text-center border-b">
            <td className="text-red-900 font-semibold text-sm md:text-base">
                {category.title}
            </td>
            <td className="">
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={categoryTitle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full px-4 py-1 md:py-2 text-black text-sm md:text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </td>
            <td>
                <LoadingSpinnerBlock isOpen={isSpinnerActive} customStyle="w-8 ml-6"/>
            </td>
            <td>
                <BasicButton
                    buttonColor="green-500"
                    buttonTextColor="white"
                    onClick={() => {
                        onUpdate({id: category.id, title: categoryTitle});
                        setIsSpinnerActive(true);
                    }}
                    extraStyle="p-1 bg-emerald-400 hover:bg-emerald-500 text-sm md:text-base"
                >
                    Update Tag
                </BasicButton>
            </td>
            <td>
                <BasicButton
                    buttonColor="red-500"
                    buttonTextColor="white"
                    onClick={() => {
                        onDelete(category.id ?? '');
                        setIsSpinnerActive(true);
                    }}
                    extraStyle="p-1 bg-red-500 hover:bg-red-600 text-white text-sm md:text-base"
                >
                    Delete Tag
                </BasicButton>
            </td>
        </tr>
    );
}

export default CategoryListRow;