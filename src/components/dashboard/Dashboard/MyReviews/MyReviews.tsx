"use client"

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface ReviewType {
    _id: string;
    agent_name: string;
    date: string;
    property_id: string;
    property_title: string;
    review_description: string;
    reviewer_email: string;
    reviewer_image: string;
    reviewer_name: string;
}

export default function MyReviews() {
    const session = useSession()
    const user = session.data?.user
    const axiosSecure = useAxiosSecure()

    const [myReviews, setMyReviews] = useState<ReviewType[]>([])
    useEffect(() => {
        axiosSecure.get(`/my-reviews?email=${user?.email}`)
            .then(res => setMyReviews(res.data))
    }, [user, axiosSecure])


    const handleReviewDelete = (id: string) => {
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
                axiosSecure.delete(`/my-reviews?id=${id}`)
                    .then(async (res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const myReviewsRefech = await axiosSecure.get(`/my-reviews?email=${user?.email}`)
                            setMyReviews(myReviewsRefech.data)
                        }
                    })

            }
        });

    }

    return (
        <div className="space-y-4">
            {myReviews.map(review => <div key={review._id}
                className="p-4 rounded-lg  bg-emerald-600 bg-opacity-10 shadow-lg shadow-teal-200 mx-4 space-y-4">
                <div>
                    <div className="flex gap-4 items-center">
                        <h2 className="text-xl font-bold">{review.property_title}</h2>
                        <p>{review.date}</p>
                    </div>
                    <p className="font-bold">Agent: {review.agent_name}</p>
                    <p>{review.review_description}</p>
                </div>
                <button onClick={() => handleReviewDelete(review._id)}
                    className="px-6 py-3 rounded-lg bg-red-600 text-white">Delete</button>
            </div>)}
        </div>
    )
}
