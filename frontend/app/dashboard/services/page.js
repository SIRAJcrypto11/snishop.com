"use client";
import React, { useState } from 'react';
import { Globe, Cpu, BarChart2, MessageSquare, Shield, Zap, ExternalLink, Star, ChevronRight, Search, Filter, CheckCircle } from 'lucide-react';

const services = [
    { id: 1, icon: Globe, name: 'Web Development', desc: 'Custom websites and web applications built with modern tech stack', category: 'Development', status: 'available', rating: 4.9, reviews: 128, price: 'From 3M IDR', color: 'text-indigo-600', bg: 'bg-indigo-50', badge: 'Popular' },
    { id: 2, icon: Cpu, name: 'ERP System', desc: 'Enterprise resource planning solution for your business operations', category: 'Enterprise', status: 'available', rating: 4.8, reviews: 95, price: 'From 10M IDR', color: 'text-violet-600', bg: 'bg-violet-50', badge: 'Enterprise' },
    { id: 3, icon: BarChart2, name: 'Data Analytics', desc: 'Business intelligence and data visualization dashboards', category: 'Analytics', status: 'available', rating: 4.7, reviews: 64, price: 'From 5M IDR', color: 'text-emerald-600', bg: 'bg-emerald-50', badge: null },
    { id: 4, icon: MessageSquare, name: 'Chatbot & AI', desc: 'Custom AI chatbots and automation solutions for your business', category: 'AI', status: 'available', rating: 4.9, reviews: 87, price: 'From 7M IDR', color: 'text-amber-600', bg: 'bg-amber-50', badge: 'New' },
    { id: 5, icon: Shield, name: 'Cybersecurity Audit', desc: 'Security assessment and penetration testing for your systems', category: 'Security', status: 'available', rating: 4.6, reviews: 43, price: 'From 5M IDR', color: 'text-rose-600', bg: 'bg-rose-50', badge: null },
    { id: 6, icon: Zap, name: 'API Integration', desc: 'Connect and integrate third-party APIs and payment gateways', category: 'Development', status: 'coming_soon', rating: null, reviews: 0, price: 'Coming Soon', color: 'text-cyan-600', bg: 'bg-cyan-50', badge: 'Soon' },
];

const categories = ['All', 'Development', 'Enterprise', 'Analytics', 'AI', 'Security'];

export default function ServicesPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [search, setSearch] = useState('');

    const filtered = services.filter(s => {
        const matchCat = activeCategory === 'All' || s.category === activeCategory;
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-6xl mx-auto px-6 py-8">
                {/* Page Header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Services</h1>
                        <p className="text-sm text-slate-500 mt-1">Explore our professional development and technology services</p>
                    </div>
                    <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-2">
                        <CheckCircle size={14} className="text-indigo-600" />
                        <span className="text-xs font-semibold text-indigo-700">{services.filter(s => s.status === 'available').length} Services Available</span>
                    </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setActiveCategory(cat)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                                    activeCategory === cat ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                }`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map(service => (
                        <div key={service.id} className={`bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-all duration-200 group ${
                            service.status === 'coming_soon' ? 'opacity-70' : 'cursor-pointer'
                        }`}>
                            <div className="flex items-start justify-between mb-5">
                                <div className={`w-11 h-11 rounded-lg ${service.bg} flex items-center justify-center flex-shrink-0`}>
                                    <service.icon size={22} className={service.color} />
                                </div>
                                {service.badge && (
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                        service.badge === 'Popular' ? 'bg-indigo-50 text-indigo-700' :
                                        service.badge === 'Enterprise' ? 'bg-violet-50 text-violet-700' :
                                        service.badge === 'New' ? 'bg-emerald-50 text-emerald-700' :
                                        'bg-slate-100 text-slate-600'
                                    }`}>{service.badge}</span>
                                )}
                            </div>

                            <h3 className="text-sm font-bold text-slate-900 mb-1.5">{service.name}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed mb-5">{service.desc}</p>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-slate-900">{service.price}</p>
                                    {service.rating && (
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <Star size={11} className="text-amber-500 fill-amber-500" />
                                            <span className="text-xs font-semibold text-slate-700">{service.rating}</span>
                                            <span className="text-xs text-slate-400">({service.reviews})</span>
                                        </div>
                                    )}
                                </div>
                                {service.status === 'available' ? (
                                    <button className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors group-hover:gap-2">
                                        Order <ChevronRight size={12} />
                                    </button>
                                ) : (
                                    <span className="px-3 py-2 bg-slate-100 text-slate-500 text-xs font-medium rounded-lg">Coming Soon</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mx-auto mb-4">
                            <Search size={20} className="text-slate-400" />
                        </div>
                        <p className="text-sm font-medium text-slate-600">No services found</p>
                        <p className="text-xs text-slate-400 mt-1">Try a different search term or category</p>
                    </div>
                )}

                {/* CTA Section */}
                <div className="mt-8 bg-white border border-slate-200 rounded-lg p-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-slate-900">Need a custom solution?</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Contact us to discuss your specific requirements</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                        <ExternalLink size={14} /> Contact Us
                    </button>
                </div>
            </div>
        </div>
    );
}
