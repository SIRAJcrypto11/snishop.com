
"use client";
import React from "react";
import PresaleWidget from "./PresaleWidget";

export default function Hero() {
    return (
        <section className="hero">
            <div className="container">
                <div className="hero-inner">

                    {/* Left Content */}
                    <div className="hero-content fade-in">
                        <h1 className="hero-title">Platform Digital Terpercaya untuk Bisnis Anda</h1>
                        <p className="hero-text">
                            Semua layanan digital yang Anda butuhkan dalam satu platform. Dari edukasi, aplikasi premium,
                            hingga solusi IT - semuanya dengan harga terjangkau dan dukungan 24/7.
                        </p>
                        <div className="hero-actions">
                            <a href="#layanan" className="btn btn-primary btn-lg">Jelajahi Layanan</a>
                            <a href="https://wa.me/6285185151356?text=Halo%20SNISHOP.ID,%20saya%20ingin%20konsultasi"
                                className="btn btn-secondary btn-lg" target="_blank">Konsultasi Gratis</a>
                        </div>
                    </div>

                    {/* Right Content - Visual with Presale Widget */}
                    <div className="hero-visual fade-in">

                        {/* Ambient Glow */}
                        <div className="hero-glow"></div>

                        {/* Background Floating Icons Grid */}
                        <div className="floating-icons-grid">
                            <div className="floating-icon icon-1" style={{ '--delay': '0s' }}>
                                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e711957c86e922f92ad49f/a236b74f4_Logosnishopbirupanjang.png" alt="ERP" />
                            </div>
                            <div className="floating-icon icon-2" style={{ '--delay': '1.2s' }}>
                                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688a42916670b89e7b51038c/de7e35572_logo.png" alt="TODOIT" />
                            </div>
                            <div className="floating-icon icon-3" style={{ '--delay': '2.5s' }}>
                                <img src="https://i.ibb.co.com/MGVPZtv/20230722-162429.png" alt="Turnitin" />
                            </div>

                            <div className="floating-icon icon-4" style={{ '--delay': '3.8s' }}>
                                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/cae5a7a92_logo.png" alt="Budgy" />
                            </div>
                            <div className="floating-icon icon-5" style={{ '--delay': '0.8s' }}>
                                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/e4985649a_logo.png" alt="FormEase" />
                            </div>

                            <div className="floating-icon icon-6" style={{ '--delay': '4.2s' }}>
                                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/50941d487_logo.png" alt="Invoice" />
                            </div>
                            <div className="floating-icon icon-7" style={{ '--delay': '2s' }}>
                                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/45029a465_logo.png" alt="Studee" />
                            </div>
                            <div className="floating-icon icon-8" style={{ '--delay': '5.5s' }}>
                                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68bba57a36470263178ec522/c8c4dc720_logo.png" alt="VoiceScribe" />
                            </div>
                        </div>

                        {/* Connecting Lines Filter */}
                        <div className="connecting-lines"></div>

                        {/* Foreground Presale Widget */}
                        <div className="hero-widget-container">
                            <PresaleWidget />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
