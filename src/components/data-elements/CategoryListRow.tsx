import { useState, useRef, useEffect } from "react";

import makeFirstLetterUppercase from "@/utilities/utilities";

import BasicButton from "../custom-elements/Buttons";
import LoadingSpinnerBlock from "../placeholder-components/LoadingSpinnerBlock";
import { CustomTextInput } from "../custom-elements/CustomInputElements";
import TableLayout from "../layout-elements/TableLayout";

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
        <tr className="text-center border-b-1 border-green-900">
            <td className="text-white">
                {makeFirstLetterUppercase(category.title)}
            </td>
            <td className="">
                <CustomTextInput
                    id="title"
                    name="title"
                    value={categoryTitle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full"
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
                        //setIsSpinnerActive(true);
                    }}
                    extraStyle="bg-green-600 hover:bg-green-500 text-sm md:text-base rounded-sm"
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
                        //setIsSpinnerActive(true);
                    }}
                    extraStyle="bg-red-600 hover:bg-red-500 text-white text-sm md:text-base rounded-sm"
                >
                    Delete Tag
                </BasicButton>
            </td>
        </tr>
    );
}

export default CategoryListRow;