import Image from "next/image";
import Link from "next/link"
import { FaArrowTrendUp, FaLocationDot } from "react-icons/fa6"

interface Prop {
    property_image: string;
    property_location: string;
    price_range: string;
    property_id: string;
}

function AdvertisementCard({ property_image, property_location, price_range, property_id }: Prop) {
    return (
        <div className="bg-[#0066ff] bg-opacity-10 p-4 shadow-lg shadow-teal-200 rounded-lg space-y-4 flex flex-col justify-between gap-4">
            <figure>
                <Image src={property_image}
                    alt=""
                    width={400} height={400}
                    className="rounded-xl border" />
            </figure>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center text-xl">
                        <FaLocationDot className="text-gray-600" />
                        <h2>{property_location}</h2>
                    </div>
                    <p className="font-semibold">${price_range}</p>
                </div>
                <div className="my-auto">
                    <Link href={`/property-details/${property_id}`}>
                        <button className="px-8 py-4 rounded-lg bg-gradient-to-br from-teal-500 to-[#0060f0] text-white w-full flex gap-2 items-center justify-center">
                            View <FaArrowTrendUp />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AdvertisementCard