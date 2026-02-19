
import React from "react";

export default function Ecosystem() {
    const apps = [
        { name: "ERP SNISHOP", icon: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e711957c86e922f92ad49f/a236b74f4_Logosnishopbirupanjang.png", url: "https://erp.snishop.com/" },
        { name: "TODOIT AI", icon: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688a42916670b89e7b51038c/de7e35572_logo.png", url: "https://todoit.snishop.com/" },
        { name: "Cek Turnitin", icon: "https://i.ibb.co.com/MGVPZtv/20230722-162429.png", url: "https://snicekplagiasi.base44.app/" },
        { name: "BudgyAI", icon: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/cae5a7a92_logo.png", url: "https://budgyai.vercel.app/" },
        { name: "FormEase", icon: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/e4985649a_logo.png", url: "https://app--form-ease-d76c872b.base44.app" },
        { name: "Invoice", icon: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/50941d487_logo.png", url: "https://autoinvoiceai.base44.app/" },
        { name: "StudeeAI", icon: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/45029a465_logo.png", url: "https://studeeai.base44.app/" },
        { name: "VoiceScribe", icon: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68bba57a36470263178ec522/c8c4dc720_logo.png", url: "https://voicecribe.vercel.app/" },
        { name: "TaskDay", icon: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/d7e4cdddd_logo.png", url: "https://app--taskday-ecedead2.base44.app" },
        { name: "FineEase", icon: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8a46ff438_logo.png", url: "https://app--fin-easeai-cf41924a.base44.app/" },
        { name: "KasirinAI", icon: "https://i.ibb.co.com/MGVPZtv/20230722-162429.png", url: "https://kasirinai.vercel.app/" },
        { name: "Catatan", icon: "https://i.ibb.co.com/MGVPZtv/20230722-162429.png", url: "https://catatanid.vercel.app/" },
    ];

    return (
        <section className="section bg-white" id="ekosistem">
            <div className="container">
                <div className="text-center mb-4">
                    <h2 className="fade-in" style={{ fontSize: "2.5rem", fontWeight: "400", lineHeight: "1.3", maxWidth: "700px", margin: "0 auto" }}>
                        Semua tools yang Anda butuhkan, dan<br />beberapa lagi yang akan Anda sukai.
                    </h2>
                </div>

                <div className="grid grid-3 mt-4 mb-4 fade-in" style={{ gap: "48px", textAlign: "center" }}>
                    <div className="feature-column">
                        <h4>AI-Powered Apps</h4>
                        <p>Kerjakan lebih cepat dengan aplikasi berbasis AI.</p>
                    </div>
                    <div className="feature-column">
                        <h4>Cloud Integration</h4>
                        <p>Kolaborasi real-time dari mana saja.</p>
                    </div>
                    <div className="feature-column">
                        <h4>Keamanan Terjamin</h4>
                        <p>Lindungi data bisnis Anda.</p>
                    </div>
                </div>

                <div className="text-center mb-3 fade-in">
                    <p style={{ fontSize: "1rem", color: "var(--text-primary)", fontWeight: "500", margin: "0" }}>SNISHOP Ecosystem meliputi:</p>
                </div>

                <div className="apps-icon-row fade-in">
                    {apps.map((app, index) => (
                        <div key={index} className="app-icon-item">
                            <a href={app.url} target="_blank" className="app-icon-link">
                                <img src={app.icon} alt={app.name} onError={(e) => e.target.src = '/assets/logo snishop/Logo snishop biru panjang.png'} />
                            </a>
                            <span className="app-label">{app.name}</span>

                            <div className="app-tooltip">
                                <div className="tooltip-icon">
                                    <img src={app.icon} alt={app.name} onError={(e) => e.target.src = '/assets/logo snishop/Logo snishop biru panjang.png'} />
                                </div>
                                <p className="tooltip-name">{app.name}</p>
                                <p className="tooltip-desc">{getProductDescription(app.name)}</p>
                                <a href={app.url} target="_blank" className="tooltip-link">Pelajari lebih lanjut</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function getProductDescription(name) {
    const descriptions = {
        "ERP SNISHOP": "Smart Business Operating System ERP",
        "TODOIT AI": "Finance & To-do AI Assistant",
        "Cek Turnitin": "Cek Plagiasi Akurat Norepository",
        "BudgyAI": "AI Budget Planning Assistant",
        "FormEase": "Smart Online Form Builder",
        "Invoice": "Automatic Invoice Generator",
        "StudeeAI": "AI Study Assistant",
        "VoiceScribe": "Voice-to-Text Transcription",
        "TaskDay": "Daily Task Management",
        "FineEase": "Financial AI Assistant",
        "KasirinAI": "Smart POS for UMKM",
        "Catatan": "AI-powered Notes & Docs"
    };
    return descriptions[name] || "Aplikasi produktivitas SNISHOP";
}
