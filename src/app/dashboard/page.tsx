import Link from "next/link"
import { HorizontalDivider } from "@/components/custom-elements/UIUtilities"

export default function DashboardPage() {
    return (
        <div className="flex flex-col p-2 space-y-2 justify-center w-full font-sans bg-gray-700">
            <h1 className="ml-6">Dashboard</h1>
            <p className="ml-6 text-green-200">Welcome back. Let's get things done.</p>

            <HorizontalDivider className="border-green-500 mb-0"/>
        </div>
    )
}