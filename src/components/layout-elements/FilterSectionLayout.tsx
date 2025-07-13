const FilterSectionLayout = ({children, className} : {children: React.ReactNode, className?: string}) => {
    return (
        <div className={`flex flex-col mt-6 space-y-3 ${className}`}>
            <h4 className="text-green-300">Filters</h4>
            {children}
        </div>
    )
}

export default FilterSectionLayout;