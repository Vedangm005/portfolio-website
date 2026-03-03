import { motion } from "framer-motion"
import spider from "../assets/spider.jpg"
import sahaya from "../assets/sahaya.jpg"

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            delay: i * 0.15,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
}

function Projects() {
    const projects = [
        {
            title: "Spider Robot",
            image: spider,
            description:
                "A four-legged robotic platform built using ESP32 with onboard camera support and real-time object detection powered by computer vision.",
            tech: ["ESP32", "Python", "OpenCV", "Embedded Systems"],
            year: "2024",
            category: "Hardware / AI",
        },
        {
            title: "Sahaya Setu",
            image: sahaya,
            description:
                "A civic issue reporting system with a structured admin workflow, enabling efficient communication between citizens and local authorities.",
            tech: ["React", "Node.js", "MongoDB", "REST APIs"],
            year: "2024",
            category: "Full Stack",
        },
    ]

    return (
        <section
            id="work"
            className="relative bg-black text-white py-28 md:py-36 px-6 md:px-16 overflow-hidden"
        >
            <div className="max-w-6xl mx-auto">

                {/* Section Label */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-20"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <span className="text-[10px] tracking-[0.35em] uppercase text-white/30 font-medium">
                        02 — Work
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </motion.div>

                {/* Heading */}
                <motion.h2
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    custom={1}
                    viewport={{ once: true }}
                    className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-black tracking-[-0.02em] mb-24"
                >
                    Selected projects.
                </motion.h2>

                {/* Projects */}
                <div className="space-y-40">

                    {projects.map((project, index) => {
                        const isReversed = index % 2 !== 0

                        return (
                            <motion.div
                                key={project.title}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                custom={index}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`grid md:grid-cols-2 gap-14 md:gap-20 items-center ${isReversed ? "md:[&>*:first-child]:order-2" : ""
                                    }`}
                            >
                                {/* Text Side */}
                                <div>

                                    <div className="text-[11px] uppercase tracking-[0.25em] text-white/25 mb-4">
                                        {String(index + 1).padStart(2, "0")} — {project.category}
                                    </div>

                                    <h3 className="font-display text-4xl md:text-5xl font-black tracking-[-0.02em]">
                                        {project.title}
                                    </h3>

                                    <p className="mt-6 text-white/50 leading-[1.9] max-w-md">
                                        {project.description}
                                    </p>

                                    <div className="mt-8 flex flex-wrap gap-2">
                                        {project.tech.map(t => (
                                            <span
                                                key={t}
                                                className="px-3 py-1.5 text-[11px] border border-white/[0.12] rounded-full text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-10">
                                        <button className="group flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white transition">
                                            View case study
                                            <span className="transform group-hover:translate-x-1 transition">
                                                →
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Image Side */}
                                <div className="relative group">
                                    <div className="absolute -inset-6 bg-white/[0.02] blur-2xl rounded-3xl" />

                                    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_30px_80px_rgba(0,0,0,0.7)] group-hover:shadow-[0_50px_120px_rgba(0,0,0,0.9)] transition-all duration-500">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-[320px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}

                </div>
            </div>
        </section>
    )
}

export default Projects