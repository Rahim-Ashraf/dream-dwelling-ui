import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";


export default function layout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    )
}
