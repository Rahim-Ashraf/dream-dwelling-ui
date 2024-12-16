import Image from "next/image"
import { FaArrowTrendUp } from "react-icons/fa6"

function AreaCard({ image, id }: { image: string, id: number }) {
    return (
        <div className={`relative ${id === 1 ? "rounded-lg md:rounded-none md:rounded-l-lg overflow-hidden" : ""}${id === 4 ? "rounded-lg md:rounded-none md:rounded-r-lg overflow-hidden" : ""}`}>
            <div className="absolute w-full h-full bg-slate-800 bg-opacity-50"></div>
            <div>
                <Image src={image}
                    alt="" width={600} height={600} />
            </div>
            <div className="absolute bottom-[5%] left-[25%]">
                <div className="px-8 py-16 flex flex-col gap-4 items-center h-full justify-end">
                    <h3 className="text-3xl font-bold text-white">London</h3>
                    <button
                        className="px-2 py-1 rounded bg-gradient-to-br from-teal-500 to-[#0060f0] text-white flex gap-2 items-center justify-center"
                    >Properties< FaArrowTrendUp /></button>
                </div>
            </div>
        </div>
    )
}

export default AreaCard