"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import AdvertisementCard from "./AdvertisementCard";

interface Property {
    _id: string;
    property_id: string;
    property_image: string;
    property_location: string;
    price_range: string;
    verification_status: string;
    agent_email: string;
}
interface FraudUsers {
    _id: string;
    email: string;
    userName: string;
    role: string;
    is_fraud: string;
}

export default function Advertisements() {
    // const axiosPublic = useAxiosPublic();
    const [advertisements, setAdvertisements] = useState<Property[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("https://dream-dwellings-server.vercel.app/advertisements");
            const userRes = await axios.get("https://dream-dwellings-server.vercel.app/fraud-users");
            const advertiseData = res.data;
            const userData = userRes.data;
            const fraudEmails = userData.map((user: FraudUsers) => user.email)
            const filterdProperties = advertiseData.filter((property: Property) => !fraudEmails.includes(property.agent_email));

            setAdvertisements(filterdProperties)
        }
        fetchData()
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {/* advertisement cards */}
            {advertisements.map(advertisement => <AdvertisementCard key={advertisement._id}
                property_id={advertisement.property_id}
                property_image={advertisement.property_image}
                property_location={advertisement.property_location}
                price_range={advertisement.price_range} />
            )}
        </div>
    )
}
