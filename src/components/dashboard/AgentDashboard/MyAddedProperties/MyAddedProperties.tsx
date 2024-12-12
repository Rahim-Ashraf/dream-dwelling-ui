"use client"

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Swal from "sweetalert2";

interface PropertyType {
    _id: string;
    agent_email: string;
    agent_image: string;
    agent_name: string;
    price_range: string;
    property_image: string;
    property_location: string;
    property_title: string;
    verification_status: string;
}

export default function MyAddedProperties() {
    const session = useSession()
    const user = session.data?.user
    const axiosSecure = useAxiosSecure();
    const [myAddedProperties, setMyAddedProperties] = useState<PropertyType[]>([])
    useEffect(() => {
        axiosSecure.get(`/my-added-properties?email=${user?.email}`)
            .then(res => {
                setMyAddedProperties(res.data)
            })
    }, [axiosSecure, user])

    const handlepropertyDelete = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/properties?id=${id}`)
                    .then(async (res) => {
                        if (res.data.deletedCount > 0) {
                            
                            const refetchAddedProperties = await axiosSecure.get(`/my-added-properties?email=${user?.email}`)
                            setMyAddedProperties(refetchAddedProperties.data)

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your property has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });

    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* advertisement cards */}
                {/* {myAddedProperties.map(property => <div key={property._id} className="card card-compact bg-base-100 shadow-lg shadow-teal-200">
                    <figure><img src={property.property_image} alt="" /></figure>
                    <div className="flex justify-between gap-4 p-4">
                        <div>
                            <h2 className="card-title">{property.property_title}</h2>
                            <p>{property.price_range}</p>
                            <p>Agent: {property.agent_name}</p>
                            <img src={property.agent_image} alt="" />
                            <p>{property.property_location}</p>
                            <p>Status: {property.verification_status}</p>
                        </div>
                        <div className="my-auto">
                            {property.verification_status !== "rejected" && <Link to={`/agent-dashboard/property-update/${property._id}`}><button className="btn bg-gradient-to-br from-teal-500 to-[#0060f0] text-white">Update</button></Link>}
                            <button onClick={() => handlepropertyDelete(property._id)} className="btn btn-error">Delete</button>
                        </div>
                    </div>
                </div>)} */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {myAddedProperties.map(property => <div key={property._id} className="card card-compact bg-base-100 shadow-lg shadow-teal-200">
                    <figure className="max-h-60">
                        <img src={property.property_image} alt="" />
                    </figure>
                    <div className="p-4">
                        <div>
                            <h2 className="font-bold text-2xl mb-4">{property.property_title}</h2>
                            <div className="flex justify-between">
                                <div className="flex gap-2 items-center text-lg font-bold">
                                    <FaLocationDot />
                                    <p>{property.property_location}</p>
                                </div>
                                <p className="font-bold">Status: <span className={property.verification_status === "verified" ? "text-emerald-600" : "text-amber-600"}>{property.verification_status}</span></p>
                            </div>
                            <p className="font-bold ml-1"><span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]">${property.price_range}</span></p>
                            <div className="divider"></div>
                            <div className="flex justify-between">
                                <p className="font-bold">Agent: {property.agent_name}</p>
                                <div className="max-w-20"><img className="rounded-[50%]" src={property.property_image} alt="" /></div>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="flex justify-between">
                            {property.verification_status !== "rejected" && <Link href={`/agent-dashboard/property-update/${property._id}`}><button className="btn bg-gradient-to-br from-teal-500 to-[#0060f0] text-white">Update</button></Link>}
                            <button onClick={() => handlepropertyDelete(property._id)} className="btn bg-red-600 text-white">Delete</button>
                        </div>
                    </div>
                </div>)}
            </div>
        </>
    )
}