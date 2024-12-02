"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import Advertisements from "./Advertisements/Advertisements";
import { PiBuilding } from "react-icons/pi";
import { BiBuildings } from "react-icons/bi";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import PropertiesByArea from "./PropertiesByArea/PropertiesByArea";
import NewsLetter from "./NewsLetter/NewsLetter";

export default function Home() {

    return (
        <div>
            <div className="bg-[url('/assets/hero-bg.jpg')] hero-clip min-h-screen relative bg-cover flex items-center justify-center">
                <div className="absolute w-full h-full top-0 bg-gradient-to-t from-[#0060f0fa] via-[#002864ca] to-[#1670808a]"></div>

                <div className="relative text-center text-gray-100 max-w-xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 2 }}
                    >
                        <h1 className="mb-8 text-5xl font-bold">Hello there</h1>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 2 }}
                    >
                        <p className="mb-12">At Dream Dwelling, we help you find more than just a house—we help you discover the perfect home. With a curated selection of top-tier properties and personalized services, your dream home is just a click away. Begin your journey today and experience the difference with Dream Dwelling</p>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-fit mx-auto"
                    >
                        <Link href="/all-properties"
                            className="px-8 py-4 rounded bg-gradient-to-br from-teal-500 to-[#0060f0] text-white">Get Started</Link>
                    </motion.div>
                </div>
            </div>
            <div className="py-16 px-4 max-w-[1920px] mx-auto">
                <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0] py-8">Featured Listings</h2>
                <Advertisements></Advertisements>
            </div>
            {/* Sevices section */}
            <div className="bg-cover bg-fixed primary-clip" style={{ backgroundImage: 'url(https://i.ibb.co.com/7XHkx2P/funiture1.jpg)' }}>
                <div className="pt-16 pb-32 bg-gradient-to-t from-[#0044aa] via-[#0044aa90] to-[#1c3d3a80]">
                    <div className="max-w-[1920px] mx-auto">
                        <h2 className="text-5xl font-bold text-white p-8">Real Estate services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 p-4">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="p-8 shadow-lg shadow-teal-200 bg-blue-50 rounded-md space-y-4">
                                    <PiBuilding className="text-[#E2837A] text-5xl" />
                                    <h2 className="card-title">Buy A Property</h2>
                                    <p>get your own luxurious home by buying properties</p>
                                </div>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="p-8 shadow-lg shadow-teal-200 bg-blue-50 rounded-md space-y-4">
                                    <BiBuildings className="text-[#E2837A] text-5xl" />
                                    <h2 className="card-title">Sell A Property</h2>
                                    <p>Unlock the door to a seamless and rewarding property selling.</p>
                                </div>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="p-8 shadow-lg shadow-teal-200 bg-blue-50 rounded-md space-y-4">
                                    <HiOutlineBuildingLibrary className="text-[#E2837A] text-5xl" />
                                    <h2 className="card-title">Rent A Property</h2>
                                    <p>Discover the perfect rental property that suits your new lifestyle.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            <PropertiesByArea></PropertiesByArea>
            <NewsLetter></NewsLetter>
        </div>
    )
}
