'use client';

import { useEffect, useRef } from 'react';

const cardsData = [
    {
        id: '01',
        title: "Cek Turnitin Premium",
        price: "Mulai Rp 9.000/cek",
        icon: "📚",
        colorClass: "blue",
        description: "Layanan cek plagiarisme terpercaya untuk skripsi, tesis, jurnal akademik, dan karya ilmiah lainnya. Menggunakan akun Turnitin Premium Instructor dengan database internasional untuk hasil yang akurat dan terpercaya.",
        features: [
            "Hasil similarity akurat 100%",
            "Laporan PDF lengkap",
            "Deteksi AI tersedia (GPT, etc)",
            "Proses cepat 1-24 jam",
            "Database internasional",
            "Garansi revisi jika ada kendala"
        ],
        ctaPrimary: { text: "Order via Website", link: "https://snicekplagiasi.base44.app/" },
        ctaSecondary: { text: "Order via WhatsApp", link: "https://wa.me/6285185151356?text=Halo,%20saya%20mau%20order%20Cek%20Turnitin" },
        pricing: [
            { label: "1x Cek Plagiasi", price: "Rp 9.000" },
            { label: "3x Cek Plagiasi", price: "Rp 25.000" },
            { label: "5x Cek Plagiasi", price: "Rp 40.000" },
            { label: "10x Cek Plagiasi", price: "Rp 81.000", highlight: true },
            { label: "Cek AI Detection", price: "Rp 35.000" },
            { label: "Cek + Parafrase AI", price: "Rp 50.000" }
        ]
    },
    {
        id: '02',
        title: "Cek Turnitin AI Detection",
        price: "Mulai Rp 35.000/cek",
        icon: "🤖",
        colorClass: "purple",
        description: "Layanan pengecekan konten AI pada dokumen menggunakan fitur AI Detection dari Turnitin. Mendeteksi apakah tulisan dihasilkan oleh AI seperti ChatGPT, Claude, atau AI lainnya.",
        features: [
            "Deteksi konten AI (ChatGPT, Claude, dll)",
            "Akurasi tinggi dari Turnitin",
            "Laporan PDF lengkap",
            "Proses cepat 1-24 jam",
            "Detail persentase AI per paragraf",
            "Garansi hasil akurat"
        ],
        ctaPrimary: { text: "Order via Website", link: "https://snicekplagiasi.base44.app/" },
        ctaSecondary: { text: "Order via WhatsApp", link: "https://wa.me/6285185151356?text=Halo,%20saya%20mau%20order%20Cek%20Turnitin%20AI" },
        pricingHeading: "🤖 Harga Cek AI Turnitin",
        pricing: [
            { label: "1x Cek AI", price: "Rp 35.000" },
            { label: "3x Cek AI", price: "Rp 90.000" },
            { label: "6x Cek AI", price: "Rp 190.000" },
            { label: "10x Cek AI (Hemat!)", price: "Rp 330.000", highlight: true }
        ]
    },
    {
        id: '03',
        title: "Cek Plagiasi GPT Zero",
        price: "Mulai Rp 15.000/cek",
        icon: "🔍",
        colorClass: "green",
        description: "Layanan cek konten AI menggunakan GPT Zero atau Zero GPT. Alternatif lebih terjangkau untuk mendeteksi tulisan yang dihasilkan AI dengan akurasi baik.",
        features: [
            "Deteksi AI dengan GPT Zero",
            "Harga lebih terjangkau",
            "Laporan hasil lengkap",
            "Proses cepat",
            "Akurasi tinggi",
            "Cocok untuk mahasiswa"
        ],
        ctaPrimary: { text: "Order via Website", link: "https://snicekplagiasi.base44.app/" },
        ctaSecondary: { text: "Order via WhatsApp", link: "https://wa.me/6285185151356?text=Halo,%20saya%20mau%20order%20Cek%20GPT%20Zero" },
        pricingHeading: "🔍 Harga Cek GPT Zero",
        pricing: [
            { label: "1x Cek AI", price: "Rp 15.000" },
            { label: "3x Cek AI", price: "Rp 35.000" },
            { label: "6x Cek AI", price: "Rp 65.000" },
            { label: "10x Cek AI (Hemat!)", price: "Rp 120.000", highlight: true }
        ]
    },
    {
        id: '04',
        title: "Canva Pro",
        price: "Mulai Rp 35.000/bulan",
        icon: "🎨",
        colorClass: "red",
        description: "Desain profesional tanpa batas dengan akses penuh ke jutaan template, elemen premium, foto, video, dan audio berkualitas tinggi. Dilengkapi fitur AI canggih seperti Magic Design dan Background Remover.",
        features: [
            "100+ Juta template premium",
            "Magic AI Tools (Design, Write, Eraser)",
            "Background Remover otomatis",
            "Brand Kit untuk konsistensi",
            "Cloud storage 1TB",
            "Export tanpa watermark"
        ],
        ctaPrimary: { text: "Order Sekarang", link: "https://snidesain.snishop.com/" },
        ctaSecondary: { text: "Lihat Detail", link: "#" }, // Placeholder link
        pricingHeading: "💰 Paket Berlangganan",
        pricing: [
            { label: "1 Bulan", price: "Rp 35.000" },
            { label: "2 Bulan (Hemat Rp 5K)", price: "Rp 65.000" },
            { label: "6 Bulan (Hemat Rp 40K)", price: "Rp 170.000" },
            { label: "1 Tahun (Hemat Rp 120K)", price: "Rp 300.000", highlight: true }
        ]
    },
    {
        id: '05',
        title: "Netflix Premium",
        price: "Mulai Rp 6.000/6jam",
        icon: "🎬",
        colorClass: "purple",
        description: "Nikmati streaming film dan series tanpa batas dengan kualitas Ultra HD 4K dan Dolby Atmos. Tersedia pilihan shared account dengan private profile hingga family plan lengkap.",
        features: [
            "Kualitas Ultra HD 4K + Dolby Atmos",
            "Private profile (PIN protected)",
            "Akses di TV, Laptop, HP, Tablet",
            "Download offline tersedia",
            "Subtitle & dubbing Indonesia",
            "Garansi akun aktif selama periode"
        ],
        ctaPrimary: { text: "Order Sekarang", link: "https://sninonton.snishop.com/" },
        ctaSecondary: { text: "Lihat Detail", link: "#" },
        pricingHeading: "💰 Paket Harga",
        pricing: [
            { label: "6 Jam", price: "Rp 6.000" },
            { label: "1 Hari", price: "Rp 9.000" },
            { label: "1 Minggu", price: "Rp 28.000" },
            { label: "2 Minggu", price: "Rp 40.000" },
            { label: "1 Bulan (Semua Device)", price: "Rp 85.000", highlight: true },
            { label: "1 Bulan Private Profile", price: "Rp 95.000" }
        ]
    },
    {
        id: '06',
        title: "Sewa Zoom Pro",
        price: "Mulai Rp 4.000/sesi",
        icon: "📹",
        colorClass: "green",
        description: "Sewa akun Zoom Meeting Pro dan Webinar untuk meeting profesional dengan kapasitas besar hingga 1000 peserta. Solusi ideal untuk rapat online, seminar, kuliah daring, dan sidang skripsi.",
        features: [
            "Kapasitas hingga 1000 peserta",
            "Cloud recording unlimited",
            "Breakout rooms tersedia",
            "Live streaming (YouTube/FB)",
            "Durasi meeting unlimited",
            "Polling & Q&A interaktif"
        ],
        ctaPrimary: { text: "Lihat Harga", link: "https://snijadwalin.snishop.com/" },
        ctaSecondary: { text: "Lihat Detail", link: "#" },
        pricingHeading: "💰 Paket Harga Zoom",
        pricing: [
            { label: "100 Peserta - 1 Jam", price: "Rp 4.000" },
            { label: "100 Peserta - 2 Jam", price: "Rp 5.000" },
            { label: "100 Peserta - 1 Hari", price: "Rp 15.000" },
            { label: "300 Peserta - 6 Jam", price: "Rp 25.000" },
            { label: "500 Peserta - 1 Hari", price: "Rp 80.000", highlight: true },
            { label: "1000 Peserta - 1 Hari", price: "Rp 125.000" }
        ]
    },
    {
        id: '07',
        title: "CapCut Pro",
        price: "Mulai Rp 35.000/bulan",
        icon: "🎬",
        colorClass: "purple",
        description: "Aplikasi edit video profesional dengan fitur lengkap. Akun resmi CapCut tanpa watermark, efek & filter premium, musik lengkap, dan export video hingga 4K.",
        features: [
            "Akun resmi CapCut",
            "Tanpa watermark",
            "Efek & filter premium",
            "Musik & sound effect lengkap",
            "Export video hingga 4K",
            "1 akun login 1 device"
        ],
        ctaPrimary: { text: "Order Sekarang", link: "https://wa.me/6285185151356?text=Halo,%20saya%20mau%20order%20CapCut%20Pro" },
        ctaSecondary: { text: "Lihat Detail", link: "#" },
        pricingHeading: "💰 Paket Berlangganan",
        pricing: [
            { label: "1 Bulan", price: "Rp 35.000" },
            { label: "3 Bulan (Promo)", price: "Rp 99.000" },
            { label: "6 Bulan (Promo)", price: "Rp 192.000" },
            { label: "12 Bulan (Promo)", price: "Rp 360.000", highlight: true }
        ]
    },
    {
        id: '08',
        title: "TopUp Game",
        price: "Harga Termurah!",
        icon: "🎮",
        colorClass: "orange",
        description: "Top up diamond dan UC untuk 100+ game populer seperti Mobile Legends, Free Fire, PUBG Mobile dan lainnya. Proses instan, aman, dan legal dengan harga terbaik.",
        features: [
            "Mobile Legends Bang Bang",
            "Free Fire & FF Max",
            "PUBG Mobile & PUBG New State",
            "Genshin Impact",
            "Proses instan 1-5 menit",
            "100+ game lainnya"
        ],
        ctaPrimary: { text: "Order Sekarang", link: "https://www.snishopgame.biz.id/" },
        ctaSecondary: { text: "Lihat Semua Game", link: "#" },
        pricingHeading: "💎 Harga Mobile Legends",
        pricing: [
            { label: "Weekly Diamond Pass", price: "Rp 29.272", highlight: true },
            { label: "128 Diamonds (117+11)", price: "Rp 36.214" },
            { label: "148 Diamonds (134+14)", price: "Rp 41.388" },
            { label: "170 Diamonds (154+16)", price: "Rp 46.920" },
            { label: "Twilight Pass", price: "Rp 152.812" }
        ]
    },
    {
        id: '09',
        title: "Gemini Pro Advanced",
        price: "Mulai Rp 30.000/bulan",
        icon: "🤖",
        colorClass: "blue",
        description: "AI Google terkuat dengan kemampuan reasoning canggih. Bisa edit & run code Python, upload gambar, PDF, Google Docs. Bonus 2TB Google One storage dan akses VEO3.",
        features: [
            "Gemini Pro aktif 1 tahun",
            "Akun private (garansi)",
            "Bisa edit & run code Python",
            "Upload gambar, PDF, Google Docs",
            "Tambahan 2TB Google One",
            "Akses Open VEO3"
        ],
        ctaPrimary: { text: "Order Sekarang", link: "https://wa.me/6285185151356?text=Halo,%20saya%20mau%20order%20Gemini%20Pro%20Advanced" },
        ctaSecondary: { text: "Lihat Detail", link: "#" },
        pricingHeading: "💰 Paket Sharing (3 User)",
        pricing: [
            { label: "1 Bulan", price: "Rp 30.000" },
            { label: "3 Bulan", price: "Rp 50.000" },
            { label: "6 Bulan", price: "Rp 70.000" },
            { label: "12 Bulan", price: "Rp 100.000", highlight: true },
            { label: "Private 1 Bulan", price: "Rp 60.000" },
            { label: "Private 12 Bulan", price: "Rp 170.000" }
        ]
    },
    {
        id: '10',
        title: "Microsoft 365",
        price: "Rp 50.000 Lifetime",
        icon: "📊",
        colorClass: "yellow",
        description: "Suite produktivitas lengkap dengan Word, Excel, PowerPoint, Outlook, dan cloud storage OneDrive 1TB. Garansi lifetime hingga 3 tahun dengan custom nama akun.",
        features: [
            "Lifetime (maks 3 tahun)",
            "Install di 5 device",
            "OneDrive 1TB storage",
            "Custom nama akun",
            "Word, Excel, PowerPoint",
            "Outlook & Teams included"
        ],
        ctaPrimary: { text: "Order Sekarang", link: "https://wa.me/6285185151356?text=Halo,%20saya%20mau%20Langganan%20Microsoft%20365" },
        ctaSecondary: { text: "Lihat Detail", link: "#" },
        pricingHeading: "💰 Paket Microsoft 365",
        pricing: [
            { label: "Lifetime (3 Tahun)", price: "Rp 50.000", highlight: true },
            { label: "Akun Custom Nama", price: "+Rp 10.000" }
        ]
    }
];

export default function StackingCards() {
    return (
        <section className="stacking-section section-reveal" id="featured-services">
            <div className="container">
                <div className="stacking-section-header">
                    <h2 className="gradient-text reveal-item">Layanan Unggulan</h2>
                    <p className="reveal-item">Solusi digital terpercaya untuk kebutuhan Anda</p>
                </div>

                <div className="stacking-cards-container">
                    <div className="stacking-cards-list">
                        {cardsData.map((card, index) => (
                            <div
                                key={card.id}
                                className="stacking-card"
                                data-index={index + 1}
                                style={{ '--index': index }}
                            >
                                <div className="stacking-card-header">
                                    <div className={`stacking-card-icon ${card.colorClass}`}>{card.icon}</div>
                                    <div className="stacking-card-info">
                                        <h3 className="stacking-card-title">{card.title}</h3>
                                        <div className="stacking-card-price">{card.price}</div>
                                    </div>
                                </div>

                                <div className="stacking-card-body">
                                    <div className="stacking-card-content">
                                        <p className="stacking-card-desc">{card.description}</p>

                                        <ul className="stacking-card-features">
                                            {card.features.map((feature, i) => (
                                                <li key={i}>
                                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                    </svg>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="stacking-card-cta">
                                            <a href={card.ctaPrimary.link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                                {card.ctaPrimary.text}
                                            </a>
                                            <a href={card.ctaSecondary.link} className="btn btn-secondary">
                                                {card.ctaSecondary.text}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="stacking-card-pricing-panel">
                                        <h4>{card.pricingHeading || "💰 Daftar Harga"}</h4>
                                        <div className="pricing-table">
                                            {card.pricing.map((item, i) => (
                                                <div key={i} className={`pricing-row ${item.highlight ? 'highlight' : ''}`}>
                                                    <span className="label">{item.label}</span>
                                                    <span className="price">{item.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
