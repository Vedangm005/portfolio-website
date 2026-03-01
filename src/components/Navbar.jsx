import { useEffect, useState } from "react"

const navLinks = [
    { name: "Work", id: "work" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" }
]

function Navbar() {

    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState("")
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean)
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id)
                })
            },
            { threshold: 0.3 }
        )
        sections.forEach(s => observer.observe(s))
        return () => sections.forEach(s => observer.unobserve(s))
    }, [])

    useEffect(() => {
        const close = () => setMenuOpen(false)
        window.addEventListener("scroll", close)
        return () => window.removeEventListener("scroll", close)
    }, [])

    return (
        <>
            {/* Floating capsule navbar — appears on scroll */}
            <nav
                className={`fixed z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled
                        ? "top-5 left-1/2 -translate-x-1/2 opacity-100 translate-y-0"
                        : "top-5 left-1/2 -translate-x-1/2 opacity-0 -translate-y-4 pointer-events-none"
                    }`}
            >
                <div className="bg-white/80 backdrop-blur-xl border border-black/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.08)] rounded-full px-3 py-2 flex items-center gap-1">
                    {navLinks.map(link => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${activeSection === link.id
                                    ? "bg-black text-white"
                                    : "text-black/50 hover:text-black hover:bg-black/5"
                                }`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </nav>

            {/* Top bar — visible before scroll */}
            <div
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 md:py-6 flex justify-between items-center">

                    <a
                        href="#"
                        className="font-display text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors duration-300"
                    >
                        Vedang Mishra
                    </a>

                    {/* Desktop links */}
                    <div className="hidden md:flex gap-8">
                        {navLinks.map(link => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                className="text-sm text-white/40 hover:text-white transition-colors duration-300 link-hover"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden flex flex-col gap-1.5 text-white"
                        aria-label="Menu"
                    >
                        <span className={`w-5 h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
                        <span className={`w-5 h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
                    </button>

                </div>

                {/* Mobile dropdown */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${menuOpen ? "max-h-52 opacity-100" : "max-h-0 opacity-0"
                        } bg-black/90 backdrop-blur-xl`}
                >
                    <div className="px-6 py-5 flex flex-col gap-4">
                        {navLinks.map(link => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={() => setMenuOpen(false)}
                                className="text-base font-display font-medium text-white/70 hover:text-white transition-colors duration-300"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar