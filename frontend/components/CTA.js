import React from 'react';

export default function CTA() {
    return (
        <section className="section bg-primary" style={{ color: 'white' }}>
            <div className="container text-center">
                <h2 className="fade-in" style={{ color: 'white' }}>Siap Memulai?</h2>
                <p className="fade-in"
                    style={{ maxWidth: '600px', margin: 'var(--space-md) auto var(--space-xl)', color: 'rgba(255,255,255,0.9)' }}>
                    Bergabunglah dengan ribuan pelanggan yang telah mempercayai SNISHOP.ID untuk kebutuhan digital mereka.
                </p>
                <div className="fade-in">
                    <a href="layanan.html" className="btn btn-lg" style={{ background: 'white', color: 'var(--primary)' }}>Mulai
                        Sekarang</a>
                    <a href="https://wa.me/6285185151356" className="btn btn-lg"
                        style={{ background: 'transparent', color: 'white', border: '2px solid white', marginLeft: 'var(--space-md)' }}
                        target="_blank" rel="noopener noreferrer">Hubungi Kami</a>
                </div>
            </div>
        </section>
    );
}
