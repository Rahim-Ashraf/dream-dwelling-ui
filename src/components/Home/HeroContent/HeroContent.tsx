"use client"

import { motion } from "framer-motion";
import Link from "next/link";

function HeroContent() {
    return (
        <div className="relative text-center text-gray-100 max-w-xl mx-auto">
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 2 }}
            >
                <h1 className="mb-8 text-5xl font-bold">Hello there</h1>
                <p className="mb-12">At Dream Dwelling, we help you find more than just a house—we help you discover the perfect home. With a curated selection of top-tier properties and personalized services, your dream home is just a click away. Begin your journey today and experience the difference with Dream Dwelling</p>
            </motion.div>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 2 }}
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-fit mx-auto"
                >
                    <Link href="/all-properties"
                        className="px-8 py-4 rounded bg-gradient-to-br from-teal-500 to-[#0060f0] text-white">Get Started</Link>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default HeroContent