function Contact() {

    return (
        <section
            id="contact"
            className="fade-section bg-white text-black py-20 md:py-32 px-6 border-t border-black/5"
        >
            <div className="max-w-5xl mx-auto">

                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
                    Let's Connect
                </h2>

                <p className="mt-6 md:mt-8 text-base md:text-xl text-black/50 max-w-xl leading-relaxed">
                    Have a project in mind or just want to say hello?
                    I'm always open to new ideas and collaborations.
                </p>

                <div className="mt-10 md:mt-12 space-y-4 md:space-y-5">
                    <a
                        href="mailto:2430246@kiit.ac.in"
                        className="block text-lg sm:text-xl md:text-2xl font-medium text-black hover:text-black/60 transition-all duration-300 group link-hover"
                    >
                        2430246@kiit.ac.in
                        <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">↗</span>
                    </a>

                    <a
                        href="https://github.com/Vedangm005"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-lg sm:text-xl md:text-2xl font-medium text-black hover:text-black/60 transition-all duration-300 group link-hover"
                    >
                        github.com/Vedangm005
                        <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">↗</span>
                    </a>
                </div>

            </div>
        </section>
    )
}

export default Contact