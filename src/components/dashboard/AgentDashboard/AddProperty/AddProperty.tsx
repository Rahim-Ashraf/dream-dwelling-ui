"use client"

import useAxiosSecure from "@/hooks/useAxiosSecure";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
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

    const handleAddProperty = async (e) => {
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

        const form = e.target;
        const property_title = form.property_title.value;
        const property_location = form.property_location.value;
        const agent_name = form.agent_name.value;
        const agent_email = form.agent_email.value;
        const price_range_from = form.price_range_from.value;
        const price_range_to = form.price_range_to.value;
        const price_range = `${price_range_from}-${price_range_to}`;
        const image = form.property_image.files[0];
        const formData = new FormData();
        formData.set('key', 'c2fde89598db76e7697f8f2bf3f338ec')
        formData.append("image", image)
        const res = await axios.post("https://api.imgbb.com/1/upload", formData)
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
                form.property_title.value = "";
                form.property_location.value = "";
                form.price_range_from.value = "";
                form.price_range_to.value = "";
                form.property_image.value = "";
            })
    }

    return (
        <div className="card shrink-0 w-full max-w-6xl mx-auto shadow-2xl bg-base-100">
            <form onSubmit={handleAddProperty} className="card-body" >
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Property title</span>
                    </label>
                    <input name="property_title" placeholder="Property Title" required
                        className="input input-bordered" />

                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Property Location</span>
                    </label>
                    <input name="property_location" placeholder="Property Location" required
                        className="input input-bordered h-16" />
                </div>
                <div>
                    <h4 className="font-bold text-">Price Range:</h4>
                    <div className="md:flex gap-6">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold"> from</span>
                            </label>
                            <input type="number" name="price_range_from" placeholder="Min price" required
                                className="input input-bordered" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">To</span>
                            </label>
                            <input type="number" name="price_range_to" placeholder="Max Price" required
                                className="input input-bordered" />
                        </div>
                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Property image</span>
                    </label>
                    <input type="file" name="property_image" required
                        className="file-input file-input-bordered h-16" />
                </div>
                <div className="md:flex gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Agent name</span>
                        </label>
                        <input name="agent_name" defaultValue={user?.name || ""} disabled
                            className="input input-bordered" required />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Agent email</span>
                        </label>
                        <input name="agent_email" defaultValue={user?.email || ""} disabled
                            className="input input-bordered" required />
                    </div>
                </div>
                <input className="btn bg-gradient-to-br from-teal-500 to-[#0060f0] text-white" type="submit" disabled={addPropertyLoading} value="Add Property" />
            </form>
        </div>
    )
}
