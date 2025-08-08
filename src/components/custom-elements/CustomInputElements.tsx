import React, {forwardRef} from "react";

type CustomInputProps = {
  className?: string;
  placeholderText?: string;
  label?: string;
  labelStyle?: string; 
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>

export const CustomMiniTextInput = forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
    const {
      className,
      placeholderText,
      label,
      labelStyle,
      error,
      ...rest
    } = props;

    return (
      <input className={`p-1 bg-white border border-gray-300 placeholder-gray-400 text-gray-800 rounded-sm
          focus:outline-none focus:ring-2 focus:ring-green-600 ${className}`} placeholder={placeholderText}
          style={{ textIndent: '6px' }}
          ref={ref}
          { ...rest }
      />
    )
})

CustomMiniTextInput.displayName = "CustomMiniTextInput";

export const CustomTextInput = forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
    const {
      className,
      placeholderText,
      label,
      labelStyle,
      error,
      ...rest
    } = props;

    return (
      <div className="relative flex flex-col space-y-3 group">
        {label && <label className={labelStyle}>{label}</label>}
        
        <input className={`p-1 bg-white border border-gray-300 placeholder-gray-400 text-gray-800 rounded-sm
            focus:outline-none focus:ring-2 focus:ring-green-600 ${className}`} placeholder={placeholderText}
            style={{ textIndent: '6px' }}
            ref={ref}
            { ...rest }
        />

        {error && (
          <div className="absolute right-0 mt-1 text-xs text-white bg-red-500 p-1 rounded shadow z-10">
            {error}
          </div>
        )}
      </div>
    )
})

CustomTextInput.displayName = "CustomTextInput";

type CustomTextAreaProps = {
  className?: string;
  placeholderText?: string;
  label?: string;
  labelStyle?: string; 
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const CustomTextAreaInput = forwardRef<HTMLTextAreaElement, CustomTextAreaProps>((props, ref) => {
    const {
      className,
      placeholderText,
      label,
      labelStyle,
      error,
      ...rest
    } = props;

    return (
      <div className="relative flex flex-col space-y-3 group">
        {label && <label className={labelStyle}>{label}</label>}

        <textarea className={`p-1 bg-white border border-gray-300 placeholder-gray-400 text-gray-800 rounded-sm
            focus:outline-none focus:ring-2 focus:ring-green-600 ${className}`} placeholder={placeholderText}
            style={{ textIndent: '6px' }}
            ref={ref}
            { ...rest }
        />
        
        {error && (
          <div className="absolute right-0 mt-1 text-xs text-white bg-red-500 p-1 rounded shadow z-10">
            {error}
          </div>
        )}
      </div>
    )
})

CustomTextAreaInput.displayName = "CustomTextAreaInput";

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  options: Option[];
  defaultSelectText?: string;
  className?: string;
  label?: string;
  labelStyle?: string;
  error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const CustomSelectInput = forwardRef<HTMLSelectElement, CustomSelectProps>((props, ref) => {
  const {
    options,
    defaultSelectText = "-- Select an input --",
    className = "",
    label,
    error,
    labelStyle,
    ...rest
  } = props;

  return (
    <div className="relative flex flex-col space-y-3 group">
      {label && <label className={labelStyle}>{label}</label>}

      <select
        className={`p-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
        ref={ref}
        { ...rest }
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <div className="absolute left-0 mt-1 text-xs text-white bg-red-500 p-1 rounded shadow z-10">
          {error}
        </div>
      )}
    </div>
  );
})

CustomSelectInput.displayName = "CustomSelectInput";