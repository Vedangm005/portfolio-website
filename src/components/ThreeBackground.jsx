import { useEffect, useRef } from "react"
import * as THREE from "three"

function ThreeBackground() {

    const mountRef = useRef(null)

    useEffect(() => {

        const mount = mountRef.current
        if (!mount) return

        // ───── Scene ─────

        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(
            60,
            1,
            0.1,
            100
        )

        camera.position.z = 5


        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        })


        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2)
        )


        mount.appendChild(renderer.domElement)



        // ───── Correct Canvas Size ─────

        function setSize() {

            const width = mount.clientWidth
            const height = mount.clientHeight

            renderer.setSize(width, height)

            camera.aspect = width / height
            camera.updateProjectionMatrix()

        }

        setSize()



        // ───── Mouse Interaction ─────

        const mouse = {
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0
        }

        const onMouseMove = (e) => {

            mouse.targetX =
                (e.clientX / window.innerWidth - 0.5) * 2

            mouse.targetY =
                (e.clientY / window.innerHeight - 0.5) * 2

        }

        window.addEventListener(
            "mousemove",
            onMouseMove
        )



        // ───── Particle Texture ─────

        const canvas =
            document.createElement("canvas")

        canvas.width = 32
        canvas.height = 32

        const ctx =
            canvas.getContext("2d")

        ctx.beginPath()
        ctx.arc(16, 16, 15, 0, Math.PI * 2)
        ctx.fillStyle = "white"
        ctx.fill()

        const texture =
            new THREE.CanvasTexture(canvas)



        // ───── Particles ─────

        const COUNT = 220

        const base =
            new Float32Array(COUNT * 3)

        const pos =
            new Float32Array(COUNT * 3)

        const vel =
            new Float32Array(COUNT * 3)


        const spreadX = 14
        const spreadY = 8
        const spreadZ = 6


        for (let i = 0; i < COUNT; i++) {

            const i3 = i * 3

            base[i3] = (Math.random() - 0.5) * spreadX
            base[i3 + 1] = (Math.random() - 0.5) * spreadY
            base[i3 + 2] = (Math.random() - 0.5) * spreadZ

            pos[i3] = base[i3]
            pos[i3 + 1] = base[i3 + 1]
            pos[i3 + 2] = base[i3 + 2]

            vel[i3] = (Math.random() - 0.5) * 0.005
            vel[i3 + 1] = (Math.random() - 0.5) * 0.005
            vel[i3 + 2] = (Math.random() - 0.5) * 0.005

        }


        const geometry =
            new THREE.BufferGeometry()

        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(pos, 3)
        )


        const material =
            new THREE.PointsMaterial({

                color: 0xffffff,

                size: 0.04,

                map: texture,

                transparent: true,

                opacity: 0.6,

                depthWrite: false,

                blending:
                    THREE.AdditiveBlending

            })


        const points =
            new THREE.Points(
                geometry,
                material
            )

        scene.add(points)



        // ───── Lines ─────

        const maxConnections =
            COUNT * 3


        const linePositions =
            new Float32Array(
                maxConnections * 6
            )


        const lineColors =
            new Float32Array(
                maxConnections * 6
            )


        const lineGeo =
            new THREE.BufferGeometry()

        lineGeo.setAttribute(
            "position",
            new THREE.BufferAttribute(
                linePositions,
                3
            )
        )


        lineGeo.setAttribute(
            "color",
            new THREE.BufferAttribute(
                lineColors,
                3
            )
        )


        const lineMat =
            new THREE.LineBasicMaterial({

                vertexColors: true,

                transparent: true,

                opacity: 0.5,

                blending:
                    THREE.AdditiveBlending,

                depthWrite: false

            })


        const lines =
            new THREE.LineSegments(
                lineGeo,
                lineMat
            )

        scene.add(lines)



        // ───── Resize ─────

        window.addEventListener(
            "resize",
            setSize
        )



        // ───── Animation ─────

        let animationId


        function animate() {

            animationId =
                requestAnimationFrame(
                    animate
                )


            // Smooth mouse

            mouse.x += (mouse.targetX - mouse.x) * 0.12
            mouse.y += (mouse.targetY - mouse.y) * 0.12


            let index = 0


            for (let i = 0; i < COUNT; i++) {

                const i3 = i * 3


                base[i3] += vel[i3]
                base[i3 + 1] += vel[i3 + 1]
                base[i3 + 2] += vel[i3 + 2]


                if (base[i3] > spreadX / 2) base[i3] = -spreadX / 2
                if (base[i3] < -spreadX / 2) base[i3] = spreadX / 2

                if (base[i3 + 1] > spreadY / 2) base[i3 + 1] = -spreadY / 2
                if (base[i3 + 1] < -spreadY / 2) base[i3 + 1] = spreadY / 2

                if (base[i3 + 2] > spreadZ / 2) base[i3 + 2] = -spreadZ / 2
                if (base[i3 + 2] < -spreadZ / 2) base[i3 + 2] = spreadZ / 2


                pos[i3] = base[i3]
                pos[i3 + 1] = base[i3 + 1]
                pos[i3 + 2] = base[i3 + 2]

            }


            geometry.attributes.position.needsUpdate = true



            const p = geometry.attributes.position.array


            for (let i = 0; i < COUNT; i++) {

                const ix = p[i * 3]
                const iy = p[i * 3 + 1]
                const iz = p[i * 3 + 2]


                for (let j = i + 1; j < COUNT; j++) {

                    const jx = p[j * 3]
                    const jy = p[j * 3 + 1]
                    const jz = p[j * 3 + 2]


                    const dx = ix - jx
                    const dy = iy - jy
                    const dz = iz - jz

                    const dist =
                        Math.sqrt(dx * dx + dy * dy + dz * dz)


                    if (dist < 1.6 && index < maxConnections) {

                        const alpha =
                            1 - dist / 1.6


                        const li = index * 6


                        linePositions[li] = ix
                        linePositions[li + 1] = iy
                        linePositions[li + 2] = iz

                        linePositions[li + 3] = jx
                        linePositions[li + 4] = jy
                        linePositions[li + 5] = jz


                        lineColors[li] = alpha * 0.4
                        lineColors[li + 1] = alpha * 0.4
                        lineColors[li + 2] = alpha * 0.4

                        lineColors[li + 3] = alpha * 0.4
                        lineColors[li + 4] = alpha * 0.4
                        lineColors[li + 5] = alpha * 0.4


                        index++

                    }

                }

            }


            lineGeo.setDrawRange(0, index * 2)

            lineGeo.attributes.position.needsUpdate = true
            lineGeo.attributes.color.needsUpdate = true



            // Strong Mouse Motion

            camera.position.x += (mouse.x * 2.0 - camera.position.x) * 0.09
            camera.position.y += (-mouse.y * 1.4 - camera.position.y) * 0.09


            camera.lookAt(0, 0, 0)



            renderer.render(
                scene,
                camera
            )

        }


        animate()



        return () => {

            cancelAnimationFrame(animationId)

            window.removeEventListener(
                "mousemove",
                onMouseMove
            )

            window.removeEventListener(
                "resize",
                setSize
            )

            renderer.dispose()

            geometry.dispose()
            material.dispose()

            lineGeo.dispose()
            lineMat.dispose()

            texture.dispose()


            if (mount.contains(
                renderer.domElement
            )) {

                mount.removeChild(
                    renderer.domElement
                )

            }

        }


    }, [])



    return (

        <div
            ref={mountRef}
            className="absolute inset-0"
            style={{
                background: "#020202",
                zIndex: 0
            }}
        />

    )

}

export default ThreeBackground