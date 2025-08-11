export const PaymentConsole = ({className} : {className?: string}) => {
    return (
        <div className={`flex flex-col mt-auto space-y-3 ${className}`}>
            <label>Payment Options:</label>

            <div className="flex justify-left space-x-10 w-full">
                <div className="w-40% min-h-[80px] px-8 py-4 border-1 border-green-800">
                    Payment Option 1
                </div>

                <div className="w-40% min-h-[80px] px-8 py-4 border-1 border-green-800">
                    Payment Option 2
                </div>

                <div className="w-40% min-h-[80px] px-8 py-4 border-1 border-green-800">
                    Others
                </div>
            </div>
        </div>
    );
};
