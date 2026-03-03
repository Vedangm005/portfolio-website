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
    const [hidden, setHidden] = useState(false)
    const [lastScroll, setLastScroll] = useState(0)
    const [isOnLight, setIsOnLight] = useState(false)

    // Show/hide capsule on scroll direction
    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY
            setScrolled(current > 80)

            if (current > 300) {
                setHidden(current > lastScroll && current - lastScroll > 5)
            } else {
                setHidden(false)
            }
            setLastScroll(current)
        }
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastScroll])

    // Active section tracking
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

    // Detect light-background sections
    useEffect(() => {
        const lightIds = ["contact"]
        const lightSections = lightIds.map(id => document.getElementById(id)).filter(Boolean)
        if (!lightSections.length) return

        const observer = new IntersectionObserver(
            (entries) => {
                // Check if any light section is intersecting the top of the viewport (where navbar sits)
                const anyLight = entries.some(e => e.isIntersecting)
                setIsOnLight(anyLight)
            },
            { rootMargin: "-0px 0px -85% 0px", threshold: 0 }
        )
        lightSections.forEach(s => observer.observe(s))
        return () => lightSections.forEach(s => observer.unobserve(s))
    }, [])

    // Close mobile menu on scroll (with threshold to avoid spurious mobile taps)
    useEffect(() => {
        let scrollStart = window.scrollY
        const onOpen = () => { scrollStart = window.scrollY }
        const close = () => {
            if (Math.abs(window.scrollY - scrollStart) > 10) setMenuOpen(false)
        }
        window.addEventListener("scroll", close)
        return () => window.removeEventListener("scroll", close)
    }, [])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [menuOpen])

    const handleNavClick = (e, id) => {
        e.preventDefault()
        setMenuOpen(false)
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <>
            {/* ── Top bar — visible before scroll ── */}
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100 translate-y-0"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 md:py-6 flex justify-between items-center">

                    {/* Logo */}
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                        className="group flex items-center gap-2.5"
                    >
                        <span className={`font-display text-sm font-semibold tracking-wide transition-colors duration-300 ${isOnLight ? "text-black/80 group-hover:text-black" : "text-white/90 group-hover:text-white"
                            }`}>
                            VM
                        </span>
                        <span className={`w-4 h-[1px] group-hover:w-6 transition-all duration-300 ${isOnLight ? "bg-black/20 group-hover:bg-black/40" : "bg-white/20 group-hover:bg-white/40"
                            }`}></span>
                        <span className={`text-[11px] tracking-widest uppercase transition-colors duration-300 ${isOnLight ? "text-black/40 group-hover:text-black/60" : "text-white/40 group-hover:text-white/60"
                            }`}>
                            Portfolio
                        </span>
                    </a>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(link => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={(e) => handleNavClick(e, link.id)}
                                className={`nav-link-hover text-[13px] transition-colors duration-300 tracking-wide ${isOnLight ? "text-black/40 hover:text-black/90" : "text-white/40 hover:text-white/90"
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className={`w-[1px] h-4 ${isOnLight ? "bg-black/10" : "bg-white/10"}`}></div>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-[13px] transition-colors duration-300 tracking-wide flex items-center gap-1.5 nav-link-hover ${isOnLight ? "text-black/40 hover:text-black/90" : "text-white/40 hover:text-white/90"
                                }`}
                        >
                            Résumé
                            <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                        </a>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden relative w-7 h-5 flex flex-col justify-center items-center"
                        aria-label="Menu"
                    >
                        <span className={`absolute w-5 h-[1.5px] transition-all duration-300 ease-out ${isOnLight ? "bg-black/80" : "bg-white/80"} ${menuOpen ? "rotate-45" : "-translate-y-[4px]"}`} />
                        <span className={`absolute w-5 h-[1.5px] transition-all duration-300 ease-out ${isOnLight ? "bg-black/80" : "bg-white/80"} ${menuOpen ? "-rotate-45" : "translate-y-[4px]"}`} />
                    </button>

                </div>
            </nav>

            {/* ── Floating capsule — appears on scroll ── */}
            <nav
                className={`fixed z-50 left-1/2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled && !hidden
                    ? "top-5 -translate-x-1/2 opacity-100 translate-y-0 scale-100"
                    : scrolled && hidden
                        ? "top-5 -translate-x-1/2 opacity-0 -translate-y-3 scale-95 pointer-events-none"
                        : "top-5 -translate-x-1/2 opacity-0 -translate-y-4 scale-95 pointer-events-none"
                    }`}
            >
                <div className={`backdrop-blur-xl border rounded-full px-2 py-1.5 flex items-center gap-0.5 transition-all duration-500 ${isOnLight
                    ? "bg-black/[0.05] border-black/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                    : "bg-white/[0.08] border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                    }`}>

                    {/* Monogram */}
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                        className={`px-3 py-2 text-xs font-display font-semibold tracking-wide transition-colors duration-300 ${isOnLight ? "text-black/70 hover:text-black" : "text-white/70 hover:text-white"
                            }`}
                    >
                        VM
                    </a>

                    <div className={`w-[1px] h-3.5 mx-0.5 ${isOnLight ? "bg-black/10" : "bg-white/10"}`}></div>

                    {navLinks.map(link => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={(e) => handleNavClick(e, link.id)}
                            className={`relative px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${activeSection === link.id
                                ? isOnLight ? "bg-black text-white" : "bg-white text-black"
                                : isOnLight ? "text-black/50 hover:text-black hover:bg-black/[0.06]" : "text-white/50 hover:text-white hover:bg-white/[0.06]"
                                }`}
                        >
                            {link.name}
                        </a>
                    ))}

                    <div className={`w-[1px] h-3.5 mx-0.5 ${isOnLight ? "bg-black/10" : "bg-white/10"}`}></div>

                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-3 py-2 transition-colors duration-300 ${isOnLight ? "text-black/50 hover:text-black" : "text-white/50 hover:text-white"
                            }`}
                        title="Résumé"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </a>
                </div>
            </nav>

            {/* ── Mobile fullscreen menu ── */}
            <div
                className={`fixed inset-0 z-[60] transition-all duration-500 ease-out ${menuOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                    }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                    onClick={() => setMenuOpen(false)}
                />

                {/* Close button — large tap target for mobile */}
                <button
                    onClick={(e) => { e.stopPropagation(); setMenuOpen(false) }}
                    className="absolute top-3 right-4 z-20 w-12 h-12 flex items-center justify-center"
                    aria-label="Close menu"
                >
                    <span className="absolute w-5 h-[1.5px] bg-white/80 rotate-45" />
                    <span className="absolute w-5 h-[1.5px] bg-white/80 -rotate-45" />
                </button>

                {/* Menu content */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center gap-1">
                    {navLinks.map((link, i) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={(e) => handleNavClick(e, link.id)}
                            className={`font-display text-4xl font-bold text-white/80 hover:text-white py-3 transition-all duration-500 ease-out hover:tracking-wider ${menuOpen
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-6"
                                }`}
                            style={{ transitionDelay: menuOpen ? `${150 + i * 80}ms` : "0ms" }}
                        >
                            {link.name}
                        </a>
                    ))}

                    <div className={`mt-6 w-8 h-[1px] bg-white/10 transition-all duration-500 ${menuOpen ? "opacity-100" : "opacity-0"}`}
                        style={{ transitionDelay: menuOpen ? "450ms" : "0ms" }}
                    />

                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-4 text-sm text-white/40 hover:text-white tracking-widest uppercase flex items-center gap-2 transition-all duration-500 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                        style={{ transitionDelay: menuOpen ? "500ms" : "0ms" }}
                    >
                        Résumé
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Navbar