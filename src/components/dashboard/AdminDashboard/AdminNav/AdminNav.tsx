"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
    const pathname = usePathname()

    return (
        <div className="bg-gradient-to-br from-teal-500 to-[#0060f0] flex flex-col p-4">
            <Link href="/admin-dashboard/my-profile"
                className={`${pathname === '/dashboard/my-profile' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`
                }>Admin Profile</Link>
            <Link href="/admin-dashboard/manage-properties"
                className={`${pathname === '/dashboard/my-profile' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`
                }>Manage Properties</Link>
            <Link href="/admin-dashboard/manage-users"
                className={`${pathname === '/dashboard/my-profile' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`
                }>Manage Users</Link>
            <Link href="/admin-dashboard/manage-reviews"
                className={`${pathname === '/dashboard/my-profile' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`
                }>Manage reviews</Link>
            <Link href="/admin-dashboard/advertise-property"
                className={`${pathname === '/dashboard/my-profile' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`
                }>Advertise property</Link>
        </div>
    )
}
