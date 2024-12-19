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

export default async function Advertisements() {
    const advertiseData = await fetch("https://dream-dwellings-server.vercel.app/advertisements")
    const advertises = await advertiseData.json()
    const fraudUsersData = await fetch("https://dream-dwellings-server.vercel.app/fraud-users")
    const fraudUsers = await fraudUsersData.json()
    const fraudEmails = await fraudUsers.map((user: FraudUsers) => user.email)
    const advertisements = await advertises.filter((property: Property) => !fraudEmails.includes(property.agent_email))

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {/* advertisement cards */}
            {advertisements.map((advertisement: Property) => <AdvertisementCard key={advertisement._id}
                property_id={advertisement.property_id}
                property_image={advertisement.property_image}
                property_location={advertisement.property_location}
                price_range={advertisement.price_range} />
            )}
        </div>
    )
}
