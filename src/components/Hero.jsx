import { useEffect, useState } from "react"
import ThreeBackground from "./ThreeBackground"

function Hero() {

    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const handleScroll = () => setOffset(window.scrollY)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <section className="relative h-screen bg-black flex items-center justify-center overflow-hidden">

            {/* Background Parallax */}
            <div
                className="absolute inset-0"
                style={{ transform: `translateY(${offset * 0.2}px)` }}
            >
                <ThreeBackground />
            </div>

            {/* Text */}
            <div
                className="relative z-10 text-center px-6"
                style={{ transform: `translateY(${offset * -0.25}px)` }}
            >
                <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white animate-fade-in-up">
                    Vedang Mishra
                </h1>

                <p className="mt-4 md:mt-6 text-white/50 text-base sm:text-lg md:text-xl tracking-wide animate-fade-in-up delay-2">
                    Building things with code and hardware
                </p>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in delay-5">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-white/30 text-[10px] md:text-xs tracking-[0.3em] uppercase">Scroll</span>
                    <svg
                        className="w-3 h-3 md:w-4 md:h-4 text-white/30 animate-bounce-subtle"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
                    </svg>
                </div>
            </div>

        </section>
    )
}

export default Hero