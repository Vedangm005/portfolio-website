import { useEffect, useRef } from "react"

function CursorGlow() {

    const cursorRef = useRef(null)

    useEffect(() => {

        if ("ontouchstart" in window) return

        const cursor = cursorRef.current
        if (!cursor) return

        let mouseX = 0
        let mouseY = 0
        let cursorX = 0
        let cursorY = 0

        // Animated values (lerped in rAF, not CSS)
        let currentSize = 36
        let targetSize = 36
        let currentBorderRadius = 50 // percent
        let targetBorderRadius = 50
        let blendMode = "difference"
        let animationId

        // Magnetic pull state
        let magnetTarget = null
        let magnetX = 0
        let magnetY = 0

        const onMouseMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        const onMouseOver = (e) => {
            const el = e.target

            // Images — disable inversion, show subtle ring instead
            const isImage = el.closest("img, .cursor-no-invert")
            if (isImage) {
                blendMode = "normal"
                cursor.style.mixBlendMode = "normal"
                cursor.style.backgroundColor = "transparent"
                cursor.style.border = "2px solid rgba(255,255,255,0.5)"
                targetSize = 48
                magnetTarget = null
                return
            }

            // Interactive elements — grow + magnetic snap
            const clickable = el.closest("a, button, [role='button'], .cursor-pointer")
            if (clickable) {
                targetSize = 48
                targetBorderRadius = 50
                magnetTarget = clickable
                // Reset to difference mode
                blendMode = "difference"
                cursor.style.mixBlendMode = "difference"
                cursor.style.backgroundColor = "white"
                cursor.style.border = "none"
                return
            }

            // Headings — subtle grow
            const isHeading = el.closest("h1, h2, h3")
            if (isHeading) {
                targetSize = 56
                targetBorderRadius = 50
                magnetTarget = null
                blendMode = "difference"
                cursor.style.mixBlendMode = "difference"
                cursor.style.backgroundColor = "white"
                cursor.style.border = "none"
                return
            }

            // Text — morph to thin vertical bar
            const isText = el.closest("p, span, li, label")
            if (isText && !clickable) {
                targetSize = 28
                targetBorderRadius = 50
                magnetTarget = null
                blendMode = "difference"
                cursor.style.mixBlendMode = "difference"
                cursor.style.backgroundColor = "white"
                cursor.style.border = "none"
                return
            }

            // Default
            targetSize = 36
            targetBorderRadius = 50
            magnetTarget = null
            blendMode = "difference"
            cursor.style.mixBlendMode = "difference"
            cursor.style.backgroundColor = "white"
            cursor.style.border = "none"
        }

        const onMouseLeave = () => {
            cursor.style.opacity = "0"
        }

        const onMouseEnter = () => {
            cursor.style.opacity = "1"
        }

        function animate() {
            animationId = requestAnimationFrame(animate)

            // Smooth size interpolation
            currentSize += (targetSize - currentSize) * 0.15
            currentBorderRadius += (targetBorderRadius - currentBorderRadius) * 0.15

            // Magnetic pull toward center of hovered element
            let destX = mouseX
            let destY = mouseY

            if (magnetTarget) {
                const rect = magnetTarget.getBoundingClientRect()
                const centerX = rect.left + rect.width / 2
                const centerY = rect.top + rect.height / 2

                // Pull 30% toward center of element
                destX = mouseX + (centerX - mouseX) * 0.3
                destY = mouseY + (centerY - mouseY) * 0.3
            }

            // Smooth follow
            cursorX += (destX - cursorX) * 0.14
            cursorY += (destY - cursorY) * 0.14

            const halfSize = currentSize / 2
            cursor.style.transform =
                `translate(${cursorX - halfSize}px, ${cursorY - halfSize}px)`
            cursor.style.width = `${currentSize}px`
            cursor.style.height = `${currentSize}px`
            cursor.style.borderRadius = `${currentBorderRadius}%`
        }

        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseover", onMouseOver)
        document.addEventListener("mouseleave", onMouseLeave)
        document.addEventListener("mouseenter", onMouseEnter)
        animate()

        return () => {
            cancelAnimationFrame(animationId)
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mouseover", onMouseOver)
            document.removeEventListener("mouseleave", onMouseLeave)
            document.removeEventListener("mouseenter", onMouseEnter)
        }

    }, [])

    return (
        <div
            ref={cursorRef}
            className="pointer-events-none fixed top-0 left-0 z-[999] rounded-full hidden md:block"
            style={{
                width: "36px",
                height: "36px",
                backgroundColor: "white",
                mixBlendMode: "difference",
                willChange: "transform",
                transition: "opacity 0.3s ease",
            }}
        />
    )
}

export default CursorGlow