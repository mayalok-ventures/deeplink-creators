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
        <section className="py-12 bg-[#F4F5F6] dark:bg-[#131415] relative overflow-hidden">
            <div className="container-custom mb-8">
                <h2 className="text-xl md:text-2xl font-extrabold font-heading text-center text-heading">
                    Our Latest <span className="text-[#C39A2B]">Technologies</span>
                </h2>
            </div>

            <div
                className="relative select-none"
                onContextMenu={(e) => e.preventDefault()}
            >
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F4F5F6] dark:from-[#131415] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F4F5F6] dark:from-[#131415] to-transparent z-10 pointer-events-none" />

                <div className="flex animate-marquee-tech">
                    {[...technologies, ...technologies].map((t, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 mx-6 md:mx-9 flex items-center justify-center"
                        >
                            <img
                                src={t.src}
                                alt={t.alt}
                                className="h-7 md:h-10 w-auto object-contain pointer-events-none grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
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
