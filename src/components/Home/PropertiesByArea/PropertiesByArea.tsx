"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function PropertiesByArea() {
    return (
        <div className="max-w-[1920px] w-full mx-auto py-16 px-4">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0] py-8">Properties by Area</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0">
                <motion.div
                    whileHover={{ opacity: 0.98, scale: 0.98 }}
                >
                    <div className="relative rounded-lg md:rounded-none md:rounded-l-lg overflow-hidden">
                        <div className="absolute w-full h-full bg-slate-800 bg-opacity-50"></div>
                        <div>
                            <Image src="/assets/properties-by-area/london.jpg"
                                alt="" width={600} height={600} />
                        </div>
                        <div className="absolute bottom-[5%] left-[25%]">
                            <div className="px-8 py-16 flex flex-col gap-4 items-center h-full justify-end">
                                <h3 className="text-3xl font-bold text-white">London</h3>
                                <button className="px-2 py-1 rounded bg-gradient-to-br from-teal-500 to-[#0060f0] text-white flex gap-2 items-center justify-center">Properties< FaArrowTrendUp /></button>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    whileHover={{ opacity: 0.98, scale: 0.98 }}
                >
                    <div className="relative">
                        <div className="absolute w-full h-full bg-slate-800 bg-opacity-50"></div>
                        <div>
                            <Image src="/assets/properties-by-area/las-vegas.jpg"
                                alt="" width={600} height={600} />
                        </div>
                        <div className="absolute bottom-[5%] left-[25%]">
                            <div className="px-8 py-16 flex flex-col gap-4 items-center h-full justify-end">
                                <h3 className="text-3xl font-bold text-white">Las Vegas</h3>
                                <button className="px-2 py-1 rounded bg-gradient-to-br from-teal-500 to-[#0060f0] text-white flex gap-2 items-center justify-center">Properties< FaArrowTrendUp /></button>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    whileHover={{ opacity: 0.98, scale: 0.98 }}
                >
                    <div className="relative">
                        <div className="absolute w-full h-full bg-slate-800 bg-opacity-50"></div>
                        <div>
                            <Image src="/assets/properties-by-area/paris.jpg"
                                alt="" width={600} height={600} />
                        </div>
                        <div className="absolute bottom-[5%] left-[25%]">
                            <div className="px-8 py-16 flex flex-col gap-4 items-center h-full justify-end">
                                <h3 className="text-3xl font-bold text-white">Paris</h3>
                                <button className="px-2 py-1 rounded bg-gradient-to-br from-teal-500 to-[#0060f0] text-white flex gap-2 items-center justify-center">Properties< FaArrowTrendUp /></button>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    whileHover={{ opacity: 0.98, scale: 0.98 }}
                >
                    <div className="relative rounded-lg md:rounded-none md:rounded-r-lg overflow-hidden">
                        <div className="absolute w-full h-full bg-slate-800 bg-opacity-50"></div>
                        <div>
                            <Image src="/assets/properties-by-area/dubai.jpg"
                                alt="" width={600} height={600} />
                        </div>
                        <div className="absolute bottom-[5%] left-[25%]">
                            <div className="px-8 py-16 flex flex-col gap-4 items-center h-full justify-end">
                                <h3 className="text-3xl font-bold text-white">Dubai</h3>
                                <button className="px-2 py-1 rounded bg-gradient-to-br from-teal-500 to-[#0060f0] text-white flex gap-2 items-center justify-center">Properties< FaArrowTrendUp /></button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
