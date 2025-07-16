import TableLayout from "@/components/layout-elements/TableLayout"
import ProductViewListTableRow from "@/components/data-elements/DataTableRowElements"

export default function ProductListingsPage() {
    return (
        <div className="flex flex-col p-2 font-sans mt-5">
            <div className="ml-6 flex flex-col space-y-2">
                <h3 className="text-green-500">Products</h3>
                <p className="text-green-200">This text will be custom, depending on list ownsership type.</p>

                <TableLayout className="mt-5 mr-5">
                    <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                        <p className="w-[5%]">Sr. No.</p>
                        <p className="w-[20%]">Product Name</p>
                        <p className="w-[35%]">Product Image</p>
                        <p className="w-[15%]">Product Type</p>
                        <p className="w-[10%]">Price</p>
                        <p className="w-[15%]">Product ID</p>
                    </div>
                    <div className="flex flex-col border-1 border-green-800">
                        <ProductViewListTableRow id={1} productName="Nafis" product_id="12" productImage="/gp.png" price={100} productType="Hardware"/>
                        <ProductViewListTableRow id={1} productName="Nafis" product_id="12" productImage="/gp.png" price={100} productType="Hardware"/>
                        <ProductViewListTableRow id={1} productName="Nafis" product_id="12" productImage="/gp.png" price={100} productType="Hardware"/>
                    </div>
                </TableLayout>
            </div>
        </div>
    )
}

