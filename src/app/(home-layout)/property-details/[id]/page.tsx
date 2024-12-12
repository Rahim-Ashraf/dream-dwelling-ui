import PropertyDetails from "@/components/PropertyDetails/PropertyDetails"
import axios from "axios";

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

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id

    return (
        <PropertyDetails id={id} />
    )
}

export async function generateStaticParams() {
    const { data: allProperties } = await axios.get("https://dream-dwellings-server.vercel.app/verified-properties");
    const { data: fraudUsers } = await axios.get("https://dream-dwellings-server.vercel.app/fraud-users");

    const fraudEmails = fraudUsers.map((user: FraudUsers) => user.email)
    const filterdProperties = allProperties.filter((property: Property) => !fraudEmails.includes(property.agent_email));
    return filterdProperties.map((property: Property) => (
        {
            id: property._id,
        }
    ))
}
