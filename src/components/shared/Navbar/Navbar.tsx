"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";
import Menu from '@mui/material/Menu';



export default function Navbar() {
    const session = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // Variants for navbar animation
    const navbarVariants = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeInOut",
            },
        },
        closed: {
            y: "-100%",
            opacity: 0,
            transition: {
                duration: 1,
                ease: "easeInOut",
            },
        },
    };

    const pathname = usePathname()

    const handleSignout = () => {
        localStorage.removeItem("access-token")
        signOut()
    }

    const menu = <>
        <Link href="/" className={`${pathname === '/' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`
        }>Home</Link>
        <Link href="/all-properties" className={`${pathname === '/all-properties' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`
        }>All properties</Link>
        {session.status === "authenticated" && <>
            <Link href={session?.data.user.role === "admin" ? "/admin-dashboard/my-profile"
                :
                session?.data.user.role === "agent" ? "/agent-dashboard/my-profile"
                    :
                    "/dashboard/my-profile"}
                className={`${pathname.includes('/dashboard') || pathname.includes('/agent-dashboard') || pathname.includes('/admin-dashboard') ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]"
                    :
                    "text-gray-800"} font-bold`
                }>Dashboard</Link>
        </>}
    </>



    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="relative flex justify-between items-center px-8 py-4">
            <div className="flex gap-4 items-center">
                <div className="relative p-4 xl:hidden">
                    {/* Toggle Button */}
                    <button
                        className="absolute top-0 right-2 z-20 text-2xl"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <AiOutlineClose className="text-teal-500" />
                            : <AiOutlineMenu className="text-gray-600" />}
                    </button>

                    {/* Navbar */}
                    <motion.div
                        className="fixed top-0 left-0 w-full h-full bg-gray-200 text-[#4F0D25] z-10 px-4 py-8 overflow-scroll"
                        initial="closed"
                        animate={isMenuOpen ? "open" : "closed"}
                        variants={navbarVariants}
                    >
                        <div className={`${isMenuOpen ? 'opacity-100 delay-700' : 'opacity-0'} mt-20 text-xl flex flex-col gap-8 transition-opacity duration-300`}>
                            <Link href="/"
                                onClick={() => setIsMenuOpen(false)}
                                className={`${pathname === '/' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`}
                            >Home</Link>
                            <Link href="/all-properties"
                                onClick={() => setIsMenuOpen(false)}
                                className={`${pathname === '/all-properties' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`}
                            >All properties</Link>
                        </div>
                    </motion.div>
                </div>
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="btn btn-ghost text-xl text-gray-800 font-extrabold">Dream <span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]">Dwellings</span></Link>
            </div>
            <div className="hidden xl:block">
                <div className="flex gap-8 text-xl">
                    {menu}
                </div>
            </div>
            <div>

                {session.status === "authenticated" ? <div>
                    <button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <div className="w-10 rounded-full overflow-hidden">
                            <img
                                src={session.data.user?.image || "/boy.png"}  //need to update url
                                alt="user"
                            />
                        </div>
                    </button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <div className="px-4 py-2 shadow">
                            <button onClick={handleSignout}
                                className="bg-gradient-to-br from-rose-400 to-red-500 text-white font-semibold px-8 py-4 rounded">Logout</button>
                        </div>
                    </Menu>
                </div>
                    :
                    <Link href="/signin"
                        className="bg-gradient-to-br from-teal-500 to-[#0060f0] text-white font-semibold px-8 py-4 rounded"
                    >Login</Link>}
            </div>
        </div>
    );
};