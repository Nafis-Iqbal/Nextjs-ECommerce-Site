/* eslint-disable @typescript-eslint/no-explicit-any */
import { isCategoryArray } from "@/utilities/utilities";

import LoadingSpinner from "../placeholder-components/LoadingAnimationDiv";
import CategoryListRow from "../data-elements/CategoryListRow";
import { NoContentTableRow } from "../placeholder-components/NoContentTableRow";

interface TableBlockProps<T>{
    dataList: T[];
    isDataLoading: boolean;
    dataFetchMessage: string;
    noContentColSpan?: number;
    onDataUpdate?: (data: any) => void;
    onDataDelete?: (id: string) => void;
    onClickNavigate?: (id: string) => void;
}

export const TableDataBlock = <T extends {id: string}>({dataList, dataFetchMessage, noContentColSpan, onDataUpdate, onDataDelete, onClickNavigate, isDataLoading} : TableBlockProps<T>) => {    
    if(isDataLoading){
        return (
            <tr>
                <td colSpan={noContentColSpan? noContentColSpan: 4}>
                  <LoadingSpinner/>
                </td>
            </tr>
        );
    }
    
    if(dataList && dataList.length > 0)
    {
        if(isCategoryArray(dataList))
        {
            return (
                <>
                    {(dataList as Category[]).map((data) => (
                        <CategoryListRow key={data.id} category={data} onUpdate={(category: Category) => onDataUpdate?.(category)} onDelete={() => onDataDelete?.(data.id ?? '')}/>
                    ))}
                </>
            );
        }
        else{
            return (
                <div>{dataFetchMessage}</div>
            );
        }
    }
    else
    {
        //Table will be empty, due to network error, or empty list
        return (
            <>
                <NoContentTableRow displayMessage={dataFetchMessage} tdColSpan={noContentColSpan? noContentColSpan: 1}/>
            </>
        );
    }
}