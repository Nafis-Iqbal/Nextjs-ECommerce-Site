import { HorizontalDivider } from "@/components/custom-elements/UIUtilities"
import { CartManagerModule } from "@/components/modular-components/CartManagerModule";
import { BuyerOrderManagerModule } from "@/components/modular-components/BuyerOrderManagerModule";
import { WishlistManagerModule } from "@/components/modular-components/WishlistManagerModule";

export default function ConsumerDashboard() {

    return (
        <section className="flex flex-col p-2 font-sans" id="dashboard_consumer">
            <div className="ml-6 flex flex-col space-y-2">
                <h3 className="text-green-500">Your Transactions</h3>
                <p className="text-green-200">All your shopping records, in one place.</p>

                <CartManagerModule className="mt-5" />

                <BuyerOrderManagerModule />

                <WishlistManagerModule />
            </div>
            
            <HorizontalDivider className="border-green-500 mt-20"/>
        </section>
    )
}

