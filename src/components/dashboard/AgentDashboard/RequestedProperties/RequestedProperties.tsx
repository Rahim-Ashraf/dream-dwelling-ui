"use client"

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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

export default function RequestedProperties() {
    const session = useSession()
    const user = session.data?.user
    const axiosSecure = useAxiosSecure();
    const [requestedProperties, setRequestedProperties] = useState<OfferType[]>([])
    useEffect(() => {
        axiosSecure.get(`/requested-properties?email=${user?.email}`)
            .then(res => {
                setRequestedProperties(res.data)
            })
    }, [axiosSecure, user])

    const handleAccept = (property: OfferType) => {
        axiosSecure.patch(`/reject-property?id=${property.property_id}`, { verification_status: "rejected" })
            .then(res => {
                console.log("reject", res.data)
                axiosSecure.patch(`/accept-property?id=${property._id}`, { verification_status: "accepted" })
                    .then(async (res) => {
                        console.log(res.data)

                        const refetchRequestedProperty = await axiosSecure.get(`/requested-properties?email=${user?.email}`)
                        setRequestedProperties(refetchRequestedProperty.data)
                    })
            });
    }
    const handleReject = async (id: string) => {
        axiosSecure.patch(`/accept-property?id=${id}`, { verification_status: "rejected" })
            .then(() => {
                // console.log(res.data)
            })

        const refetchRequestedProperty = await axiosSecure.get(`/requested-properties?email=${user?.email}`)
        setRequestedProperties(refetchRequestedProperty.data)
    }

    return (
        <div className="overflow-x-auto">
            <table>
                <thead>
                    <tr className="border-b">
                        <th>ID</th>
                        <th>Property title</th>
                        <th>Property location</th>
                        <th>Buyer email</th>
                        <th>Buyer name</th>
                        <th>Offered price</th>
                        <th>Accept</th>
                        <th>Reject</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        requestedProperties.map((property, idx) => <tr key={property._id}
                            className="border-b">
                            <td>{idx + 1}</td>
                            <td>{property.property_title}</td>
                            <td>{property.property_location}</td>
                            <td>{property.buyer_email}</td>
                            <td>{property.buyer_name}</td>
                            <td>{property.offered_amount}</td>

                            <td>{property.verification_status === "accepted" ?
                                <h2 className="text-emerald-600 font-bold">{property.verification_status}</h2>
                                :
                                property.verification_status === "pending" ? <button onClick={() => handleAccept(property)}
                                    className="btn btn-sm bg-gradient-to-br from-teal-500 to-[#0060f0] text-white">Accept</button>
                                    :
                                    property.verification_status === "bought" ? <h2
                                        className="text-emerald-600 font-bold">Sold</h2>
                                        :
                                        ""}</td>

                            <td>{property.verification_status === "rejected" ? <h2 className="text-red-600 font-bold">{property.verification_status}</h2>
                                :
                                property.verification_status === "pending" ? <button onClick={() => handleReject(property._id)} className="btn btn-errorf btn-sm">Reject</button>
                                    :
                                    ""}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}
