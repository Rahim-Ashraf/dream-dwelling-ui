import Advertisements from "./Advertisements/Advertisements";
import PropertiesByArea from "./PropertiesByArea/PropertiesByArea";
import NewsLetter from "./NewsLetter/NewsLetter";
import ServicesContent from "./Services/ServicesContent";
import HeroContent from "./HeroContent/HeroContent";

export default function Home() {

    return (
        <div>
            <div className="bg-[url('/assets/hero-bg.jpg')] hero-clip min-h-screen relative bg-cover flex items-center justify-center">
                <div className="absolute w-full h-full top-0 bg-gradient-to-t from-[#0060f0fa] via-[#002864ca] to-[#1670808a]"></div>
                <HeroContent />
            </div>
            <div className="py-16 px-8 max-w-[1920px] mx-auto">
                <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0] py-8">Featured Listings</h2>
                <Advertisements></Advertisements>
            </div>
            {/* Sevices section */}
            <div className="bg-cover bg-fixed primary-clip" style={{ backgroundImage: 'url(https://i.ibb.co.com/7XHkx2P/funiture1.jpg)' }}>
                <div className="pt-16 pb-32 bg-gradient-to-t from-[#0044aa] via-[#0044aa90] to-[#1c3d3a80]">
                    <div className="max-w-[1920px] mx-auto p-8">
                        <h2 className="text-5xl font-bold text-white pb-8">Real Estate services</h2>
                        <ServicesContent />
                    </div>
                </div>
            </div>
            <PropertiesByArea></PropertiesByArea>
            <NewsLetter></NewsLetter>
        </div>
    )
}
