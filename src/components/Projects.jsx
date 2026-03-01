import { useState } from "react"
import spider from "../assets/spider.jpg"
import sahaya from "../assets/sahaya.jpg"
import ProjectModal from "./ProjectModal"

function Projects() {

    const [selectedProject, setSelectedProject] = useState(null)

    const projects = [
        {
            title: "Spider Robot",
            image: spider,
            description: "A four-legged robot built using ESP32 with camera support and object detection.",
            tech: ["ESP32", "Python", "OpenCV", "Embedded"],
            github: "#",
            demo: "#"
        },
        {
            title: "Sahaya Setu",
            image: sahaya,
            description: "A civic issue reporting platform with a web-based admin portal.",
            tech: ["React", "Node.js", "MongoDB", "REST API"],
            github: "#",
            demo: "#"
        }
    ]

    return (
        <section
            id="work"
            className="fade-section bg-[#f8f8f8] text-black py-20 md:py-32 px-6"
        >
            <div className="max-w-6xl mx-auto">

                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
                    Projects
                </h2>

                <div className="mt-14 md:mt-20 space-y-16 md:space-y-24">
                    {projects.map(project => (

                        <div
                            key={project.title}
                            className="group cursor-pointer"
                            onClick={() => setSelectedProject(project)}
                        >
                            {/* Image with hover overlay */}
                            <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                                    <span className="text-white text-xs sm:text-sm tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        View Project →
                                    </span>
                                </div>
                            </div>

                            {/* Title + Description */}
                            <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-3">
                                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold group-hover:translate-x-1 transition-transform duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-black/40 text-sm md:text-base max-w-sm md:text-right">
                                    {project.description}
                                </p>
                            </div>
                        </div>

                    ))}
                </div>

            </div>

            <ProjectModal
                project={selectedProject}
                close={() => setSelectedProject(null)}
            />

        </section>
    )
}

export default Projects