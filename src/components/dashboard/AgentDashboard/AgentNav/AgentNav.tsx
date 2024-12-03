"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AgentNav() {
    const pathname = usePathname()

    return (
        <div className="bg-gradient-to-br from-teal-500 to-[#0060f0] flex flex-col p-4">
            <Link href="/agent-dashboard/my-profile"
                className={`${pathname === '/dashboard/my-profile' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`
                }>Agent Profile</Link>
            <Link href="/agent-dashboard/add-property"
                className={`${pathname === '/dashboard/my-profile' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`
                }>Add Property</Link>
            <Link href="/agent-dashboard/my-added-properties"
                className={`${pathname === '/dashboard/my-profile' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`
                }>My added properties</Link>
            <Link href="/agent-dashboard/my-sold-properties"
                className={`${pathname === '/dashboard/my-profile' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`
                }>My sold properties</Link>
            <Link href="/agent-dashboard/requested-properties"
                className={`${pathname === '/dashboard/my-profile' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`
                }>Requested properties</Link>
        </div>
    )
}
