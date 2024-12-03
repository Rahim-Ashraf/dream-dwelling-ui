import PropertyUpdate from "@/components/dashboard/AgentDashboard/PropertyUpdate/PropertyUpdate"

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id

    return (
        <PropertyUpdate id={id} />
    )
}
