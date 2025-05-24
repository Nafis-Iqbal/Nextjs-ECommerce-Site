export const HorizontalDivider = ({className} : {className: string}) => {
    return (
        <hr className={`border-t border-gray-300 my-4 ${className}`} />
    );
}

export const VerticalDivider = ({ className = "", height = "h-full" }: {className: string, height: string}) => (
  <div className={`border-l border-gray-300 ${height} ${className}`} />
);

const DivGap = ({customHeightGap = "h-[50px]"} : {customHeightGap?: string}) => {
    return(
        <div className={customHeightGap}></div>
    );
}

export default DivGap;