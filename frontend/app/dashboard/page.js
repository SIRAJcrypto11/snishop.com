"use client";
import React from 'react';
import { useSnishop } from '../../context/SnishopContext';
import { Wallet, Coins, CreditCard, ArrowRight, TrendingUp, Activity, Box } from 'lucide-react';

export default function DashboardOverview() {
    const { balance, bdagBalance, platformSaldo, transactions } = useSnishop();

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Section */}
            <div>
                <h1 className="text-3xl font-bold text-[#202124]">
                    Dashboard Overview
                </h1>
                <p className="text-[#5F6368] mt-2">Welcome back! Here's your portfolio summary.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* BDAG Card */}
                <div className="bg-gradient-to-br from-[#FEF7E0] to-white border border-[#FAD2CF]/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <img src="https://cryptologos.cc/logos/blockdag-bdag-logo.png?v=032" alt="BDAG" className="w-24 h-24 rotate-12" onError={(e) => e.target.style.display = 'none'} />
                    </div>
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="p-3 bg-[#F9AB00]/20 rounded-lg text-[#B06000]">
                            <img src="https://cryptologos.cc/logos/blockdag-bdag-logo.png?v=032" alt="BDAG" className="w-6 h-6" onError={(e) => e.target.style.display = 'none'} />
                        </div>
                        <span className="text-sm text-[#5F6368] font-bold uppercase tracking-wider">BDAG Balance</span>
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-[#202124] mb-1">{parseFloat(bdagBalance).toFixed(4)} <span className="text-lg font-medium text-[#5F6368]">BDAG</span></h2>
                        <div className="flex items-center gap-2 text-xs text-[#34A853] font-medium bg-white/50 w-fit px-2 py-1 rounded-full backdrop-blur-sm">
                            <TrendingUp size={12} />
                            <span>+0.00% (24h)</span>
                        </div>
                    </div>
                </div>

                {/* SNISHOP Token Card */}
                <div className="bg-gradient-to-br from-[#E8F0FE] to-white border border-[#D2E3FC]/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Coins size={96} className="text-[#1967D2] rotate-12" />
                    </div>
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="p-3 bg-[#1967D2]/10 rounded-lg text-[#1967D2]">
                            <Coins size={24} />
                        </div>
                        <span className="text-sm text-[#5F6368] font-bold uppercase tracking-wider">SNISHOP Token</span>
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-[#202124] mb-1">{parseFloat(balance).toLocaleString()} <span className="text-lg font-medium text-[#5F6368]">SNI</span></h2>
                        <div className="flex items-center gap-2 text-xs text-[#1967D2] font-medium bg-white/50 w-fit px-2 py-1 rounded-full backdrop-blur-sm">
                            <Activity size={12} />
                            <span>Staking Active</span>
                        </div>
                    </div>
                </div>

                {/* Platform Credits Card */}
                <div className="bg-gradient-to-br from-[#E6F4EA] to-white border border-[#CEEAD6]/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <CreditCard size={96} className="text-[#1E8E3E] rotate-12" />
                    </div>
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="p-3 bg-[#1E8E3E]/10 rounded-lg text-[#1E8E3E]">
                            <CreditCard size={24} />
                        </div>
                        <span className="text-sm text-[#5F6368] font-bold uppercase tracking-wider">Platform Credits</span>
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-[#202124] mb-1">{platformSaldo.toLocaleString()} <span className="text-lg font-medium text-[#5F6368]">Credits</span></h2>
                        <div className="flex items-center gap-2 text-xs text-[#5F6368] font-medium bg-white/50 w-fit px-2 py-1 rounded-full backdrop-blur-sm">
                            <Box size={12} />
                            <span>Utility Credits</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-[#DADCE0] flex justify-between items-center bg-white">
                    <h2 className="text-lg font-bold text-[#202124]">Recent Transactions</h2>
                    <a href="/dashboard/wallet" className="text-sm text-[#1A73E8] hover:text-[#174EA6] flex items-center gap-1 transition-colors font-medium">
                        View All <ArrowRight size={14} />
                    </a>
                </div>

                <div className="divide-y divide-[#DADCE0]">
                    {transactions.length === 0 ? (
                        <div className="p-12 text-center text-[#5F6368] flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#F1F3F4] rounded-full flex items-center justify-center mb-4">
                                <Activity size={24} className="opacity-50" />
                            </div>
                            <p>No transactions found.</p>
                        </div>
                    ) : (
                        transactions.slice(0, 5).map((tx) => (
                            <div key={tx.id} className="p-4 hover:bg-[#F8F9FA] transition-colors flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type.includes("Buy") ? "bg-[#E8F0FE] text-[#1967D2]" : "bg-[#F1F3F4] text-[#5F6368]"
                                        }`}>
                                        {tx.type.includes("Token") ? <Coins size={18} /> :
                                            tx.type.includes("Service") ? <Box size={18} /> : <CreditCard size={18} />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#202124] group-hover:text-[#1A73E8] transition-colors">{tx.type}</p>
                                        <p className="text-xs text-[#5F6368]">{tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono font-bold text-[#202124]">{tx.amount}</p>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tx.status === 'Completed' ? 'bg-[#E6F4EA] text-[#137333]' : 'bg-[#FEF7E0] text-[#B06000]'
                                        }`}>
                                        {tx.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
