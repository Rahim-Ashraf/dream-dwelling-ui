import Link from "next/link"
import PrimaryButton from "../shared/PrimaryButton/PrimaryButton"
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";

interface Prop {
    _id: string;
    property_image: string;
    property_location: string;
    price_range: string;
    property_title: string;
    verification_status: string;
    agent_name: string;
    agent_image: string;
}

function PropertyCard({ _id, property_image, property_title, property_location, verification_status, price_range, agent_name, agent_image }: Prop) {
    return (
        <div key={_id}
            className="rounded-2xl overflow-hidden shadow-lg shadow-teal-200 flex flex-col justify-between">
            <figure>
                <Image
                    src={property_image}
                    width={600} height={400}
                    alt="" />
            </figure>
            <div className="p-4">
                <div>
                    <h2 className="font-bold text-2xl mb-4">{property_title}</h2>
                    <div className="flex justify-between">
                        <div className="flex gap-2 items-center text-lg font-bold">
                            <FaLocationDot />
                            <p>{property_location}</p>
                        </div>
                        <p className="font-bold">Status: <span className="text-emerald-600">{verification_status}</span></p>
                    </div>
                    <p className="font-bold ml-1"><span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]">${price_range}</span></p>
                    <div className="divider"></div>
                    <div className="flex justify-between">
                        <p className="font-bold">Agent: {agent_name}</p>
                        <div className="max-w-12">
                            <Image
                                src={agent_image?agent_image:'https://res.cloudinary.com/dlad6rlwd/image/upload/v1759759633/esvae1i13dnbwozrmnax.png'}
                                width={50}
                                height={50}
                                alt=""
                                className="rounded-[50%]" />
                        </div>
                    </div>
                </div>
                <div className="pt-4">
                    <Link href={`/property-details/${_id}`}>
                        <PrimaryButton btnText={"Details"}></PrimaryButton>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PropertyCard