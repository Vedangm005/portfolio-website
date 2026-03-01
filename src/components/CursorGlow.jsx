import { useEffect, useRef } from "react"

function CursorGlow() {

    const dotRef = useRef(null)
    const ringRef = useRef(null)

    useEffect(() => {

        // Skip on touch devices
        if ("ontouchstart" in window) return

        const dot = dotRef.current
        const ring = ringRef.current
        if (!dot || !ring) return

        let mouseX = 0
        let mouseY = 0
        let ringX = 0
        let ringY = 0
        let animationId
        let isHovering = false

        const onMouseMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        // Expand ring on interactive elements
        const onMouseOver = (e) => {
            const target = e.target.closest("a, button, [role='button'], .cursor-pointer")
            if (target) {
                isHovering = true
                ring.style.width = "56px"
                ring.style.height = "56px"
                ring.style.borderColor = "rgba(0,0,0,0.15)"
                ring.style.backgroundColor = "rgba(0,0,0,0.03)"
                dot.style.opacity = "0"
            } else {
                isHovering = false
                ring.style.width = "36px"
                ring.style.height = "36px"
                ring.style.borderColor = "rgba(120,120,120,0.35)"
                ring.style.backgroundColor = "transparent"
                dot.style.opacity = "1"
            }
        }

        function animate() {
            animationId = requestAnimationFrame(animate)

            // Dot — instant
            dot.style.transform =
                `translate(${mouseX - 4}px, ${mouseY - 4}px)`

            // Ring — smooth follow
            ringX += (mouseX - ringX) * 0.15
            ringY += (mouseY - ringY) * 0.15

            const size = isHovering ? 28 : 18
            ring.style.transform =
                `translate(${ringX - size}px, ${ringY - size}px)`
        }

        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseover", onMouseOver)
        animate()

        return () => {
            cancelAnimationFrame(animationId)
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mouseover", onMouseOver)
        }

    }, [])


    return (
        <>
            {/* Ring — grey border, visible on both dark & light */}
            <div
                ref={ringRef}
                className="pointer-events-none fixed top-0 left-0 z-[999] rounded-full hidden md:block"
                style={{
                    width: "36px",
                    height: "36px",
                    border: "1px solid rgba(120,120,120,0.35)",
                    willChange: "transform",
                    transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background-color 0.3s ease",
                }}
            />

            {/* Dot — small grey circle, universally visible */}
            <div
                ref={dotRef}
                className="pointer-events-none fixed top-0 left-0 z-[999] w-2 h-2 rounded-full hidden md:block"
                style={{
                    backgroundColor: "rgba(120,120,120,0.7)",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.5)",
                    willChange: "transform",
                    transition: "opacity 0.2s ease",
                }}
            />
        </>
    )
}

export default CursorGlow