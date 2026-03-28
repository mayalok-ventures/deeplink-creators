'use client'

const technologies = [
    { src: '/images/strategy/reactnative.png', alt: 'React Native' },
    { src: '/images/strategy/nextjs.png', alt: 'Next.js' },
    { src: '/images/strategy/angular.png', alt: 'Angular' },
    { src: '/images/strategy/vue.png', alt: 'Vue.js' },
    { src: '/images/strategy/nodejs.png', alt: 'Node.js' },
    { src: '/images/strategy/python-logo.png', alt: 'Python' },
    { src: '/images/strategy/django.png', alt: 'Django' },
    { src: '/images/strategy/php.png', alt: 'PHP' },
    { src: '/images/strategy/ruby.png', alt: 'Ruby' },
    { src: '/images/strategy/js.png', alt: 'JavaScript' },
    { src: '/images/strategy/HTML.png', alt: 'HTML' },
    { src: '/images/strategy/css.png', alt: 'CSS' },
    { src: '/images/strategy/mongo-db.png', alt: 'MongoDB' },
    { src: '/images/strategy/my-sql.png', alt: 'MySQL' },
    { src: '/images/strategy/postgresql.png', alt: 'PostgreSQL' },
    { src: '/images/strategy/wordpress.png', alt: 'WordPress' },
    { src: '/images/strategy/shopify.png', alt: 'Shopify' },
    { src: '/images/strategy/wix.png', alt: 'Wix' },
]

export default function TechStack() {
    return (
        <section className="py-12 bg-[#FAFAF8] relative overflow-hidden">
            <div className="container-custom mb-6">
                <h2 className="text-xl md:text-2xl font-extrabold font-heading text-center text-heading">
                    Our Latest <span className="text-[#C39A2B]">Technologies</span>
                </h2>
                <p className="text-sm text-paragraph text-center mt-2 max-w-lg mx-auto">
                    Powering your digital growth with cutting-edge frameworks, databases & platforms
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {['Frontend', 'Backend', 'Databases', 'CMS & Platforms'].map(cat => (
                        <span key={cat} className="text-xs font-medium px-3 py-0.5 rounded-full bg-[#0F1112]/5 text-[#0F1112] border border-[#E8E6E1]">
                            {cat}
                        </span>
                    ))}
                </div>
            </div>

            <div
                className="relative select-none"
                onContextMenu={(e) => e.preventDefault()}
            >
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FAFAF8] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FAFAF8] to-transparent z-10 pointer-events-none" />

                <div className="flex animate-marquee-tech transform-gpu">
                    {[...technologies, ...technologies].map((t, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 mx-6 md:mx-9 flex items-center justify-center"
                        >
                            <img
                                src={t.src}
                                alt={t.alt}
                                className="h-7 md:h-10 w-auto object-contain pointer-events-none transition-all duration-300"
                                draggable={false}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
