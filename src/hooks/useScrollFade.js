import { useEffect } from "react"

function useScrollFade() {

    useEffect(() => {

        // Fade sections (existing)
        const sections = document.querySelectorAll(".fade-section")

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible")
                    }
                })
            },
            { threshold: 0.15 }
        )

        sections.forEach((section) => {
            sectionObserver.observe(section)
        })

        // Scroll reveal elements (staggered children)
        const reveals = document.querySelectorAll(".scroll-reveal")

        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed")
                    }
                })
            },
            { threshold: 0.1 }
        )

        reveals.forEach((el) => {
            revealObserver.observe(el)
        })

        return () => {
            sections.forEach((s) => sectionObserver.unobserve(s))
            reveals.forEach((r) => revealObserver.unobserve(r))
        }

    }, [])

}

export default useScrollFade