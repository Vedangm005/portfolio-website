import { useEffect } from "react"
import { createPortal } from "react-dom"

function ProjectModal({ project, close }) {

    useEffect(() => {
        if (!project) return
        const handleKey = (e) => { if (e.key === "Escape") close() }
        document.body.style.overflow = "hidden"
        window.addEventListener("keydown", handleKey)
        return () => {
            document.body.style.overflow = ""
            window.removeEventListener("keydown", handleKey)
        }
    }, [project, close])

    if (!project) return null

    return createPortal(
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center px-4 md:px-6 animate-fade-in"
            onClick={close}
        >
            <div
                className="relative bg-white w-full max-w-4xl rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.25)] max-h-[85vh] overflow-y-auto animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    onClick={close}
                    className="absolute top-4 right-4 md:top-5 md:right-5 bg-black/80 hover:bg-black text-white w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-base md:text-lg transition-colors duration-300 z-10"
                >
                    ✕
                </button>

                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[200px] sm:h-[280px] md:h-[380px] object-cover"
                />

                <div className="p-6 sm:p-8 md:p-10">

                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                        {project.title}
                    </h2>

                    <p className="mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-black/60 leading-relaxed max-w-2xl">
                        {project.description}
                    </p>

                    <div className="mt-6 md:mt-8 flex gap-2 flex-wrap">
                        {project.tech.map(t => (
                            <span
                                key={t}
                                className="px-3 py-1 md:px-3 md:py-1.5 bg-black/5 rounded-full text-xs font-medium text-black/70"
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="mt-8 md:mt-10 flex gap-3 md:gap-4">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 md:px-6 py-2.5 md:py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-black/80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                        >
                            GitHub
                        </a>
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 md:px-6 py-2.5 md:py-3 border border-black/15 rounded-xl text-sm font-medium hover:bg-black/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                        >
                            Live Demo
                        </a>
                    </div>

                </div>

            </div>
        </div>,
        document.body
    )
}

export default ProjectModal