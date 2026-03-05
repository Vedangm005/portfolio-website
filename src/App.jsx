import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Marquee from "./components/Marquee"
import About from "./components/About"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Loader from "./components/Loader"
import CursorGlow from "./components/CursorGlow"
import ScrollProgress from "./components/ScrollProgress"
import useScrollFade from "./hooks/useScrollFade"
import { motion } from "framer-motion"

const sectionFade = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

function App() {

  useScrollFade()

  return (
    <>
      <Loader />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <Hero />

      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <Marquee />
      </motion.div>

      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <About />
      </motion.div>

      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <Projects />
      </motion.div>

      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <Contact />
      </motion.div>

      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <Footer />
      </motion.div>
    </>
  )
}

export default App