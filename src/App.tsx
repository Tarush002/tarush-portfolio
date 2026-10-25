import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Research from "./components/Research";
import Capabilities from "./components/Capabilities";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        SKIP TO CONTENT
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Research />
        <Capabilities />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
