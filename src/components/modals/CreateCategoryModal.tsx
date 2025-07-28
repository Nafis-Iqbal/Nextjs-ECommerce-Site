import { useState, useEffect, useRef } from 'react';

import { CategoryApi } from '@/services/api';
import { queryClient } from '@/services/api/apiInstance';
import { CustomTextInput } from '../custom-elements/CustomInputElements';

export default function CreateCategoryModal({isOpen, onClose, onSubmit, onSuccess, onFailure}: CreateCategoryModalProps){
    const inputRef = useRef<HTMLInputElement>(null);

    const[formData, setFormData] = useState<Category>({
        id: '',
        title: ''
    });

    const {mutate: createCategoryMutate} = CategoryApi.useCreateCategoryRQ(
        (responseData) => {
            if(responseData.status === "success")
            {
                onSuccess(formData);
                queryClient.invalidateQueries({ queryKey: ["categories"] });

                setFormData({
                    id: '',
                    title: ''
                });
            }
            else{
                onFailure();
            }
        },
        () => {
            onFailure();
        }
    );

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const{name, value} = e.target;
      
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'end_date' ? new Date(value) : value,
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit();
        
        createCategoryMutate(formData);
        onClose();
    }

    const handleClose = () => {
        setFormData({
          id: '',
          title: ''
        });

        onClose();
    }

    if (!isOpen) return null;

    return(
        <div className="fixed inset-0 -top-4 flex justify-center items-center bg-gray-100/30 backdrop-blur-sm z-50">
            <div className="rounded-sm p-6 shadow-lg w-full max-w-lg">
                <h2 className="text-2xl text-green-500 font-semibold mb-4">Create Tag</h2>
    
                <form onSubmit={(e) => handleSubmit(e)}> {/* Delegate form submission to parent */}
                    {/* Task Title */}
                    <div className="mb-4">
                    <label htmlFor="title" className="block mb-3 text-base md:text-lg font-medium text-green-300">
                        Tag Title
                    </label>
                    <CustomTextInput
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        ref={inputRef}
                        required
                        className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    </div>
        
                    {/* Submit Button */}
                    <div className="flex justify-between">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600"
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-green-600 text-white rounded-sm hover:bg-green-500"
                    >
                        Create Tag
                    </button>
                    </div>
                </form>          
            </div>
        </div>
    );
}