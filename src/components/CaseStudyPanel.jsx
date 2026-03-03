import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const sectionFade = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: 0.15 + i * 0.1,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
}

function CaseStudyPanel({ project, onClose }) {
    const [activeImage, setActiveImage] = useState(0)

    const images = project.gallery || [project.image]

    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
        >
            <div className="relative mt-14 pt-12 border-t border-white/[0.06]">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-0 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 text-sm z-10"
                    aria-label="Close case study"
                >
                    ✕
                </button>

                {/* Header */}
                <motion.div
                    variants={sectionFade}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                    className="mb-12"
                >
                    <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                        {project.title}
                    </h3>
                    <p className="mt-3 text-white/40 text-sm max-w-xl leading-relaxed">
                        {project.subtitle || "A detailed breakdown of the problem, approach, and execution."}
                    </p>
                </motion.div>

                {/* Split Layout */}
                <div className="grid md:grid-cols-[1fr_1.3fr] gap-14 md:gap-20">

                    {/* LEFT — Content */}
                    <div className="space-y-12">

                        {/* Challenge */}
                        {project.challenge && (
                            <motion.div variants={sectionFade} initial="hidden" animate="visible" custom={1}>
                                <h4 className="section-label">The Challenge</h4>
                                <p className="section-text">{project.challenge}</p>
                            </motion.div>
                        )}

                        {/* Solution */}
                        {project.solution && (
                            <motion.div variants={sectionFade} initial="hidden" animate="visible" custom={2}>
                                <h4 className="section-label">The Solution</h4>
                                <p className="section-text">{project.solution}</p>
                            </motion.div>
                        )}

                        {/* Features */}
                        {project.features?.length > 0 && (
                            <motion.div variants={sectionFade} initial="hidden" animate="visible" custom={3}>
                                <h4 className="section-label">Key Features</h4>
                                <ul className="space-y-3 mt-4">
                                    {project.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-white/55 text-[15px] leading-relaxed">
                                            <span className="mt-2 w-1 h-1 rounded-full bg-white/30 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {/* Role */}
                        {project.role && (
                            <motion.div variants={sectionFade} initial="hidden" animate="visible" custom={4}>
                                <h4 className="section-label">My Role</h4>
                                <p className="section-text">{project.role}</p>
                            </motion.div>
                        )}

                        {/* Outcome (Optional New Section) */}
                        {project.outcome && (
                            <motion.div variants={sectionFade} initial="hidden" animate="visible" custom={5}>
                                <h4 className="section-label">Outcome</h4>
                                <p className="section-text">{project.outcome}</p>
                            </motion.div>
                        )}

                        {/* Learnings (Optional New Section) */}
                        {project.learnings && (
                            <motion.div variants={sectionFade} initial="hidden" animate="visible" custom={6}>
                                <h4 className="section-label">What I Learned</h4>
                                <p className="section-text">{project.learnings}</p>
                            </motion.div>
                        )}

                        {/* Tech Stack */}
                        <motion.div variants={sectionFade} initial="hidden" animate="visible" custom={7}>
                            <h4 className="section-label">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="px-3 py-1.5 text-[11px] border border-white/[0.12] rounded-full text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Links */}
                        {(project.liveUrl || project.githubUrl) && (
                            <motion.div
                                variants={sectionFade}
                                initial="hidden"
                                animate="visible"
                                custom={8}
                                className="flex items-center gap-8 pt-2"
                            >
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="case-link"
                                    >
                                        Live
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="case-link"
                                    >
                                        GitHub
                                    </a>
                                )}
                            </motion.div>
                        )}

                    </div>

                    {/* RIGHT — Visuals */}
                    <motion.div
                        variants={sectionFade}
                        initial="hidden"
                        animate="visible"
                        custom={2}
                        className="space-y-6"
                    >
                        {/* Main Media */}
                        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_30px_90px_rgba(0,0,0,0.6)] group">
                            <AnimatePresence mode="wait">
                                {project.demoVideo && activeImage === 0 ? (
                                    <motion.video
                                        key="video"
                                        src={project.demoVideo}
                                        controls
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="w-full h-[320px] md:h-[420px] object-cover bg-black"
                                    />
                                ) : (
                                    <motion.img
                                        key={images[activeImage]}
                                        src={images[activeImage]}
                                        alt={`${project.title} screenshot`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="w-full h-[320px] md:h-[420px] object-cover"
                                    />
                                )}
                            </AnimatePresence>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Thumbnails */}
                        {(images.length > 1 || project.demoVideo) && (
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`w-24 h-16 rounded-lg overflow-hidden border transition-all duration-300 ${activeImage === i
                                                ? "border-white/40 ring-1 ring-white/20"
                                                : "border-white/[0.08] opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`Thumbnail ${i}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Bottom Divider */}
                <div className="mt-16 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            </div>
        </motion.div>
    )
}

export default CaseStudyPanel