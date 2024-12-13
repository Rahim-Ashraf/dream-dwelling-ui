"use client"

import useAxiosSecure from "@/hooks/useAxiosSecure"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

interface WishlistType {

    _id: string;
    property_id: string;
    wishlist_email: string;
    property_image: string;
    property_title: string;
    property_location: string;
    agent_name: string;
    agent_image: string;
    verification_status: string;
    price_range: string;
}

export default function Wishlist() {
    const session = useSession()
    const user = session.data?.user
    const axiosSecure = useAxiosSecure()

    const [wishlists, setWishlists] = useState<WishlistType[]>([])
    useEffect(() => {
        axiosSecure.get(`/wishlists?email=${user?.email}`)
            .then(res => setWishlists(res.data))
    }, [user, axiosSecure])

    const handleRemoveWishlist = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Remove this Wishlist!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/remove-wishlist?id=${id}`)
                    .then(async (res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Removed!",
                                text: "Wishlist has been removed.",
                                icon: "success"
                            });
                            const wishlistRefacth = await axiosSecure.get(`/wishlists?email=${user?.email}`)
                            setWishlists(wishlistRefacth.data)
                        }
                    })
                    .catch(err => console.log(err))
            }
        });
    }


    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {wishlists.map(wishlist => <div key={wishlist._id}
                className="rounded-xl overflow-hidden shadow-lg shadow-teal-200">
                <figure>
                    <img src={wishlist.property_image} alt="" />
                </figure>
                <div className="w-full p-4">
                    <h2 className="text-2xl font-bold mb-4">{wishlist.property_title}</h2>
                    <div className="flex justify-between items-center font-bold">
                        <div>
                            <p className="text-gray-600">Price Range</p>
                            <p>${wishlist.price_range}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Location</p>
                            <p>{wishlist.property_location}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Status</p>
                            <p className="text-emerald-600">{wishlist.verification_status}</p>
                        </div>
                    </div>
                    <hr className="my-8" />
                    <div className="flex justify-between items-center">
                        <p className="font-bold">Agent: {wishlist.agent_name}</p>
                        <div className="max-w-10">
                            <img className="rounded-[50%]" src={wishlist.agent_image} alt="agent" />
                        </div>
                    </div>
                    <hr className="my-8" />
                    <div className="space-y-4">
                        <Link href={`/dashboard/make-offer/${wishlist.property_id}`}>
                            <button className="px-6 py-3 rounded-lg bg-gradient-to-br from-teal-500 to-[#0060f0] text-white w-full">Make an offer</button>
                        </Link>
                        <button onClick={() => handleRemoveWishlist(wishlist._id)} 
                        className="px-6 py-3 rounded-lg bg-red-600 text-white w-full">Remove</button>
                    </div>
                </div>
            </div>)}
        </div>
    )
}
