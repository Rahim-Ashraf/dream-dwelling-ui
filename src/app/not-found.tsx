import Image from "next/image";
import Link from "next/link";


export default function NotFound() {
    return (
        <div className="flex flex-col md:flex-row-reverse gap-6 p-10 justify-center items-center max-w-[1920px] mx-auto">
            <div className="w-full md:w-1/2">
                <Image src="/assets/not-found.jpg"
                    width={600} height={400}
                    alt="" />
            </div>
            <div className="w-full md:w-1/2 text-center">
                <h1 className="text-5xl md:text-8xl font-bold text-[#0066ff]">ERROR</h1>
                <h3 className="my-4 text-2xl font-semibold">Page not found</h3>
                <Link href="/"
                    className="px-8 py-4 rounded btn bg-gradient-to-br from-teal-500 to-[#0060f0] text-white">
                    Go to Home</Link>
            </div>
        </div>
    )
}
