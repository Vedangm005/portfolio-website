import { useEffect, useState } from "react"

function Loader() {

    const [phase, setPhase] = useState("loading")
    const name = "Vedang Mishra"

    useEffect(() => {
        const t1 = setTimeout(() => setPhase("reveal"), 200)
        const t2 = setTimeout(() => setPhase("ready"), 1800)
        const t3 = setTimeout(() => setPhase("exit"), 2200)
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }, [])

    return (
        <div
            className={`fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center transition-all duration-700 ${phase === "exit" ? "opacity-0 pointer-events-none" : ""
                }`}
        >
            {/* Letter animation */}
            <div className="flex overflow-hidden">
                {name.split("").map((char, i) => (
                    <span
                        key={i}
                        className="text-white font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight inline-block"
                        style={{
                            transform: phase === "loading" ? "translateY(100%)" : "translateY(0)",
                            opacity: phase === "loading" ? 0 : 1,
                            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
                            transitionDelay: `${i * 40}ms`,
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </div>

            {/* Expanding line */}
            <div
                className="mt-6 h-px bg-white/30 transition-all duration-1000 ease-out"
                style={{ width: phase === "loading" ? "0px" : "80px" }}
            />

            {/* Progress counter */}
            <div
                className="mt-8 text-white/20 text-xs tracking-[0.4em] uppercase transition-all duration-500"
                style={{
                    opacity: phase === "ready" || phase === "exit" ? 0 : phase === "loading" ? 0 : 1,
                }}
            >
                Loading
            </div>
        </div>
    )
}

export default Loader