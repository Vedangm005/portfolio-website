function About() {

    const skills = [
        "React", "Node.js", "Python", "ESP32",
        "OpenCV", "MongoDB", "Three.js", "Embedded Systems"
    ]

    return (
        <section
            id="about"
            className="fade-section bg-white text-black py-20 md:py-32 px-6"
        >
            <div className="max-w-6xl mx-auto">

                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
                    About
                </h2>

                <div className="mt-10 md:mt-16 grid md:grid-cols-2 gap-10 md:gap-16">

                    {/* Left — Text */}
                    <div>
                        <p className="text-base md:text-xl text-black/60 leading-relaxed">
                            I build projects involving both software and hardware
                            with a focus on practical systems. My work includes
                            robotics and full-stack web applications designed to
                            solve real problems.
                        </p>

                        <p className="mt-5 md:mt-6 text-base md:text-xl text-black/60 leading-relaxed">
                            Currently studying at KIIT University, exploring the
                            intersection of embedded systems and modern web technologies.
                        </p>
                    </div>

                    {/* Right — Skills */}
                    <div>
                        <h3 className="text-xs md:text-sm text-black/40 uppercase tracking-[0.2em] mb-5 md:mb-6">
                            Tools & Technologies
                        </h3>

                        <div className="flex flex-wrap gap-2 md:gap-3">
                            {skills.map(skill => (
                                <span
                                    key={skill}
                                    className="px-3 md:px-4 py-1.5 md:py-2 border border-black/10 rounded-full text-xs md:text-sm text-black/70 hover:border-black/40 hover:text-black hover:scale-105 transition-all duration-300 cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default About