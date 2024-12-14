"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AgentNav() {
    const pathname = usePathname()

    return (
        <div className="bg-gradient-to-br from-teal-500 to-[#0060f0] flex flex-col p-4">
            <Link href="/agent-dashboard/my-profile"
                className={`${pathname === '/agent-dashboard/my-profile' ? "text-white" : "text-gray-800"} font-bold`
                }>Agent Profile</Link>
            <Link href="/agent-dashboard/add-property"
                className={`${pathname === '/agent-dashboard/add-property' ? "text-white" : "text-gray-800"} font-bold`
                }>Add Property</Link>
            <Link href="/agent-dashboard/my-added-properties"
                className={`${pathname === '/agent-dashboard/my-added-properties' ? "text-white" : "text-gray-800"} font-bold`
                }>My added properties</Link>
            <Link href="/agent-dashboard/my-sold-properties"
                className={`${pathname === '/agent-dashboard/my-sold-properties' ? "text-white" : "text-gray-800"} font-bold`
                }>My sold properties</Link>
            <Link href="/agent-dashboard/requested-properties"
                className={`${pathname === '/agent-dashboard/requested-properties' ? "text-white" : "text-gray-800"} font-bold`
                }>Requested properties</Link>
        </div>
    )
}
