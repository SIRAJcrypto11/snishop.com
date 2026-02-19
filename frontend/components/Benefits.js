import React from "react";

export default function Benefits() {
    const benefits = [
        {
            title: "Terpercaya",
            text: "Ribuan pelanggan telah mempercayai layanan kami sejak 2020.",
            icon: (
                <svg viewBox="0 0 24 24" fill="#34A853" width="48" height="48">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
            )
        },
        {
            title: "Proses Cepat",
            text: "Layanan diproses dalam hitungan menit, bukan jam atau hari.",
            icon: (
                <svg viewBox="0 0 24 24" fill="#4285F4" width="48" height="48">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
            )
        },
        {
            title: "Kualitas Premium",
            text: "Hanya menyediakan layanan berkualitas tinggi dari provider terpercaya.",
            icon: (
                <svg viewBox="0 0 24 24" fill="#FBBC04" width="48" height="48">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            )
        },
        {
            title: "Support 24/7",
            text: "Tim customer service siap membantu Anda kapan saja, di mana saja.",
            icon: (
                <svg viewBox="0 0 24 24" fill="#EA4335" width="48" height="48">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                </svg>
            )
        }
    ];

    return (
        <section className="section bg-surface">
            <div className="container">
                <div className="text-center mb-4">
                    <h2 className="fade-in">Mengapa Memilih SNISHOP.ID?</h2>
                </div>

                <div className="grid grid-4 mt-4">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="card text-center fade-in">
                            <div className="card-icon" style={{ margin: "0 auto 16px" }}>
                                {benefit.icon}
                            </div>
                            <h4>{benefit.title}</h4>
                            <p className="card-text">{benefit.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
