
import React from "react";

export default function Stats() {
    const stats = [
        { label: "Pelanggan Aktif", value: "10,000+", icon: "path_d_here" }, // Simplified icon for brevity
        { label: "Transaksi Selesai", value: "50,000+", icon: "path_d_here" },
        { label: "Rating Pelanggan", value: "4.9/5", icon: "path_d_here" },
        { label: "Support 24/7", value: "Ready", icon: "path_d_here" },
    ];

    return (
        <section className="stats-section section bg-surface">
            <div className="container">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item reveal-scale">
                            <div className="stat-number">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
