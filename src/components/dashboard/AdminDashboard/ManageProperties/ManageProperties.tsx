"use client"

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";

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

export default function ManageProperties() {
    const axiosSecure = useAxiosSecure();

    const [properties, setProperties] = useState<PropertyType[]>([])
    useEffect(() => {
        axiosSecure.get("/properties")
            .then(res => {
                setProperties(res.data)
            })
    }, [axiosSecure])

    const handleAccept = (property: PropertyType) => {
        axiosSecure.patch(`/property-details?id=${property._id}`, { verification_status: "verified" })
            .then(async () => {
                const refectchProperties = await axiosSecure.get("/properties");
                setProperties(refectchProperties.data)
            })
    }
    const handleReject = (property: PropertyType) => {
        axiosSecure.patch(`/property-details?id=${property._id}`, { verification_status: "rejected" })
            .then(async () => {
                const refectchProperties = await axiosSecure.get("/properties");
                setProperties(refectchProperties.data)
            })
    }

    return (
        <div className="overflow-x-auto">
            <table>
                <thead>
                    <tr className="border-b">
                        <th>ID</th>
                        <th>Property title</th>
                        <th>Property location</th>
                        <th>Agent name</th>
                        <th>Agent email</th>
                        <th>Price range</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        properties.map((property, idx) => <tr key={property._id}
                            className="border-b">
                            <td>{idx + 1}</td>
                            <td>{property.property_title}</td>
                            <td>{property.property_location}</td>
                            <td>{property.agent_name}</td>
                            <td>{property.agent_email}</td>
                            <td>${property.price_range}</td>
                            <td>
                                {property.verification_status === "pending" ? <>
                                    <button onClick={() => handleAccept(property)}
                                        className="btn btn-sm bg-gradient-to-br from-teal-500 to-[#0060f0] text-white"
                                    >Accept</button>
                                    <button onClick={() => handleReject(property)}
                                        className="btn btn-errorf btn-sm btn-error"
                                    >Reject</button>
                                </>
                                    :
                                    <h2 className={property.verification_status === "verified" ? "text-emerald-600 font-bold"
                                        :
                                        property.verification_status === "rejected" ? "text-red-600 font-bold"
                                            : ""}
                                    >{property.verification_status}</h2>}
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    )
}
