"use client"

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowTrendUp, FaLocationDot } from "react-icons/fa6";
import PrimaryButton from "../../shared/PrimaryButton/PrimaryButton";

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
            {advertisements.map(advertisement => <div key={advertisement._id}
                className="bg-[#0066ff] bg-opacity-10 p-4 shadow-lg shadow-teal-200 rounded-lg space-y-4 flex flex-col justify-between gap-4">
                <figure>
                    <Image src={advertisement.property_image}
                        alt="" width={600} height={600}
                        className="rounded-xl border" />
                </figure>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center text-xl">
                            <FaLocationDot className="text-gray-600" />
                            <h2>{advertisement.property_location}</h2>
                        </div>
                        <p className="font-semibold">${advertisement.price_range}</p>
                    </div>
                    <div className="my-auto">
                        <Link href={`/details/${advertisement.property_id}`}>
                            <PrimaryButton btnText={"View"} BtnIcon={FaArrowTrendUp}></PrimaryButton>
                        </Link>
                    </div>
                </div>
            </div>)}
        </div>
    )
}
