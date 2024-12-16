"use client"

import { motion } from "framer-motion";
import AreaCard from "./AreaCard";

export default function PropertiesByArea() {
    return (
        <div className="max-w-[1920px] w-full mx-auto py-16 px-4">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0] py-8">Properties by Area</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0">
                <motion.div
                    whileHover={{ opacity: 0.98, scale: 0.98 }}
                >
                    <AreaCard image={"/assets/properties-by-area/london.jpg"}
                        id={1} />
                </motion.div>
                <motion.div
                    whileHover={{ opacity: 0.98, scale: 0.98 }}
                >
                    <AreaCard image={"/assets/properties-by-area/las-vegas.jpg"}
                        id={2} />
                </motion.div>
                <motion.div
                    whileHover={{ opacity: 0.98, scale: 0.98 }}
                >
                    <AreaCard image={"/assets/properties-by-area/paris.jpg"}
                        id={3} />
                </motion.div>
                <motion.div
                    whileHover={{ opacity: 0.98, scale: 0.98 }}
                >
                    <AreaCard image={"/assets/properties-by-area/dubai.jpg"}
                        id={4} />
                </motion.div>
            </div>
        </div>
    )
}
