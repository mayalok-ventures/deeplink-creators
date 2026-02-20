import Link from 'next/link'

export default function NotFound() {
    return (
        <section className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 grid-bg" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C39A2B]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center px-4">
                <h1 className="text-8xl md:text-9xl font-extrabold font-heading bg-gradient-to-r from-[#B87A14] to-[#E0C27A] bg-clip-text text-transparent mb-4">
                    404
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-heading mb-4">
                    Page Not Found
                </h2>
                <p className="text-paragraph text-lg mb-8 max-w-md mx-auto">
                    The page you&apos;re looking for doesn&apos;t exist or has been removed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="btn-primary inline-flex items-center justify-center gap-2"
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/contact"
                        className="bg-[#F4F5F6] border border-[#4A4A4A]/15 text-heading font-semibold py-3 px-6 rounded-lg hover:bg-[#F4F5F6]/80 hover:border-[#C39A2B]/30 transition-all inline-flex items-center justify-center"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </section>
    )
}
