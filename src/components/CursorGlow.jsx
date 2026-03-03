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
        let ringSize = 12
        let targetRingSize = 12
        let animationId
        let magnetTarget = null
        let isOnLight = false

        // Detect light-background sections (same as Navbar)
        const lightIds = ["contact"]
        const lightSections = lightIds.map(id => document.getElementById(id)).filter(Boolean)
        let sectionObserver = null

        if (lightSections.length) {
            sectionObserver = new IntersectionObserver(
                (entries) => {
                    const anyLight = entries.some(e => e.isIntersecting)
                    isOnLight = anyLight
                    // Update colors immediately
                    applyColors()
                },
                { rootMargin: "-0px 0px -85% 0px", threshold: 0 }
            )
            lightSections.forEach(s => sectionObserver.observe(s))
        }

        // Color helpers
        const colors = {
            dark: { // cursor on dark bg → white cursor
                dot: "rgba(255,255,255,0.95)",
                dotShadow: "0 0 8px rgba(255,255,255,0.4), 0 0 2px rgba(255,255,255,0.8)",
                ring: "rgba(255,255,255,0.5)",
                ringHover: "rgba(255,255,255,0.65)",
                ringFill: "rgba(255,255,255,0.08)",
                ringHeading: "rgba(255,255,255,0.35)",
            },
            light: { // cursor on light bg → dark cursor
                dot: "rgba(0,0,0,0.85)",
                dotShadow: "0 0 8px rgba(0,0,0,0.15), 0 0 2px rgba(0,0,0,0.3)",
                ring: "rgba(0,0,0,0.4)",
                ringHover: "rgba(0,0,0,0.55)",
                ringFill: "rgba(0,0,0,0.06)",
                ringHeading: "rgba(0,0,0,0.25)",
            },
        }

        function getColors() {
            return isOnLight ? colors.light : colors.dark
        }

        function applyColors() {
            const c = getColors()
            dot.style.backgroundColor = c.dot
            dot.style.boxShadow = c.dotShadow
            ring.style.borderColor = c.ring
        }

        const onMouseMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        const onMouseOver = (e) => {
            const clickable = e.target.closest("a, button, [role='button'], .cursor-pointer")
            const isHeading = e.target.closest("h1, h2, h3, h4")
            const c = getColors()

            if (clickable) {
                magnetTarget = clickable
                targetRingSize = 44
                ring.style.borderColor = c.ringHover
                ring.style.backgroundColor = c.ringFill
                dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px) scale(0.5)`
                dot.style.opacity = "0.4"
            } else if (isHeading) {
                magnetTarget = null
                targetRingSize = 52
                ring.style.borderColor = c.ringHeading
                ring.style.backgroundColor = "transparent"
                dot.style.opacity = "1"
                dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px) scale(1)`
            } else {
                magnetTarget = null
                targetRingSize = 12
                ring.style.borderColor = c.ring
                ring.style.backgroundColor = "transparent"
                dot.style.opacity = "1"
                dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px) scale(1)`
            }
        }

        const onMouseLeave = () => {
            dot.style.opacity = "0"
            ring.style.opacity = "0"
            magnetTarget = null
        }

        const onMouseEnter = () => {
            dot.style.opacity = "1"
            ring.style.opacity = "1"
        }

        // On click — quick pulse
        const onMouseDown = () => {
            targetRingSize = magnetTarget ? 36 : 8
        }
        const onMouseUp = () => {
            targetRingSize = magnetTarget ? 44 : 12
        }

        function animate() {
            animationId = requestAnimationFrame(animate)

            // Dot — instant, always follows true mouse
            dot.style.transform =
                `translate(${mouseX - 3}px, ${mouseY - 3}px)`

            // Ring destination — pulled toward magnet center if hovering clickable
            let destX = mouseX
            let destY = mouseY

            if (magnetTarget) {
                const rect = magnetTarget.getBoundingClientRect()
                const centerX = rect.left + rect.width / 2
                const centerY = rect.top + rect.height / 2
                destX = mouseX + (centerX - mouseX) * 0.28
                destY = mouseY + (centerY - mouseY) * 0.28
            }

            // Smooth ring follow
            ringX += (destX - ringX) * 0.13
            ringY += (destY - ringY) * 0.13

            // Smooth ring size
            ringSize += (targetRingSize - ringSize) * 0.13

            ring.style.transform =
                `translate(${ringX - ringSize / 2}px, ${ringY - ringSize / 2}px)`
            ring.style.width = `${ringSize}px`
            ring.style.height = `${ringSize}px`
        }

        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseover", onMouseOver)
        document.addEventListener("mouseleave", onMouseLeave)
        document.addEventListener("mouseenter", onMouseEnter)
        document.addEventListener("mousedown", onMouseDown)
        document.addEventListener("mouseup", onMouseUp)
        animate()

        return () => {
            cancelAnimationFrame(animationId)
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mouseover", onMouseOver)
            document.removeEventListener("mouseleave", onMouseLeave)
            document.removeEventListener("mouseenter", onMouseEnter)
            document.removeEventListener("mousedown", onMouseDown)
            document.removeEventListener("mouseup", onMouseUp)
            if (sectionObserver) {
                lightSections.forEach(s => sectionObserver.unobserve(s))
            }
        }

    }, [])

    return (
        <>
            {/* Outer ring — lags behind, expands on hover */}
            <div
                ref={ringRef}
                className="pointer-events-none fixed top-0 left-0 z-[999] rounded-full hidden md:block"
                style={{
                    width: "12px",
                    height: "12px",
                    border: "1.5px solid rgba(255,255,255,0.5)",
                    willChange: "transform, width, height",
                    transition: "border-color 0.4s ease, background-color 0.4s ease, opacity 0.3s ease",
                }}
            />

            {/* Inner dot — instant follow, always sharp */}
            <div
                ref={dotRef}
                className="pointer-events-none fixed top-0 left-0 z-[999] rounded-full hidden md:block"
                style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "rgba(255,255,255,0.95)",
                    boxShadow: "0 0 8px rgba(255,255,255,0.4), 0 0 2px rgba(255,255,255,0.8)",
                    willChange: "transform",
                    transition: "opacity 0.2s ease, transform 0.15s ease, background-color 0.4s ease, box-shadow 0.4s ease",
                }}
            />
        </>
    )
}

export default CursorGlow