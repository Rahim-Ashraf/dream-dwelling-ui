"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
    const pathname = usePathname()

    return (
        <div className="bg-gradient-to-br from-teal-500 to-[#0060f0] flex flex-col p-4">
            <Link href="/admin-dashboard/my-profile"
                className={`${pathname === '/admin-dashboard/my-profile' ? "text-white" : "text-gray-800"} font-bold`
                }>Admin Profile</Link>
            <Link href="/admin-dashboard/manage-properties"
                className={`${pathname === '/admin-dashboard/manage-properties' ? "text-white" : "text-gray-800"} font-bold`
                }>Manage Properties</Link>
            <Link href="/admin-dashboard/manage-users"
                className={`${pathname === '/admin-dashboard/manage-users' ? "text-white" : "text-gray-800"} font-bold`
                }>Manage Users</Link>
            <Link href="/admin-dashboard/manage-reviews"
                className={`${pathname === '/admin-dashboard/manage-reviews' ? "text-white" : "text-gray-800"} font-bold`
                }>Manage reviews</Link>
            <Link href="/admin-dashboard/advertise-property"
                className={`${pathname === '/admin-dashboard/advertise-property' ? "text-white" : "text-gray-800"} font-bold`
                }>Advertise property</Link>
        </div>
    )
}
