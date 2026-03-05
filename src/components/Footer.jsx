function Footer() {
    return (
        <footer className="bg-[#0a0a0a] text-white/40 py-8 md:py-10 px-6" aria-label="Site footer">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
                <span className="text-xs md:text-sm">
                    © 2026 Vedang Mishra
                </span>
                <span className="text-[10px] md:text-xs text-white/20">
                    Built with React & Three.js
                </span>
            </div>
        </footer>
    )
}

export default Footer
