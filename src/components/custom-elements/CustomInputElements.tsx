export const CustomTextInput = ({customStyle, placeholderText} : {customStyle?: string, placeholderText?: string, onChange?: () => void}) => {
    return (
        <input className={`p-1 bg-gray-100 border border-gray-300 placeholder-gray-400 text-gray-800 rounded-sm
            focus:outline-none focus:ring-2 focus:ring-green-600 ${customStyle}`} type="text" placeholder={placeholderText}
        />
    )
}

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  options: Option[];
  value: string;
  defaultSelectText?: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function CustomSelect({
  options,
  value,
  defaultSelectText = "-- Select an input --",
  onChange,
  className = "",
}: CustomSelectProps) {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className={`p-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}