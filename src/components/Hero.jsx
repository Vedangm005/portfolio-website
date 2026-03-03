import { useEffect, useState, useRef } from "react"
import ThreeBackground from "./ThreeBackground"

const roles = [
    "Electronics & Computer Science Student",
    "Building Robotics & Web Systems",
    "Exploring Embedded + Full-Stack",
    "Learning Through Projects",
]

function Hero() {
    const [offset, setOffset] = useState(0)
    const [roleIndex, setRoleIndex] = useState(0)
    const [displayText, setDisplayText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [showContent, setShowContent] = useState(false)
    const typeSpeed = useRef(null)

    // Parallax scroll
    useEffect(() => {
        const handleScroll = () => setOffset(window.scrollY)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Staggered entrance
    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 300)
        return () => clearTimeout(timer)
    }, [])

    // Typewriter effect
    useEffect(() => {
        const current = roles[roleIndex]

        if (!isDeleting && displayText === current) {
            typeSpeed.current = setTimeout(() => setIsDeleting(true), 2000)
            return () => clearTimeout(typeSpeed.current)
        }

        if (isDeleting && displayText === "") {
            setIsDeleting(false)
            setRoleIndex((prev) => (prev + 1) % roles.length)
            return
        }

        typeSpeed.current = setTimeout(
            () => {
                setDisplayText(
                    isDeleting
                        ? current.substring(0, displayText.length - 1)
                        : current.substring(0, displayText.length + 1)
                )
            },
            isDeleting ? 40 : 80
        )

        return () => clearTimeout(typeSpeed.current)
    }, [displayText, isDeleting, roleIndex])

    const scrollToProjects = () => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
    }

    const scrollToContact = () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <section className="relative min-h-screen bg-black flex items-center overflow-hidden">

            {/* Background Parallax */}
            <div
                className="absolute inset-0"
                style={{ transform: `translateY(${offset * 0.2}px)` }}
            >
                <ThreeBackground />
            </div>

            {/* Gradient overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />

            {/* Main content */}
            <div
                className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 lg:px-20"
                style={{ transform: `translateY(${offset * -0.25}px)` }}
            >
                <div className={`transition-all duration-1000 ease-out ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

                    {/* Availability badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] mb-7 md:mb-9">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-emerald-400/80 text-[11px] md:text-xs tracking-wide font-medium">
                            Open to opportunities
                        </span>
                    </div>

                    {/* Name */}
                    <h1 className="font-sans font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white leading-[1]">
                        Vedang
                        <br />
                        Mishra
                    </h1>

                    {/* Typewriter role */}
                    <div className="mt-6 md:mt-8 flex items-center gap-3">
                        <span className="hidden sm:inline-block w-10 md:w-14 h-[1px] bg-white/20"></span>
                        <p className="text-white/60 text-sm sm:text-base md:text-lg font-body tracking-wide">
                            <span>{displayText}</span>
                            <span className="inline-block w-[2px] h-4 md:h-5 bg-white/60 ml-0.5 animate-blink align-middle"></span>
                        </p>
                    </div>

                    {/* Tagline */}
                    <p className={`mt-5 md:mt-6 text-white/35 text-sm md:text-[15px] max-w-lg leading-[1.7] font-body transition-all duration-1000 delay-300 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        I build things that blend code and hardware — from full-stack
                        web apps to autonomous robots. Currently a student at KIIT University.
                    </p>

                    {/* CTAs */}
                    <div className={`mt-8 md:mt-10 flex flex-wrap items-center gap-4 transition-all duration-1000 delay-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        <button
                            onClick={scrollToProjects}
                            className="group relative px-6 py-3 md:px-8 md:py-3.5 bg-white text-black text-sm md:text-base font-medium rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                View My Work
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </button>

                        <button
                            onClick={scrollToContact}
                            className="px-6 py-3 md:px-8 md:py-3.5 border border-white/20 text-white/70 text-sm md:text-base font-medium rounded-full transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/5 hover:scale-105 active:scale-95"
                        >
                            Get in Touch
                        </button>
                    </div>

                </div>
            </div>

            {/* Side accent line - desktop only */}
            <div className="hidden lg:block absolute right-12 xl:right-20 top-1/2 -translate-y-1/2 z-10">
                <div className={`flex flex-col items-center gap-4 transition-all duration-1000 delay-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
                    <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                        className="text-white/30 hover:text-white/70 transition-colors duration-300">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                        className="text-white/30 hover:text-white/70 transition-colors duration-300">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>
                    <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10">
                <div className={`flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
                    <span className="text-white/30 text-[10px] md:text-xs tracking-[0.3em] uppercase">Scroll</span>
                    <div className="w-5 h-8 md:w-6 md:h-9 border border-white/20 rounded-full flex justify-center pt-1.5">
                        <div className="w-1 h-1.5 bg-white/50 rounded-full animate-scroll-dot"></div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Hero