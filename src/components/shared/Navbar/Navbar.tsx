"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";

interface User {
    _id: string;
    email: string;
    userName: string;
    role: string;
    password: string;
    is_fraud: string;
}

export default function Navbar() {
    const session = useSession();
    console.log(session)
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
    const [dbUser, setDbUser] = useState<User>();

    // useEffect(() => {
    //     axios.get(`https://dream-dwellings-server.vercel.app/user?email=${'agent@gmail.com'}`)
    //         .then(res => console.log(res.data))
    // }, [])


    // const { user, logOut } = useAuth();
    // const { data: dbUser } = useQuery({
    //     queryKey: ["user"],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get(`/user?email=${user.email}`);
    //         return res.data;
    //     }
    // })

    const menu = <>
        <Link href="/" className={`${pathname === '/' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`
        }>Home</Link>
        <Link href="/all-properties" className={`${pathname === '/all-properties' ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`
        }>All properties</Link>
        {session.status === "authenticated" && <>
            <Link href={dbUser?.role === "admin" ? "/admin-dashboard/my-profile" : dbUser?.role === "agent" ? "/agent-dashboard/my-profile" : "/dashboard/my-profile"}
                className={`${pathname === `/${dbUser?.role}-dashboard/my-profile` ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]" : "text-gray-800"} font-bold`
                }>Dashboard</Link>
        </>}
    </>
    return (
        <div className="px-4 relative py-4 flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <div className="relative p-4 xl:hidden">
                    {/* Toggle Button */}
                    <button
                        className="absolute top-0 right-2 z-20 text-2xl"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <AiOutlineClose className="text-[#FD7E72]" /> : <AiOutlineMenu className="text-gray-600" />}
                    </button>

                    {/* Navbar */}
                    <motion.div
                        className="fixed top-0 left-0 w-full h-full bg-[#FED4D0] text-[#4F0D25] z-10 px-4 py-8 overflow-scroll"
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
                {session.status === "authenticated" ? <details className="dropdown dropdown-end">
                    <summary tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image
                                src="/boy.png"  //need to update url
                                alt="Tailwind CSS Navbar component"
                                width={40}
                                height={40}
                            />
                        </div>
                    </summary >
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><button onClick={() => signOut()} className="bg-gradient-to-br from-rose-400 to-red-500 text-white font-semibold px-8 py-4 rounded">Logout</button></li>
                    </ul>
                </details>
                    : <Link href="/signin"
                        className="bg-gradient-to-br from-teal-500 to-[#0060f0] text-white font-semibold px-8 py-4 rounded"
                    >Login</Link>}
            </div>
        </div>
    );
};