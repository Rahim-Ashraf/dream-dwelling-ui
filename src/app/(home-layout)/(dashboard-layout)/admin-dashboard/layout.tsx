import AdminNav from "@/components/dashboard/AdminDashboard/AdminNav/AdminNav";

export default function layout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="grid md:grid-cols-4 gap-2 max-w-screen-xl mx-auto">
            <div className="col-span-4 md:col-span-1">
                <AdminNav></AdminNav>
            </div>
            <div className="col-span-4 md:col-span-3">
                {children}
            </div>
        </div>
    )
}
