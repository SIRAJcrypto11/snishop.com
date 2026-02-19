
import React from "react";

export default function FeaturesMarquee() {
    const features = [
        "Layanan Edukasi Premium",
        "Aplikasi AI Terlengkap",
        "Keamanan Data Terjamin",
        "Proses Cepat & Mudah",
        "Dukungan 24/7",
        "Harga Terjangkau"
    ];

    return (
        <section className="features-marquee">
            <div className="marquee-track">
                {features.map((feature, index) => (
                    <div key={index} className="marquee-item">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                        <span>{feature}</span>
                    </div>
                ))}
                {/* Duplicate for infinite loop */}
                {features.map((feature, index) => (
                    <div key={`dup-${index}`} className="marquee-item">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                        <span>{feature}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
