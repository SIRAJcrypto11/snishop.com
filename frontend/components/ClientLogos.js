
import React from "react";

export default function ClientLogos() {
    const logos = [
        { name: "Blimozza", src: "/assets/client/Blimozza.jpg", url: "https://www.instagram.com/blimozza.id/" },
        { name: "Peuy Batik", src: "/assets/client/peuy batik.jpg", url: "http://instagram.com/peuybatik/" },
        { name: "Taksi Abang", src: "/assets/client/Taksi Abang.jpg", url: "https://www.instagram.com/taksiabang.official/" },
        { name: "Jamu Kito", src: "/assets/client/Jamu Kito Internasional.jpg", url: "https://www.instagram.com/jamukitointernasional/" },
        { name: "Kerupuk Keite", src: "/assets/client/Kerupuk Keite.jpeg", url: "https://www.instagram.com/kerupukkeitekaur.official/" },
        { name: "Cryptocurrent", src: "/assets/client/Cryptocurrent.jpg", url: "https://www.instagram.com/cryptocurrent.id/" },
        { name: "Soluze", src: "/assets/client/Soluze.jpg", url: "https://www.instagram.com/soluze.id/" },
        { name: "Cotrade", src: "/assets/client/Cotrade.jpg", url: "https://www.instagram.com/cotrade_id/" },
    ];

    return (
        <section className="client-slider-section">
            <p className="client-slider-title">Dipercaya oleh Berbagai Bisnis</p>
            <div className="client-slider-wrapper">
                <div className="client-slider-track">
                    {logos.map((logo, index) => (
                        <a key={index} href={logo.url} target="_blank" className="client-logo-item" title={logo.name}>
                            <img src={logo.src} alt={logo.name} />
                        </a>
                    ))}
                    {/* Duplicate for infinite loop */}
                    {logos.map((logo, index) => (
                        <a key={`dup-${index}`} href={logo.url} target="_blank" className="client-logo-item" title={logo.name}>
                            <img src={logo.src} alt={logo.name} />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
