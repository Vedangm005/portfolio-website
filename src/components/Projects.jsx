import { useState, lazy, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import spider from "../assets/spider.jpg"
import sahaya from "../assets/sahaya.jpg"

const CaseStudyPanel = lazy(() => import("./CaseStudyPanel"))

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

const projects = [
    {
        title: "Spider Robot",
        image: spider,
        description:
            "A quadruped robotic platform built using ESP32 with integrated computer vision for real-time object detection and responsive locomotion.",
        tech: ["ESP32", "Embedded C/C++", "OpenCV", "Computer Vision"],
        year: "2024",
        category: "Hardware / Embedded Systems",
        challenge:
            "Design and develop a stable quadruped robot capable of coordinated locomotion while integrating real-time visual feedback using constrained embedded hardware resources.",
        solution:
            "As part of a team project, we developed a four-legged spider robot powered by ESP32. The system combined servo-based gait control with an onboard camera module to enable object detection using OpenCV. The primary focus was ensuring smooth leg coordination and stable movement while maintaining low-latency visual processing.",
        features: [
            "Quadruped locomotion system with calibrated gait cycles",
            "Servo motor coordination for terrain-adaptive balance",
            "ESP32-CAM integration for live visual feedback",
            "Real-time object detection pipeline using OpenCV",
        ],
        role:
            "Worked as part of a team. I focused on embedded control logic, servo calibration, and integrating the vision module with the ESP32 to enable responsive and synchronized movement.",
        gallery: [spider],
        demoVideo: null,
        liveUrl: null,
        githubUrl: null,
    },
    {
        title: "Sahaya Setu",
        image: sahaya,
        description:
            "A full-stack civic issue reporting platform with a structured admin workflow, enabling transparent communication between citizens and authorities.",
        tech: ["React", "Node.js", "Supabase", "REST APIs"],
        year: "2024",
        category: "Full Stack / Civic Tech",
        challenge:
            "Create a structured and transparent system for citizens to report civic issues while enabling authorities to monitor, assign, and resolve complaints efficiently.",
        solution:
            "Built Sahaya Setu — a full-stack civic issue reporting platform consisting of a citizen-facing application and a web-based admin portal. Both systems were connected using Supabase for authentication, database management, and real-time data synchronization.",
        features: [
            "Citizen interface for reporting issues with structured forms",
            "Web-based admin dashboard for issue triage and resolution workflow",
            "Role-based authentication using Supabase",
            "Real-time database synchronization between citizen app and admin portal",
        ],
        role:
            "Designed and developed the web admin portal. Integrated the citizen-facing app and admin dashboard using Supabase for authentication, database management, and backend connectivity.",
        gallery: [sahaya],
        demoVideo: null,
        liveUrl: null,
        githubUrl: null,
    },
]

const categories = ["All", ...new Set(projects.map(p => p.category))]

function Projects() {
    const [expandedIndex, setExpandedIndex] = useState(null)
    const [activeFilter, setActiveFilter] = useState("All")

    const filteredProjects = activeFilter === "All"
        ? projects
        : projects.filter(p => p.category === activeFilter)

    const handleToggle = (index) => {
        setExpandedIndex(prev => (prev === index ? null : index))
    }

    return (
        <section
            id="work"
            className="relative bg-black text-white py-28 md:py-36 px-6 md:px-16 overflow-hidden"
            aria-label="Projects section"
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
                    className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-black tracking-[-0.02em] mb-12"
                >
                    What I've built.
                </motion.h2>

                {/* Filter Pills */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    custom={2}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-3 mb-24"
                    role="tablist"
                    aria-label="Filter projects by category"
                >
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => {
                                setActiveFilter(cat)
                                setExpandedIndex(null)
                            }}
                            role="tab"
                            aria-selected={activeFilter === cat}
                            className={`px-5 py-2 rounded-full text-xs md:text-[13px] font-medium tracking-wide transition-all duration-300 ${activeFilter === cat
                                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                    : "border border-white/[0.12] text-white/40 hover:text-white hover:border-white/30 hover:bg-white/[0.04]"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Projects */}
                <div className="space-y-40">
                    <AnimatePresence mode="wait">
                        {filteredProjects.map((project, index) => {
                            const originalIndex = projects.indexOf(project)
                            const isReversed = index % 2 !== 0
                            const isExpanded = expandedIndex === originalIndex

                            return (
                                <motion.div
                                    key={project.title}
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <motion.div
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
                                                {String(originalIndex + 1).padStart(2, "0")} — {project.category}
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
                                                <button
                                                    onClick={() => handleToggle(originalIndex)}
                                                    className="group flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white transition"
                                                    aria-expanded={isExpanded}
                                                >
                                                    {isExpanded ? "Close case study" : "View case study"}
                                                    <span
                                                        className={`transform transition-transform duration-300 ${isExpanded ? "rotate-90" : "group-hover:translate-x-1"
                                                            }`}
                                                    >
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
                                                    loading="lazy"
                                                    className="w-full h-[320px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Expanded Case Study */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <Suspense fallback={
                                                <div className="mt-8 text-white/30 text-sm text-center py-12">Loading case study...</div>
                                            }>
                                                <CaseStudyPanel
                                                    project={project}
                                                    onClose={() => setExpandedIndex(null)}
                                                />
                                            </Suspense>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}

export default Projects