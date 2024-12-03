"use client"

import useAxiosSecure from "@/hooks/useAxiosSecure"
import { Box, Modal } from "@mui/material"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

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

const reviewModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#80808080',
    boxShadow: 24,
    p: 4,
};

export default function PropertyDetails({ id }: { id: string }) {
    const axiosSecure = useAxiosSecure()
    const session = useSession();
    const user = session.data?.user
    const [propertyDetails, setPropertyDetails] = useState<PropertyType>()
    const [reviews, setReviews] = useState<ReviewType[]>([])

    const [reviewOpen, setReviewOpen] = useState(false);
    const handleReviewOpen = () => setReviewOpen(true);
    const handleReviewClose = () => setReviewOpen(false);

    useEffect(() => {
        const fechPropertyDetails = async () => {
            const res = await axiosSecure.get(`/property-details?id=${id}`)
            setPropertyDetails(res.data)
        }
        const fechReviews = async () => {
            const res = await axiosSecure.get(`/reviews?propertyId=${id}`)
            setReviews(res.data)
        }
        fechPropertyDetails()
        fechReviews()
    }, [id, axiosSecure])


    const handleAddToWishlist = async (propertyDetails?: PropertyType) => {
        const data = {
            property_id: propertyDetails?._id,
            wishlist_email: user?.email,
            property_image: propertyDetails?.property_image,
            property_title: propertyDetails?.property_title,
            property_location: propertyDetails?.property_location,
            agent_name: propertyDetails?.agent_name,
            agent_image: propertyDetails?.agent_image,
            verification_status: propertyDetails?.verification_status,
            price_range: propertyDetails?.price_range,
        }
        const res = await axiosSecure.post("/add-to-wishlist", data)
        if (res.data.acknowledged) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Added to Wishlist",
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const [reviewData, setReviewData] = useState({ review_description: "" })
    const handleReviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setReviewData((prev) => ({ ...prev, [name]: value }))
    }

    const handleAddReview = async (e: React.FormEvent) => {
        e.preventDefault()
        const newDate = new Date();
        const date = `At ${newDate.getHours()}:${newDate.getMinutes()} | ${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`
        const data = {
            property_id: propertyDetails?._id,
            property_title: propertyDetails?.property_title,
            agent_name: propertyDetails?.agent_name,
            review_description: reviewData.review_description,
            reviewer_name: user?.name,
            reviewer_email: user?.email,
            reviewer_image: user?.image,
            date,
        }
        const postReview = await axiosSecure.post("/reviews", data)
        if (postReview.data.acknowledged) {
            setReviewOpen(false)
            setReviewData({ review_description: "" })
        }
        const reviewRes = await axiosSecure.get(`/reviews?propertyId=${id}`)
        setReviews(reviewRes.data)
    }


    return (<>
        <div className="lg:flex p-2 md:p-4">
            <div className="w-full">
                <img src={propertyDetails?.property_image} alt=""
                    className="rounded-lg" />
            </div>
            <div className="card px-6 py-2 w-full">
                <h2 className="text-4xl font-bold mb-4">{propertyDetails?.property_title}</h2>
                <div className="flex justify-between items-center font-bold">
                    <div>
                        <p className="text-gray-600">Price Range</p>
                        <p>${propertyDetails?.price_range}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Location</p>
                        <p>{propertyDetails?.property_location}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Status</p>
                        <p className="text-emerald-600">{propertyDetails?.verification_status}</p>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="flex justify-between">
                    <p className="font-bold">Agent: {propertyDetails?.agent_name}</p>
                    <div className="max-w-20">
                        <img src={propertyDetails?.agent_image} alt=""
                            className="rounded-[50%]" />
                    </div>
                </div>
                <hr className="my-8" />
                <div className="flex justify-between gap-16">
                    <button onClick={() => handleAddToWishlist(propertyDetails)} className="px-4 py-2 rounded-lg w-full bg-[#E2537A] text-white">Add to wishlist</button>
                    <button onClick={handleReviewOpen}
                        className="px-4 py-2 rounded-lg w-full bg-[#0055ff] text-white">Add a review</button>
                </div>
                <Modal
                    open={reviewOpen}
                    onClose={handleReviewClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={reviewModalStyle}
                        className="w-full md:w-1/2 xl:w-1/3">
                        <form onSubmit={handleAddReview}
                            className="w-full">
                            <textarea name="review_description" placeholder="Review" required rows={5}
                                onChange={handleReviewTextChange}
                                value={reviewData.review_description}
                                className="w-full rounded p-4 my-8 border"></textarea>
                            <br />
                            <div className="flex justify-between gap-4">
                                <input type="submit" value="Add Review"
                                    className="cursor-pointer px-4 py-2 rounded w-full bg-[#E2537A] text-white" />
                                <button onClick={handleReviewClose}
                                    className="px-4 py-2 rounded-lg bg-[#bdbdbd]">Cancel</button>
                            </div>
                        </form>
                    </Box>
                </Modal>
            </div>
        </div>
        <div className="divider"></div>

        {/* Reviews */}
        <div>
            <h2 className="text-4xl text-center text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0] font-bold mb-6">Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map(review => <div key={review._id} className="p-4 rounded-lg shadow-lg shadow-teal-200 bg-[#0066ff] bg-opacity-5">
                    <div className='flex gap-2'>
                        <div className="">
                            <img src={review.reviewer_image}
                                alt={review.reviewer_name}
                                className='rounded-full max-w-14' />
                        </div>
                        <div>
                            <h2 className="card-title">{review.reviewer_name}</h2>
                            <p>{review.review_description}</p>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    </>
    )
}
