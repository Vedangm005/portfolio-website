import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Marquee from "./components/Marquee"
import About from "./components/About"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Loader from "./components/Loader"
import CursorGlow from "./components/CursorGlow"
import useScrollFade from "./hooks/useScrollFade"

function App() {

  useScrollFade()

  return (
    <>
      <Loader />
      <CursorGlow />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}

export default App