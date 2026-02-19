import React from "react";

export default function Services() {
    const services = [
        {
            title: "Layanan Edukasi",
            text: "Cek Turnitin, Parafrase Manual, dan konsultasi akademik profesional untuk kebutuhan pendidikan Anda.",
            icon: (
                <svg viewBox="0 0 24 24" fill="#4285F4" width="48" height="48">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                </svg>
            ),
            link: "layanan.html#edukasi"
        },
        {
            title: "Aplikasi Premium",
            text: "ChatGPT Plus, Canva Pro, Zoom Premium, Microsoft 365, dan berbagai aplikasi produktivitas lainnya.",
            icon: (
                <svg viewBox="0 0 24 24" fill="#EA4335" width="48" height="48">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />
                </svg>
            ),
            link: "layanan.html#aplikasi"
        },
        {
            title: "IT Services",
            text: "Web Development, Hosting, Domain, dan solusi IT profesional untuk bisnis Anda.",
            icon: (
                <svg viewBox="0 0 24 24" fill="#34A853" width="48" height="48">
                    <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
                </svg>
            ),
            link: "layanan.html#it"
        },
        {
            title: "PPOB & Tagihan",
            text: "Bayar pulsa, paket data, token PLN, BPJS, dan berbagai tagihan lainnya dengan mudah.",
            icon: (
                <svg viewBox="0 0 24 24" fill="#FBBC04" width="48" height="48">
                    <path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14z" />
                </svg>
            ),
            link: "layanan.html#ppob"
        },
        {
            title: "Topup Game",
            text: "Voucher game untuk Mobile Legends, Free Fire, PUBG, Genshin Impact, dan game populer lainnya.",
            icon: (
                <svg viewBox="0 0 24 24" fill="#9334E6" width="48" height="48">
                    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
            ),
            link: "layanan.html#game"
        },
        {
            title: "Program Kemitraan",
            text: "Bergabung sebagai Reseller atau Affiliate dan dapatkan penghasilan dari setiap transaksi.",
            icon: (
                <svg viewBox="0 0 24 24" fill="#FF7700" width="48" height="48">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
            ),
            link: "reseller.html"
        }
    ];

    return (
        <section className="section bg-surface" id="layanan">
            <div className="container">
                <div className="text-center mb-4">
                    <h2 className="fade-in">Semua yang Anda Butuhkan, dalam Satu Platform</h2>
                    <p className="fade-in" style={{ maxWidth: "600px", margin: "0 auto" }}>
                        Dari layanan edukasi hingga solusi bisnis digital, SNISHOP.ID menyediakan semua yang Anda butuhkan.
                    </p>
                </div>

                <div className="grid grid-3 mt-4">
                    {services.map((service, index) => (
                        <div key={index} className="card fade-in">
                            <div className="card-icon">
                                {service.icon}
                            </div>
                            <h3 className="card-title">{service.title}</h3>
                            <p className="card-text">{service.text}</p>
                            <a href={service.link} className="btn btn-text">Pelajari Lebih Lanjut →</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
