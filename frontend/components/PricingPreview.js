import React from 'react';

export default function PricingPreview() {
    return (
        <section className="section bg-white" id="harga">
            <div className="container">
                <div className="text-center mb-4">
                    <h2 className="fade-in">Harga Layanan SNISHOP</h2>
                    <p className="fade-in">Harga transparan per layanan, bayar sesuai kebutuhan Anda.</p>
                </div>

                <div className="pricing-grid stagger mt-4">
                    {/* Edukasi */}
                    <div className="pricing-card">
                        <h3 className="pricing-name">📚 Cek Turnitin</h3>
                        <div className="pricing-price">Rp 9K</div>
                        <div className="pricing-period">per 1 kali cek</div>
                        <ul className="pricing-features">
                            <li>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                <span>Basic: 1x Rp9K | 10x Rp81K</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                <span>AI Check: 1x Rp35K | 10x Rp330K</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                <span>Hasil lengkap + Laporan PDF</span>
                            </li>
                        </ul>
                        <a href="https://wa.me/6285185151356?text=Halo,%20saya%20mau%20order%20Cek%20Turnitin"
                            className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Order via WA</a>
                    </div>

                    {/* Canva Pro */}
                    <div className="pricing-card featured">
                        <h3 className="pricing-name">🎨 Canva Pro</h3>
                        <div className="pricing-price">Rp 2K</div>
                        <div className="pricing-period">per 1 jam akses</div>
                        <ul className="pricing-features">
                            <li>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                <span>1 Jam: Rp2K | 1 Hari: Rp5K</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                <span>1 Bulan: Rp12K - Rp25K</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                <span>Akses semua fitur premium</span>
                            </li>
                        </ul>
                        <a href="https://snidesain.snishop.com/" className="btn btn-primary" target="_blank" rel="noopener noreferrer">Order Sekarang</a>
                    </div>

                    {/* Netflix */}
                    <div className="pricing-card">
                        <h3 className="pricing-name">🎬 Netflix Premium</h3>
                        <div className="pricing-price">Rp 6K</div>
                        <div className="pricing-period">per 6 jam</div>
                        <ul className="pricing-features">
                            <li>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                <span>6 Jam: Rp6K | 1 Hari: Rp9K</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                <span>1 Minggu: Rp28K | 1 Bulan: Rp60K</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                <span>Private Profile tersedia</span>
                            </li>
                        </ul>
                        <a href="https://sninonton.snishop.com/" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Order Sekarang</a>
                    </div>

                    {/* Zoom */}
                    <div className="pricing-card">
                        <h3 className="pricing-name">📹 Sewa Zoom Pro</h3>
                        <div className="pricing-price">Sewa</div>
                        <div className="pricing-period">per jam / hari</div>
                        <ul className="pricing-features">
                            <li>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                <span>100-1000 Peserta</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                <span>Live Stream, Cloud Recording</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                <span>Breakout Room, Polling</span>
                            </li>
                        </ul>
                        <a href="https://snijadwalin.snishop.com/" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Lihat Harga</a>
                    </div>
                </div>

                {/* Quick Price Table */}
                <div className="text-center mt-4 fade-in"
                    style={{ background: 'var(--surface)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)' }}>
                    <h3 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.25rem' }}>💰 Harga Cepat Layanan Lainnya</h3>
                    <div className="quick-price-grid">
                        <div className="quick-price-item">
                            <span className="quick-price-icon">📊</span>
                            <span className="quick-price-name">Microsoft 365</span>
                            <span className="quick-price-value">Rp 50K Lifetime</span>
                        </div>
                        <div className="quick-price-item">
                            <span className="quick-price-icon">🤖</span>
                            <span className="quick-price-name">ChatGPT Plus</span>
                            <span className="quick-price-value">Rp 35K/bulan</span>
                        </div>
                        <div className="quick-price-item">
                            <span className="quick-price-icon">🎵</span>
                            <span className="quick-price-name">Spotify Premium</span>
                            <span className="quick-price-value">Rp 15K/bulan</span>
                        </div>
                        <div className="quick-price-item">
                            <span className="quick-price-icon">✂️</span>
                            <span className="quick-price-name">CapCut Pro</span>
                            <span className="quick-price-value">Rp 35K/bulan</span>
                        </div>
                        <div className="quick-price-item">
                            <span className="quick-price-icon">🔍</span>
                            <span className="quick-price-name">GPT Zero AI</span>
                            <span className="quick-price-value">Rp 15K/cek</span>
                        </div>
                        <div className="quick-price-item">
                            <span className="quick-price-icon">🖥️</span>
                            <span className="quick-price-name">Web Hosting</span>
                            <span className="quick-price-value">Rp 50K/tahun</span>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <a href="layanan.html" className="btn btn-text">Lihat Semua Layanan & Harga →</a>
                </div>
            </div>
        </section>
    );
}
