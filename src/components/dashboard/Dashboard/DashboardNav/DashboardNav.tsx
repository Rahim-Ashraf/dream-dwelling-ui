"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
    const pathname = usePathname()

    return (
        <div className="rounded-lg flex flex-col p-4">
            <Link href="/dashboard/my-profile"
                className={`${pathname === '/dashboard/my-profile' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`
                }>My Profile</Link>
            <Link href="/dashboard/wishlist"
                className={`${pathname === '/dashboard/wishlist' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`
                }>Wishlist</Link>
            <Link href="/dashboard/property-bought"
                className={`${pathname === '/dashboard/property-bought' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`
                }>Property bought</Link>
            <Link href="/dashboard/my-reviews"
                className={`${pathname === '/dashboard/my-reviews' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`
                }>My reviews</Link>
        </div>
    )
}
