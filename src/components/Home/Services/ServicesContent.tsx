"use client"

import { motion } from "framer-motion";
import { PiBuilding } from "react-icons/pi";
import { BiBuildings } from "react-icons/bi";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";

function ServicesContent() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5 }}
            >
                <div className="p-8 shadow-lg shadow-teal-200 bg-blue-50 rounded-md space-y-4">
                    <PiBuilding className="text-[#E2837A] text-5xl" />
                    <h2 className="card-title">Buy A Property</h2>
                    <p>get your own luxurious home or apertment by buying properties.</p>
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
    )
}

export default ServicesContent