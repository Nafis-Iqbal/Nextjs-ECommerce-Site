import Link from "next/link"

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-red-500">
            <div className="flex">
                <button className="p-2 m-1 bg-gray-700 hover:bg-gray-600">Search</button>
                <Link href='/search' className="p-2 m-1 bg-gray-700 hover:bg-gray-600">Product Detail</Link>
            </div>
        </div>
    )
}