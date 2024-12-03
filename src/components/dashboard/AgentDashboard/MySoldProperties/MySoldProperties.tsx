"use client"

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

interface OfferType {
    _id: string;
    property_id: string;
    property_title: string;
    property_image: string;
    property_location: string;
    agent_name: string;
    agent_email: string;
    offered_amount: string;
    buyer_email: string;
    buyer_name: string;
    buying_date: string;
    verification_status: string;
    transaction_id: string;
}

export default function MySoldProperties() {
    const session = useSession()
    const user = session.data?.user
    const axiosSecure = useAxiosSecure();
    const [mySoldProperties, setMySoldProperties] = useState<OfferType[]>([])
    useEffect(() => {
        axiosSecure.get(`/my-sold-properties?email=${user?.email}`)
            .then(res => {
                setMySoldProperties(res.data)
            })
    }, [axiosSecure, user])

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                {
                    mySoldProperties.map(property => <div key={property._id} className="card card-compact bg-base-100 shadow-lg shadow-teal-200">
                        <figure>
                            <img src={property.property_image} alt="" />
                        </figure>
                        <div className="p-4">
                            <h2 className="card-title">{property.property_title}</h2>
                            <div className="flex items-center gap-2">
                                <FaLocationDot />
                                <p className="font-semibold">{property.property_location}</p>
                            </div>
                            <p>Buyer Name: {property.buyer_name}</p>
                            <p>Buyer Email: {property.buyer_email}</p>
                            <p className="font-semibold">Sold Price: <span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]">${property.offered_amount}</span></p>
                        </div>
                    </div>)
                }
            </div>
            <div className="flex gap-4 justify-center my-4">
                <h2 className="text-center font-bold text-2xl">Total property sold amount:</h2>
                <h2 className="text-center font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]">${mySoldProperties.reduce((total, property) => {
                    return total + parseInt(property.offered_amount)
                }, 0)}</h2>
            </div>
        </div>
    )
}
