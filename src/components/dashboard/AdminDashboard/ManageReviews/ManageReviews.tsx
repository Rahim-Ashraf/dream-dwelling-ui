"use client"

import useAxiosSecure from "@/hooks/useAxiosSecure";
import Image from "next/image";
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

export default function ManageReviews() {
    const axiosSecure = useAxiosSecure();
    const [reviews, setReviews] = useState<ReviewType[]>([])
    useEffect(() => {
        axiosSecure.get("/all-reviews")
            .then(res => {
                setReviews(res.data)
            })
    }, [axiosSecure])

    const handleDeleteReview = (id: string) => {
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
                axiosSecure.delete(`/delete-reviews?id=${id}`)
                    .then(async (res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Review deleted",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            const refectchReviews = await axiosSecure.get("/properties");
                            setReviews(refectchReviews.data)
                        }
                    })

            }
        });

    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {reviews.map(review => <div key={review._id}
                className="shadow-lg shadow-teal-200 p-4 rounded-lg flex flex-col justify-between space-y-4">
                <div className='grid grid-cols-4 gap-2'>
                    <div className="w-full col-span-1">
                        <Image src={review.reviewer_image} alt={review.reviewer_name}
                            width={100} height={100}
                            className='rounded-full' />
                    </div>
                    <div className="col-span-3 space-y-2">
                        <h2 className="font-semibold">Reviewer name: {review.reviewer_name}</h2>
                        <h2 className="font-semibold">Reviewer email: {review.reviewer_email}</h2>
                        <p>{review.review_description}</p>
                    </div>
                </div>
                <div>
                    <button onClick={() => handleDeleteReview(review._id)}
                        className="px-4 py-2 w-full rounded bg-rose-400">Delete Review</button>
                </div>
            </div>
            )}
        </div>
    )
}
