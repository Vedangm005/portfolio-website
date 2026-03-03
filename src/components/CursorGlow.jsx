import { useEffect, useRef } from "react"

function CursorGlow() {
    const dotRef = useRef(null)
    const ringRef = useRef(null)

    useEffect(() => {
        if ("ontouchstart" in window) return

        const dot = dotRef.current
        const ring = ringRef.current
        if (!dot || !ring) return

        let mouseX = 0
        let mouseY = 0
        let ringX = 0
        let ringY = 0
        let ringSize = 16
        let targetRingSize = 16
        let animationId
        let magnetTarget = null

        const move = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        const hover = (e) => {
            const clickable = e.target.closest(
                "a, button, [role='button'], .cursor-pointer"
            )
            const heading = e.target.closest("h1, h2, h3")

            if (clickable) {
                magnetTarget = clickable
                targetRingSize = 56
                dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px) scale(0.6)`
            } else if (heading) {
                magnetTarget = null
                targetRingSize = 44
                dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px) scale(1)`
            } else {
                magnetTarget = null
                targetRingSize = 16
                dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px) scale(1)`
            }
        }

        const leave = () => {
            dot.style.opacity = "0"
            ring.style.opacity = "0"
        }

        const enter = () => {
            dot.style.opacity = "1"
            ring.style.opacity = "1"
        }

        const down = () => {
            targetRingSize *= 0.8
        }

        const up = () => {
            targetRingSize = magnetTarget ? 56 : 16
        }

        function animate() {
            animationId = requestAnimationFrame(animate)

            // Dot follows instantly
            dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`

            let destX = mouseX
            let destY = mouseY

            if (magnetTarget) {
                const rect = magnetTarget.getBoundingClientRect()
                const centerX = rect.left + rect.width / 2
                const centerY = rect.top + rect.height / 2
                destX = mouseX + (centerX - mouseX) * 0.25
                destY = mouseY + (centerY - mouseY) * 0.25
            }

            ringX += (destX - ringX) * 0.15
            ringY += (destY - ringY) * 0.15
            ringSize += (targetRingSize - ringSize) * 0.18

            ring.style.transform = `translate(${ringX - ringSize / 2}px, ${ringY - ringSize / 2
                }px)`
            ring.style.width = `${ringSize}px`
            ring.style.height = `${ringSize}px`
        }

        document.addEventListener("mousemove", move)
        document.addEventListener("mouseover", hover)
        document.addEventListener("mouseleave", leave)
        document.addEventListener("mouseenter", enter)
        document.addEventListener("mousedown", down)
        document.addEventListener("mouseup", up)

        animate()

        return () => {
            cancelAnimationFrame(animationId)
            document.removeEventListener("mousemove", move)
            document.removeEventListener("mouseover", hover)
            document.removeEventListener("mouseleave", leave)
            document.removeEventListener("mouseenter", enter)
            document.removeEventListener("mousedown", down)
            document.removeEventListener("mouseup", up)
        }
    }, [])

    return (
        <>
            {/* Ring */}
            <div
                ref={ringRef}
                className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block rounded-full"
                style={{
                    width: "16px",
                    height: "16px",
                    border: "1.5px solid white",
                    mixBlendMode: "difference",
                    willChange: "transform, width, height",
                    transition: "opacity 0.2s ease",
                }}
            />

            {/* Dot */}
            <div
                ref={dotRef}
                className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block rounded-full"
                style={{
                    width: "6px",
                    height: "6px",
                    background: "white",
                    mixBlendMode: "difference",
                    willChange: "transform",
                    transition: "opacity 0.2s ease, transform 0.15s ease",
                }}
            />
        </>
    )
}

export default CursorGlow