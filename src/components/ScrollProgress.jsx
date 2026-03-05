import { useEffect, useState } from "react"

function ScrollProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        let ticking = false

        const updateProgress = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
            setProgress(scrollPercent)
            ticking = false
        }

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateProgress)
                ticking = true
            }
        }

        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <div
            className="fixed top-0 left-0 w-full h-[3px] z-[70] pointer-events-none"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Page scroll progress"
        >
            <div
                className="h-full transition-[width] duration-150 ease-out"
                style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #10b981, #34d399, #ffffff80)",
                    boxShadow: "0 0 12px rgba(16, 185, 129, 0.4)",
                }}
            />
        </div>
    )
}

export default ScrollProgress
