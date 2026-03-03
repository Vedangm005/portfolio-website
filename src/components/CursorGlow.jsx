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
        let dotScale = 1
        let targetDotScale = 1
        let animationId
        let magnetTarget = null
        let isOnLight = false
        let currentHoverState = "default" // "default" | "clickable" | "heading"

        // ── Section color detection ──
        const lightIds = ["contact"]
        const lightSections = lightIds
            .map(id => document.getElementById(id))
            .filter(Boolean)

        let sectionObserver = null

        if (lightSections.length) {
            sectionObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(e => {
                        if (e.isIntersecting) isOnLight = true
                        else isOnLight = false
                    })
                    reapplyHoverState()
                },
                { threshold: 0.15 }
            )
            lightSections.forEach(s => sectionObserver.observe(s))
        }

        // ── Colors ──
        const colors = {
            dark: {
                dot: "rgba(255,255,255,0.95)",
                dotShadow: "0 0 8px rgba(255,255,255,0.4), 0 0 2px rgba(255,255,255,0.8)",
                ring: "rgba(255,255,255,0.45)",
                ringHover: "rgba(255,255,255,0.65)",
                ringFill: "rgba(255,255,255,0.08)",
                ringHeading: "rgba(255,255,255,0.3)",
            },
            light: {
                dot: "rgba(0,0,0,0.85)",
                dotShadow: "0 0 8px rgba(0,0,0,0.12), 0 0 2px rgba(0,0,0,0.3)",
                ring: "rgba(0,0,0,0.4)",
                ringHover: "rgba(0,0,0,0.55)",
                ringFill: "rgba(0,0,0,0.06)",
                ringHeading: "rgba(0,0,0,0.25)",
            },
        }

        const getC = () => isOnLight ? colors.light : colors.dark

        // Re-applies correct ring/dot colors for whatever state we're in
        function reapplyHoverState() {
            const c = getC()
            dot.style.backgroundColor = c.dot
            dot.style.boxShadow = c.dotShadow

            if (currentHoverState === "clickable") {
                ring.style.borderColor = c.ringHover
                ring.style.backgroundColor = c.ringFill
            } else if (currentHoverState === "heading") {
                ring.style.borderColor = c.ringHeading
                ring.style.backgroundColor = "transparent"
            } else {
                ring.style.borderColor = c.ring
                ring.style.backgroundColor = "transparent"
            }
        }

        // ── Mouse events ──
        const onMouseMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        const onMouseOver = (e) => {
            const clickable = e.target.closest("a, button, [role='button'], .cursor-pointer")
            const isHeading = e.target.closest("h1, h2, h3, h4")
            const c = getC()

            if (clickable) {
                currentHoverState = "clickable"
                magnetTarget = clickable
                targetRingSize = 44
                targetDotScale = 0.4
                ring.style.borderColor = c.ringHover
                ring.style.backgroundColor = c.ringFill
            } else if (isHeading) {
                currentHoverState = "heading"
                magnetTarget = null
                targetRingSize = 52
                targetDotScale = 1
                ring.style.borderColor = c.ringHeading
                ring.style.backgroundColor = "transparent"
            } else {
                currentHoverState = "default"
                magnetTarget = null
                targetRingSize = 12
                targetDotScale = 1
                ring.style.borderColor = c.ring
                ring.style.backgroundColor = "transparent"
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

        const onMouseDown = () => {
            targetRingSize = magnetTarget ? 34 : 7
        }

        const onMouseUp = () => {
            targetRingSize = currentHoverState === "clickable" ? 44 : 12
        }

        // ── Animation loop ──
        function animate() {
            animationId = requestAnimationFrame(animate)

            // Dot — instant position, lerped scale (no transform transition in CSS)
            dotScale += (targetDotScale - dotScale) * 0.14
            dot.style.transform =
                `translate(${mouseX - 3}px, ${mouseY - 3}px) scale(${dotScale})`

            // Ring destination with magnetic pull
            let destX = mouseX
            let destY = mouseY

            if (magnetTarget) {
                const rect = magnetTarget.getBoundingClientRect()
                destX = mouseX + (rect.left + rect.width / 2 - mouseX) * 0.28
                destY = mouseY + (rect.top + rect.height / 2 - mouseY) * 0.28
            }

            ringX += (destX - ringX) * 0.13
            ringY += (destY - ringY) * 0.13
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
            <div
                ref={ringRef}
                className="pointer-events-none fixed top-0 left-0 z-[999] rounded-full hidden md:block"
                style={{
                    width: "12px",
                    height: "12px",
                    border: "1.5px solid rgba(255,255,255,0.45)",
                    willChange: "transform, width, height",
                    transition: "border-color 0.35s ease, background-color 0.35s ease, opacity 0.3s ease",
                }}
            />
            <div
                ref={dotRef}
                className="pointer-events-none fixed top-0 left-0 z-[999] rounded-full hidden md:block"
                style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "rgba(255,255,255,0.95)",
                    boxShadow: "0 0 8px rgba(255,255,255,0.4), 0 0 2px rgba(255,255,255,0.8)",
                    willChange: "transform",
                    transition: "opacity 0.2s ease, background-color 0.35s ease, box-shadow 0.35s ease",
                }}
            />
        </>
    )
}

export default CursorGlow