"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import PrimaryButton from "../shared/PrimaryButton/PrimaryButton";
import Image from "next/image";

interface Property {
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
interface FraudUsers {
    _id: string;
    email: string;
    userName: string;
    role: string;
    is_fraud: string;
}

export default function AllProperties() {
    const [allProperties, setAllProperties] = useState<Property[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);
    const [searchText, setSearchText] = useState({ search: "" });

    useEffect(() => {
        axios.get("https://dream-dwellings-server.vercel.app/verified-properties")
            .then(res => {
                axios.get("https://dream-dwellings-server.vercel.app/fraud-users")
                    .then(userRes => {
                        const propertyData: Property[] = res.data;
                        const userData = userRes.data;
                        const fraudEmails = userData.map((user: FraudUsers) => user.email)
                        const filterdProperties = propertyData.filter(property => !fraudEmails.includes(property.agent_email));
                        setProperties(filterdProperties)
                        setAllProperties(filterdProperties);
                    })
            });
    }, []);

    const handlePriceChange = (e: React.FormEvent<HTMLSelectElement>) => {
        if (e.currentTarget.value === "All") {
            setProperties(allProperties);
            return
        }
        const filteredProperties = allProperties.filter(property => {
            const filterdLowPrice = parseInt(e.currentTarget.value.split('-')[0]);
            const filterdHighPrice = parseInt(e.currentTarget.value.split('-')[1]);
            const dbLowPrice = parseInt(property.price_range.split('-')[0]);
            const dbHighPrice = parseInt(property.price_range.split('-')[1]);
            if (dbLowPrice >= filterdLowPrice && dbHighPrice <= filterdHighPrice) {
                return property
            }
        })
        setProperties(filteredProperties);
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchText((prev) => ({ ...prev, [name]: value }));
    };
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        axios.get(`https://dream-dwellings-server.vercel.app/verified-properties-search?text=${searchText.search}`)
            .then(res => {
                setProperties(res.data)
                setSearchText({ search: '' });
            });
    }


    return (
        <div className="max-w-[1920px] mx-auto p-8">
            <div className="md:flex justify-center items-center gap-10">
                <div className="">
                    <h2 className="text-xl font-bold">Search by Location</h2>
                    <form onSubmit={handleSearch}>
                        <label className="flex items-center gap-2">
                            <input type="text" name="search" placeholder="Search"
                                value={searchText.search}
                                onChange={handleSearchChange}
                                className="grow" />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                            </svg>
                        </label>
                    </form>
                </div>
                <div className=" flex justify-center">
                    <div>
                        <label className="label">
                            <h3 className="font-bold">filter by Price Range</h3>
                        </label>
                        <select onChange={handlePriceChange} name="category" className="w-fit">
                            <option value="All">All</option>
                            <option value="0-1000">0-1000</option>
                            <option value="1001-10000">1001-10000</option>
                            <option value="10001-100000">10001-100000</option>
                            <option value="100001-1000000">100001-1000000</option>
                            <option value="1000001-10000000">1000001-10000000</option>
                        </select>
                    </div>
                </div>
            </div>
            <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0] my-6">All properties </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {properties.map(property => <div key={property._id}
                    className="rounded-2xl overflow-hidden shadow-lg shadow-teal-200 flex flex-col justify-between">
                    <figure>
                        <Image
                            src={property.property_image}
                            alt="" width={600} height={600} />
                    </figure>
                    <div className="p-4">
                        <div>
                            <h2 className="font-bold text-2xl mb-4">{property.property_title}</h2>
                            <div className="flex justify-between">
                                <div className="flex gap-2 items-center text-lg font-bold">
                                    <FaLocationDot />
                                    <p>{property.property_location}</p>
                                </div>
                                <p className="font-bold">Status: <span className="text-emerald-600">{property.verification_status}</span></p>
                            </div>
                            <p className="font-bold ml-1"><span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]">${property.price_range}</span></p>
                            <div className="divider"></div>
                            <div className="flex justify-between">
                                <p className="font-bold">Agent: {property.agent_name}</p>
                                <div className="max-w-12">
                                    <Image
                                        src={property.agent_image}
                                        alt="" width={50} height={50}
                                        className="rounded-[50%]" />
                                </div>
                            </div>
                        </div>
                        <div className="pt-4">
                            <Link href={`/details/${property._id}`}>
                                <PrimaryButton btnText={"Details"}></PrimaryButton>
                            </Link>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    )
}
