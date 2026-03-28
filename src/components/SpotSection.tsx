'use client'

const platforms = [
    { src: '/spot/google-ads.png', alt: 'Google Ads' },
    { src: '/spot/facebook-ads.png', alt: 'Facebook Ads' },
    { src: '/spot/instagram-ads.png', alt: 'Instagram Ads' },
    { src: '/spot/youtube-ads.png', alt: 'YouTube Ads' },
    { src: '/spot/meta-ads.png', alt: 'Meta Ads' },
    { src: '/spot/linkedin-ads.png', alt: 'LinkedIn Ads' },
    { src: '/spot/bing-ads.png', alt: 'Bing Ads' },
    { src: '/spot/apple-ads.png', alt: 'Apple Ads' },
]

export default function SpotSection() {
    return (
        <section className="py-16 bg-white relative overflow-hidden">
            <div className="container-custom mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-center text-heading">
                    Spot Your Business with
                </h2>
            </div>

            <div
                className="relative select-none"
                onContextMenu={(e) => e.preventDefault()}
            >
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="flex animate-marquee transform-gpu">
                    {[...platforms, ...platforms].map((p, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center"
                        >
                            <img
                                src={p.src}
                                alt={p.alt}
                                className="h-10 md:h-14 w-auto object-contain pointer-events-none"
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
