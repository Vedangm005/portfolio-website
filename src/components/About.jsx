import vedangPhoto from "../assets/Vedang.jpg"
import { motion } from "framer-motion"

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
}

function About() {
    const skillGroups = [
        { label: "Frontend", skills: ["React", "Three.js", "Tailwind CSS", "HTML / CSS"] },
        { label: "Backend", skills: ["Node.js", "MongoDB", "Express", "REST APIs"] },
        { label: "Hardware", skills: ["ESP32", "Embedded Systems", "Arduino", "Circuit Design"] },
        { label: "AI / Vision", skills: ["Python", "OpenCV", "Computer Vision", "NumPy"] },
    ]

    const stats = [
        { number: "02", label: "Deployed Projects" },
        { number: "03", label: "Engineering Domains" },
        { number: "04+", label: "Production Stacks" },
    ]

    return (
        <section
            id="about"
            className="relative bg-black text-white py-28 md:py-36 px-6 md:px-16 overflow-hidden"
        >
            {/* Grid texture */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Ambient glows */}
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-[120px]" />
            <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[140px]" />

            <div className="relative max-w-6xl mx-auto">

                {/* Section Label */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-16"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <span className="text-[10px] tracking-[0.35em] uppercase text-white/30 font-medium">
                        01 — About
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </motion.div>

                {/* Headline + Photo */}
                <div className="grid md:grid-cols-[1.1fr_auto] gap-16 items-center mb-28">

                    <div>
                        <motion.h2
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            custom={0}
                            viewport={{ once: true }}
                            className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-black leading-[1.08] tracking-[-0.02em]"
                        >
                            Engineering systems
                            <br />
                            that work.
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            custom={1}
                            viewport={{ once: true }}
                            className="mt-4 text-[13px] tracking-[0.18em] uppercase text-white/25 font-medium"
                        >
                            I build things that talk to each other.
                        </motion.p>

                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            custom={2}
                            viewport={{ once: true }}
                            className="mt-4 text-[15px] md:text-[16px] text-white/45 max-w-md leading-[1.8]"
                        >
                            Across software, hardware, and embedded platforms.
                        </motion.p>
                    </div>

                    {/* Animated Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative group perspective-[1200px] mx-auto md:mx-0"
                    >
                        <div className="absolute -inset-4 bg-white/[0.03] blur-2xl rounded-[30px]" />

                        <motion.div
                            whileHover={{
                                rotateX: 4,
                                rotateY: -4,
                                scale: 1.04,
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="relative w-[230px] md:w-[260px] aspect-[3/4] rounded-[24px] overflow-hidden border border-white/[0.1] shadow-[0_25px_70px_rgba(0,0,0,0.6)] transform-gpu"
                        >
                            <img
                                src={vedangPhoto}
                                alt="Vedang Mishra"
                                className="w-full h-full object-cover object-top"
                            />

                            {/* Light sweep */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                <div className="absolute -left-full top-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 group-hover:translate-x-full transition-transform duration-1000" />
                            </div>

                            <div className="absolute inset-0 bg-black/15" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom Section */}
                <div className="grid md:grid-cols-[1fr_1px_1fr] gap-0">

                    <div className="pr-0 md:pr-14 space-y-6">

                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            custom={0}
                            viewport={{ once: true }}
                            className="text-[15px] md:text-[16px] text-white/55 leading-[1.9]"
                        >
                            I'm a second-year Electronics & Computer Science student at{" "}
                            <span className="text-white font-semibold">KIIT University</span>.
                            My work focuses on building reliable systems that bridge modern web technologies with embedded hardware.
                        </motion.p>

                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            custom={1}
                            viewport={{ once: true }}
                            className="text-[15px] md:text-[16px] text-white/55 leading-[1.9]"
                        >
                            I developed a{" "}
                            <span className="text-white font-semibold">four-legged spider robot</span>{" "}
                            powered by computer vision and{" "}
                            <span className="text-white font-semibold">Sahaya Setu</span>, a civic issue reporting system designed to streamline communication between citizens and local authorities.
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            custom={3}
                            viewport={{ once: true }}
                            className="mt-10 pt-8 border-t border-white/[0.07] flex flex-wrap gap-x-10 gap-y-6"
                        >
                            {stats.map((s, i) => (
                                <div key={i}>
                                    <div className="text-[2.2rem] md:text-[2.6rem] font-black tracking-[-0.05em] leading-none text-white tabular-nums">
                                        {s.number}
                                    </div>
                                    <div className="mt-2 text-[9px] uppercase tracking-[0.22em] text-white/30 font-medium">
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="hidden md:block mx-12 self-stretch bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />

                    {/* Skills */}
                    <div>
                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-[10px] uppercase tracking-[0.3em] text-white/25 font-medium mb-6"
                        >
                            Tools & Technologies
                        </motion.p>

                        <div className="grid grid-cols-2 gap-4">
                            {skillGroups.map((group, gi) => (
                                <motion.div
                                    key={group.label}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    custom={gi * 0.8}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -4 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                                    className="group relative rounded-xl p-4 bg-white/[0.02] border border-white/[0.07] overflow-hidden transition-all duration-300 hover:border-white/[0.15]"
                                >
                                    <div className="text-[9px] uppercase tracking-[0.2em] text-white/25 font-medium mb-3">
                                        {group.label}
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {group.skills.map(skill => (
                                            <span
                                                key={skill}
                                                className="text-[11px] px-3 py-1 rounded-full border border-white/[0.08] text-white/40 transition-all duration-300 hover:border-white/25 hover:text-white hover:shadow-[0_0_12px_rgba(255,255,255,0.15)] hover:-translate-y-0.5"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default About