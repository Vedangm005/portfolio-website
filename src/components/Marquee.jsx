function Marquee() {

    const words = [
        "BUILD", "INNOVATE", "DESIGN", "CODE",
        "CREATE", "EXPLORE", "ENGINEER", "AUTOMATE",
        "PROTOTYPE", "SOLVE", "SHIP", "ITERATE"
    ]

    const content = words.join(" — ") + " — "

    return (
        <div className="bg-black py-5 md:py-6 overflow-hidden border-y border-white/10">
            <div className="flex animate-marquee whitespace-nowrap">
                <span className="text-white/50 text-xs md:text-sm tracking-[0.3em] font-light mx-4">
                    {content}
                </span>
                <span className="text-white/50 text-xs md:text-sm tracking-[0.3em] font-light mx-4">
                    {content}
                </span>
                <span className="text-white/50 text-xs md:text-sm tracking-[0.3em] font-light mx-4">
                    {content}
                </span>
                <span className="text-white/50 text-xs md:text-sm tracking-[0.3em] font-light mx-4">
                    {content}
                </span>
            </div>
        </div>
    )
}

export default Marquee
