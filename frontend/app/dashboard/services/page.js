"use client";
import React from 'react';
import { useSnishop } from '../../../context/SnishopContext';
import { Check, Star, Zap } from 'lucide-react';

export default function ServicesPage() {
    const { buyService } = useSnishop();

    const services = [
        {
            id: 1,
            name: "ERP System Enterprise",
            description: "Complete business management solution with HR, Finance, and Inventory modules.",
            price: 5000,
            features: ["Unlimited Users", "Advanced Analytics", "24/7 Support"],
            icon: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e711957c86e922f92ad49f/a236b74f4_Logosnishopbirupanjang.png"
        },
        {
            id: 2,
            name: "TODOIT Pro",
            description: "AI-powered task management for teams to boost productivity.",
            price: 1000,
            features: ["Team Collaboration", "AI Suggestions", "Kanban & Calendar"],
            icon: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688a42916670b89e7b51038c/de7e35572_logo.png"
        },
        {
            id: 3,
            name: "Budgy Premium",
            description: "Smart finance tracking and budgeting tool for personal and business use.",
            price: 800,
            features: ["Bank Sync", "Expense Categorization", "Financial Reports"],
            icon: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/cae5a7a92_logo.png"
        },
        {
            id: 4,
            name: "VoiceScribe AI",
            description: "Transcribe meetings and audio files instantly with high accuracy.",
            price: 1200,
            features: ["Multi-language Support", "Speaker Identification", "Export to PDF/Word"],
            icon: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68bba57a36470263178ec522/c8c4dc720_logo.png"
        }
    ];

    const handleBuy = (service) => {
        const success = buyService(service.name, service.price);
        if (success) {
            alert(`Successfully purchased ${service.name}!`);
        } else {
            alert("Insufficient Platform Credits. Please Top Up.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#202124] mb-4">Premium Services</h1>
                <p className="text-[#5F6368] text-lg">
                    Unlock the full potential of your business with our enterprise-grade tools.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {services.map((service) => (
                    <div key={service.id} className="group bg-white rounded-xl p-6 border border-[#DADCE0] hover:border-[#1A73E8]/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col min-w-0">
                        {service.name.includes("ERP") && (
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-[#F9AB00] to-[#F57F17] text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm z-10">
                                <Star size={10} fill="currentColor" />
                                POPULAR
                            </div>
                        )}

                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-16 h-16 rounded-xl bg-[#F8F9FA] border border-[#E8EAED] p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                <img src={service.icon} alt={service.name} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#202124] mb-1 group-hover:text-[#1A73E8] transition-colors">{service.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-lg font-bold text-[#1A73E8]">{service.price.toLocaleString()}</span>
                                    <span className="text-xs text-[#5F6368] font-medium">Credits / Year</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-[#5F6368] text-sm mb-6 grow leading-relaxed">
                            {service.description}
                        </p>

                        <div className="space-y-3 mb-6 bg-[#F8F9FA] rounded-xl p-4 border border-[#E8EAED]">
                            {service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-[#3C4043] font-medium">
                                    <div className="p-0.5 rounded-full bg-[#E6F4EA] text-[#1E8E3E]">
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => handleBuy(service)}
                            className="w-full py-3 rounded-lg bg-[#1A73E8] text-white font-bold hover:bg-[#1557B0] transition-colors flex items-center justify-center gap-2 shadow-sm group-hover:shadow-md mt-auto"
                        >
                            <Zap size={18} />
                            Get Started
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
