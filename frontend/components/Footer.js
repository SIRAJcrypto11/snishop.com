'use client';

import React, { useEffect, useRef } from 'react';

export default function Footer() {
    const footerHeroRef = useRef(null);
    const glowRef = useRef(null);

    useEffect(() => {
        const footerHero = footerHeroRef.current;
        const glowElement = glowRef.current;

        if (!footerHero || !glowElement) return;

        const handleMouseMove = (e) => {
            const rect = footerHero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Move the glow element to cursor position
            glowElement.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
            glowElement.style.opacity = '1';
        };

        const handleMouseLeave = () => {
            glowElement.style.opacity = '0';
        };

        const handleTouchMove = (e) => {
            const rect = footerHero.getBoundingClientRect();
            const touch = e.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;

            glowElement.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
            glowElement.style.opacity = '1';
        };

        const handleTouchEnd = () => {
            glowElement.style.background = 'none';
            glowElement.style.opacity = '0';
        };

        footerHero.addEventListener('mousemove', handleMouseMove);
        footerHero.addEventListener('mouseleave', handleMouseLeave);
        footerHero.addEventListener('touchmove', handleTouchMove, { passive: true });
        footerHero.addEventListener('touchend', handleTouchEnd);

        return () => {
            footerHero.removeEventListener('mousemove', handleMouseMove);
            footerHero.removeEventListener('mouseleave', handleMouseLeave);
            footerHero.removeEventListener('touchmove', handleTouchMove);
            footerHero.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return (
        <footer className="footer" id="kontak">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <a href="/" className="logo">
                            <img src="/assets/logo snishop/Logo snishop biru panjang.png" alt="SNISHOP.ID" onError={(e) => e.target.src = 'https://i.ibb.co.com/MGVPZtv/20230722-162429.png'} />
                        </a>
                        <p>Platform SaaS terintegrasi untuk semua kebutuhan digital Anda. Solusi terpercaya dengan harga terjangkau.</p>
                    </div>

                    {/* Layanan */}
                    <div className="footer-section">
                        <h4 className="footer-title">Layanan</h4>
                        <div className="footer-links">
                            <a href="#edukasi">Layanan Edukasi</a>
                            <a href="#aplikasi">Aplikasi Premium</a>
                            <a href="#it">IT Services</a>
                            <a href="#">Blog & Artikel</a>
                            <a href="#ppob">PPOB & Tagihan</a>
                            <a href="#game">Topup Game</a>
                        </div>
                    </div>

                    {/* Perusahaan */}
                    <div className="footer-section">
                        <h4 className="footer-title">Perusahaan</h4>
                        <div className="footer-links">
                            <a href="#">Tentang Kami</a>
                            <a href="#harga">Harga</a>
                            <a href="#">FAQ</a>
                            <a href="#">Reseller</a>
                            <a href="#">Affiliate</a>
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="footer-section">
                        <h4 className="footer-title">Legal</h4>
                        <div className="footer-links">
                            <a href="#">Kebijakan Privasi</a>
                            <a href="#">Syarat & Ketentuan</a>
                            <a href="#">Dukungan</a>
                        </div>
                    </div>

                    {/* Kontak */}
                    <div className="footer-section">
                        <h4 className="footer-title">Kontak</h4>
                        <div className="footer-links">
                            <a href="mailto:snishopsolusinetwork@gmail.com">📧 snishopsolusinetwork@gmail.com</a>
                            <a href="https://wa.me/6285185151356" target="_blank" rel="noopener noreferrer">📱 +62 851-8515-1356</a>
                        </div>

                        <div className="social-links" style={{ marginTop: 'var(--space-md)' }}>
                            <a href="https://instagram.com/snishop.id" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                            <a href="https://facebook.com/snishop.id" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="https://wa.me/6285185151356" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    {/* Footer Hero Text with Cursor-Following Glow */}
                    <div className="footer-hero-text" id="footer-hero-text" ref={footerHeroRef}>
                        <span className="footer-hero-title">SNISHOP NETWORK</span>
                        <div className="footer-hero-glow" id="footer-hero-glow" ref={glowRef}></div>
                    </div>

                    <div className="footer-copyright">
                        <p>© {new Date().getFullYear()} SNISHOP.ID. Hak Cipta Dilindungi.</p>
                        <p>Dibuat dengan ❤️ di Indonesia</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
