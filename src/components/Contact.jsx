import { useState } from "react"

const contacts = [
    {
        label: "Email",
        display: "2430246@kiit.ac.in",
        href: "mailto:2430246@kiit.ac.in",
        desc: "Drop me a message anytime",
    },
    {
        label: "GitHub",
        display: "Vedangm005",
        href: "https://github.com/Vedangm005",
        desc: "See what I'm building",
    },
]

function Contact() {
    const [hovered, setHovered] = useState(null)

    return (
        <section
            id="contact"
            className="fade-section bg-white text-black py-24 md:py-36 px-6 border-t border-black/8"
        >
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-0">
                    <div>
                        <p className="text-xs tracking-[0.2em] uppercase text-black/35 mb-4 font-medium">
                            Get in touch
                        </p>
                        <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-none">
                            Let's<br />Connect
                        </h2>
                    </div>

                    <p className="text-base text-black/45 max-w-xs leading-relaxed md:text-right">
                        Have a project in mind or just want to say hello?
                        I'm always open to new ideas and collaborations.
                    </p>
                </div>

                {/* Contact Cards */}
                <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-px bg-black/8 border border-black/8">
                    {contacts.map(({ label, display, href, desc }, i) => (
                        <a
                            key={i}
                            href={href}
                            {...(href.startsWith("http") && { target: "_blank" })}
                            rel="noopener noreferrer"
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            className="group relative bg-white p-8 md:p-10 flex flex-col justify-between gap-8 overflow-hidden transition-colors duration-300 hover:bg-black/[0.02]"
                        >

                            {/* Top Row */}
                            <div className="flex items-start justify-between">
                                <span className="text-[10px] tracking-[0.22em] uppercase text-black/30 font-semibold">
                                    {label}
                                </span>
                                <span className="text-xl transition-all duration-300 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                    ↗
                                </span>
                            </div>

                            {/* Main Content */}
                            <div>
                                <p className="text-black/35 text-sm mb-2">{desc}</p>
                                <span className="text-xl md:text-2xl font-semibold tracking-tight text-black group-hover:text-black/60 transition-colors duration-300 break-all">
                                    {display}
                                </span>
                            </div>

                            {/* Hover Underline */}
                            <span
                                className="absolute bottom-0 left-0 h-[2px] bg-black transition-all duration-500 ease-out"
                                style={{ width: hovered === i ? "100%" : "0%" }}
                            />

                        </a>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Contact