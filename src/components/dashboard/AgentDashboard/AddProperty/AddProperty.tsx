"use client"

import useAxiosSecure from "@/hooks/useAxiosSecure";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";

interface UserType {
    _id: string;
    email: string;
    userName: string;
    role: string;
    is_fraud: string;
}

export default function AddProperty() {
    const session = useSession()
    const user = session.data?.user
    const axiosSecure = useAxiosSecure();
    const [addPropertyLoading, setAddPropertyLoading] = useState(false);

    const [formData, setFormData] = useState({
        property_title: "",
        property_location: "",
        agent_name: "",
        agent_email: "",
        price_range_from: "",
        price_range_to: "",
    })

    const handlePropertyChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const handleAddProperty = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAddPropertyLoading(true);

        const fraudData = await axiosSecure.get("/fraud-users");
        const fraudEmails = fraudData.data.map((data: UserType) => data.email);
        if (fraudEmails.includes(user?.email)) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "You can't upload any property"
            });
            setAddPropertyLoading(false);
            return;
        }

        const property_title = formData.property_title
        const property_location = formData.property_location
        const agent_name = formData.agent_name
        const agent_email = formData.agent_email
        const price_range_from = formData.price_range_from
        const price_range_to = formData.price_range_to
        const price_range = `${price_range_from}-${price_range_to}`;

        const target = e.target as typeof e.target & {
            property_image: { files: FileList };
        };
        const image = target.property_image.files[0];
        const imgData = new FormData();
        imgData.set('key', 'c2fde89598db76e7697f8f2bf3f338ec')
        imgData.append("image", image)
        const res = await axios.post("https://api.imgbb.com/1/upload", imgData)
        const property_image = res.data.data.image.url;

        const data = {
            property_title,
            property_location,
            agent_name,
            agent_email,
            agent_image: user?.image,
            price_range,
            property_image,
            verification_status: "pending",
        }
        axiosSecure.post("/properties", data)
            .then(res => {
                console.log(res.data)
                setAddPropertyLoading(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Property Uploaded",
                    showConfirmButton: false,
                    timer: 1500
                });
                setFormData({
                    property_title: "",
                    property_location: "",
                    agent_name: "",
                    agent_email: "",
                    price_range_from: "",
                    price_range_to: "",
                })
            })
    }

    return (
        <div className="p-8 rounded-xl w-full max-w-6xl mx-auto shadow-2xl bg-slate-100">
            <form onSubmit={handleAddProperty}
            className="space-y-4">
                <div className="w-full">
                    <label>
                        <span className="font-semibold">Property title</span>
                    </label>
                    <input placeholder="Property Title" required
                        onChange={handlePropertyChange}
                        value={formData.property_title}
                        className="border rounded-lg p-3 w-full" />

                </div>
                <div className="w-full">
                    <label>
                        <span className="font-semibold">Property Location</span>
                    </label>
                    <input placeholder="Property Location" required
                        onChange={handlePropertyChange}
                        value={formData.property_location}
                        className="border rounded-lg p-3 w-full" />
                </div>
                <div>
                    <h4 className="font-bold text-">Price Range:</h4>
                    <div className="md:flex gap-6">
                        <div className="w-full">
                            <label>
                                <span className="font-semibold"> from</span>
                            </label>
                            <input type="number" placeholder="Min price" required
                                onChange={handlePropertyChange}
                                value={formData.price_range_from}
                                className="border rounded-lg p-3 w-full" />
                        </div>
                        <div className="w-full">
                            <label>
                                <span className="font-semibold">To</span>
                            </label>
                            <input type="number" placeholder="Max Price" required
                                onChange={handlePropertyChange}
                                value={formData.price_range_to}
                                className="border rounded-lg p-3 w-full" />
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <label>
                        <span className="font-semibold">Property image</span>
                    </label>
                    <input type="file" required
                        className="w-full file:p-3 file:border-none file:bg-gray-700 file:text-white fle:font-semibold file:mr-2 border rounded-lg" />
                </div>
                <div className="md:flex gap-6">
                    <div className="w-full">
                        <label>
                            <span className="font-semibold">Agent name</span>
                        </label>
                        <input defaultValue={user?.name || ""} disabled
                            className="border rounded-lg p-3 w-full" required />
                    </div>
                    <div className="w-full">
                        <label>
                            <span className="font-semibold">Agent email</span>
                        </label>
                        <input defaultValue={user?.email || ""} disabled
                            className="border rounded-lg p-3 w-full" required />
                    </div>
                </div>
                <input type="submit" disabled={addPropertyLoading} value="Add Property"
                    className="px-6 py-3 rounded-lg w-full cursor-pointer bg-gradient-to-br from-teal-500 to-[#0060f0] text-white" />
            </form>
        </div>
    )
}
