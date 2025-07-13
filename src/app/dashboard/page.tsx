import Link from "next/link"
import { HorizontalDivider } from "@/components/UIUtilities"

export default function DashboardPage() {
    return (
        <div className="flex flex-col p-2 space-y-2 justify-center w-full font-sans">
            <h2 className="ml-6">Dashboard</h2>
            <p className="ml-6 text-green-200">Welcome back. Let's get things done.</p>

            <HorizontalDivider className="border-green-500"/>
        </div>
    )
}