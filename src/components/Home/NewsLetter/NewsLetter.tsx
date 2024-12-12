"use client"

import PrimaryButton from "@/components/shared/PrimaryButton/PrimaryButton";
import { motion } from "framer-motion";
import { AiOutlinePlayCircle } from "react-icons/ai";

export default function NewsLetter() {
    return (
        <div className="my-10 flex flex-col md:flex-row justify-between md:items-end max-w-screen-xl mx-auto p-4">
            <div className="w-full">
                <motion.div
                    initial={{ x: -100 }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: 2 }}
                >
                    <div className="p-8 rounded-lg space-y-8">
                        <h2 className="text-5xl font-semibold">Subscribe us</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="">
                                    <span className="font-bold">Your Name</span>
                                </label>
                                <input type="email" placeholder="Your Name" required
                                    className="p-3 rounded-lg border w-full" />
                            </div>
                            <div>
                                <label className="">
                                    <span className="font-bold">Your Email</span>
                                </label>
                                <input type="email" placeholder="Your Email" required
                                    className="p-3 rounded-lg border w-full" />
                            </div>
                        </div>
                        <div className=" mt-6">
                            <PrimaryButton btnText={"Subscribe"}></PrimaryButton>
                        </div>
                    </div>
                </motion.div>
            </div>
            <div className="w-full">
                <motion.div
                    initial={{ x: 100 }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: 2 }}
                >
                    <div className="p-8 flex flex-col justify-center space-y-8">
                        <h6>COMPLETE SERVICES</h6>
                        <h2 className="text-5xl font-semibold">Find your new home with us.</h2>
                        <p>
                            Traveling the world, we select a carefully curated collection of beautiful and practical products for your interior. Our idea is to combine functionality and beauty in minimalist objects.
                        </p>
                        <div className="flex gap-2 items-center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <button className="px-8 py-4 rounded-lg bg-gradient-to-br from-teal-500 to-[#0060f0] text-white">More about us</button>
                            </motion.div>
                            <AiOutlinePlayCircle className="text-5xl text-cyan-600" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
