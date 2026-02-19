"use client";
import React from 'react';
import { useSnishop } from '../../../context/SnishopContext';
import { Send, ArrowDownLeft, Upload, Download } from 'lucide-react';

export default function WalletPage() {
    const { account, balance, bdagBalance, platformSaldo } = useSnishop();

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#202124]">My Wallet</h1>
                    <p className="text-[#5F6368]">Manage your assets and transactions.</p>
                </div>
                <button className="hidden md:flex items-center gap-2 bg-[#1A73E8] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#1557B0] transition-colors shadow-sm">
                    <Download size={18} />
                    <span>Statement</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* BDAG Asset - Gold Card */}
                <div className="bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <img src="https://cryptologos.cc/logos/blockdag-bdag-logo.png?v=032" alt="BDAG" className="w-32 h-32 rotate-12" onError={(e) => e.target.style.display = 'none'} />
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-between min-h-[180px]">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl">
                                <img src="https://cryptologos.cc/logos/blockdag-bdag-logo.png?v=032" onError={(e) => e.target.style.display = 'none'} alt="" className="w-8 h-8" />
                            </div>
                            <span className="bg-[#F9AB00] text-black text-xs font-bold px-2 py-1 rounded-full">PRIMARY</span>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm font-medium mb-1">BlockDAG Balance</p>
                            <h2 className="text-3xl font-mono font-bold tracking-tight">{parseFloat(bdagBalance).toFixed(4)} <span className="text-lg text-gray-400">BDAG</span></h2>
                        </div>
                        <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                            <button className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
                                <Send size={14} /> Send
                            </button>
                        </div>
                    </div>
                </div>

                {/* SNISHOP Asset - Blue Card */}
                <div className="bg-gradient-to-br from-[#1967D2] to-[#1557B0] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        {/* Placeholder for SNI Logo if available, using text for now or generic coin */}
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-between min-h-[180px]">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl font-bold text-xl">
                                S
                            </div>
                            <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-full">STAKING</span>
                        </div>
                        <div>
                            <p className="text-blue-100 text-sm font-medium mb-1">SNISHOP Token</p>
                            <h2 className="text-3xl font-mono font-bold tracking-tight">{parseFloat(balance).toLocaleString()} <span className="text-lg text-blue-200">SNI</span></h2>
                        </div>
                        <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                            <button className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
                                <ArrowDownLeft size={14} /> Receive
                            </button>
                        </div>
                    </div>
                </div>

                {/* Platform Credits - Green Card */}
                <div className="bg-gradient-to-br from-[#1E8E3E] to-[#137333] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col h-full justify-between min-h-[180px]">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl font-bold text-xl">
                                C
                            </div>
                            <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-full">UTILITY</span>
                        </div>
                        <div>
                            <p className="text-green-100 text-sm font-medium mb-1">Platform Credits</p>
                            <h2 className="text-3xl font-mono font-bold tracking-tight">{platformSaldo.toLocaleString()} <span className="text-lg text-green-200">CR</span></h2>
                        </div>
                        <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                            <button className="flex-1 bg-white text-[#137333] hover:bg-green-50 py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-sm">
                                <Upload size={14} /> Top Up
                            </button>
                            <button className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
                                <Download size={14} /> WD
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#DADCE0] shadow-sm overflow-hidden">
                <div className="p-6 border-b border-[#DADCE0] flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#202124]">Transaction History</h3>
                    <div className="flex gap-2">
                        <select className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                            <option>All Assets</option>
                            <option>BDAG</option>
                            <option>SNISHOP</option>
                        </select>
                    </div>
                </div>

                <div className="divide-y divide-[#E8EAED]">
                    <div className="p-12 text-center flex flex-col items-center justify-center text-[#5F6368]">
                        <div className="w-16 h-16 bg-[#F1F3F4] rounded-full flex items-center justify-center mb-4">
                            <Download size={24} className="opacity-40" />
                        </div>
                        <p className="font-medium">No transactions found</p>
                        <p className="text-sm opacity-70">Your recent activity will appear here</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
