import { AddressManagerModule } from "./AddressManagerModule";

export const UserInfoModule = () => {
    return (
        <div className="flex flex-col space-y-5">
            <div className="flex flex-col">
                <p className="text-green-300 text-xl">Name:&nbsp;&nbsp;<span className="text-white">Nafis</span></p>
                <p className="text-green-300 text-xl">Email:&nbsp;&nbsp;<span className="text-white">nafisiqbal53@gmail.com</span></p>
                <p className="text-green-300 text-xl">Phone:&nbsp;&nbsp;<span className="text-white">01884694591</span></p>
            </div>
            
            <AddressManagerModule/>
        </div>
    );
};
