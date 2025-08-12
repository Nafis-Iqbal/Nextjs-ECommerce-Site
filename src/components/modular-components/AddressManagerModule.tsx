export const AddressManagerModule = ({className} : {className?: string}) => {
    return (
        <div className={`flex flex-col space-y-3 ${className}`}>
            <div className="flex space-x-3">
                <h4 className="text-green-300">Shipping Address</h4>
            </div>
            
            <div className="flex space-x-3">
                <p>addressLine1, </p>
                <p>addressLine2</p>
            </div>

            <div className="flex space-x-3">
                <p className="text-green-300">Country:&nbsp; <span className="text-white">Bangladesh</span></p>
                <p className="text-green-300">City:&nbsp; <span className="text-white">Mirpur</span></p>
                <p className="text-green-300">State:&nbsp; <span className="text-white">Dhaka</span></p>
            </div>
            
            <div className="flex space-x-3">
                <p className="text-green-300">Postal Code:&nbsp; <span className="text-white">2100</span></p>
                <p className="text-green-300">Phone Number:&nbsp; <span className="text-white">01884694591</span></p>
            </div>
        </div>
    );
};
