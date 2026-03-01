function Marquee() {

    const words = [
        "ROBOTICS", "WEB DEV", "ESP32", "REACT",
        "THREE.JS", "EMBEDDED", "PYTHON", "OPENCV",
        "NODE.JS", "MONGODB", "DESIGN", "HARDWARE"
    ]

    const content = words.join(" — ") + " — "

    return (
        <div className="bg-black py-4 md:py-5 overflow-hidden border-y border-white/5">
            <div className="flex animate-marquee whitespace-nowrap">
                <span className="text-white/15 text-xs md:text-sm tracking-[0.3em] font-light mx-4">
                    {content}
                </span>
                <span className="text-white/15 text-xs md:text-sm tracking-[0.3em] font-light mx-4">
                    {content}
                </span>
                <span className="text-white/15 text-xs md:text-sm tracking-[0.3em] font-light mx-4">
                    {content}
                </span>
                <span className="text-white/15 text-xs md:text-sm tracking-[0.3em] font-light mx-4">
                    {content}
                </span>
            </div>
        </div>
    )
}

export default Marquee
