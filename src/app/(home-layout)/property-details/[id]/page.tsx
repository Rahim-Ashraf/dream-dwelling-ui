import PropertyDetails from "@/components/PropertyDetails/PropertyDetails"


export default async function page({ params, }: { params: Promise<{ id: string }> }) {
    const id = (await params).id

    return (
        <PropertyDetails id={id} />
    )
}
