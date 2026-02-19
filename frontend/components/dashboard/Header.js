"use client";
import React from 'react';
import { Menu, Wallet, User, Bell, CreditCard } from 'lucide-react';
import { useSnishop } from '../../context/SnishopContext';

export default function Header({ toggleSidebar }) {
    const { account, balance, isConnecting, connectWallet, platformSaldo } = useSnishop();

    return (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#DADCE0] h-20 px-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
                <button
                    className="md:hidden p-2 text-[#5F6368] hover:bg-[#F1F3F4] rounded-full transition-colors"
                    onClick={toggleSidebar}
                >
                    <Menu size={24} />
                </button>

                <div className="hidden md:flex items-center gap-3 bg-[#E8F0FE] border border-[#D2E3FC] px-4 py-2 rounded-full shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-[#1967D2] text-white flex items-center justify-center">
                        <CreditCard size={14} />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-[10px] text-[#1967D2] font-semibold uppercase tracking-wider">Credits</span>
                        <span className="text-sm font-bold text-[#174EA6]">{platformSaldo.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Mobile Saldo (Visible only on mobile) */}
                <div className="md:hidden flex items-center gap-2 bg-[#E8F0FE] px-3 py-1.5 rounded-full">
                    <span className="text-xs font-bold text-[#1967D2]">{platformSaldo} Cr</span>
                </div>

                <button className="p-2 text-[#5F6368] hover:bg-[#F1F3F4] rounded-full transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-[#EA4335] rounded-full border border-white"></span>
                </button>

                {!account ? (
                    <button
                        onClick={connectWallet}
                        disabled={isConnecting}
                        className="flex items-center gap-2 bg-[#1A73E8] hover:bg-[#1557B0] text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md shadow-blue-200"
                    >
                        <Wallet size={16} />
                        {isConnecting ? "Connecting..." : "Connect Wallet"}
                    </button>
                ) : (
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-xs text-[#5F6368]">Token Balance</span>
                            <span className="text-sm font-bold text-[#202124]">{parseFloat(balance).toFixed(2)} SNI</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white border border-[#E8EAED] px-3 py-1.5 rounded-xl shadow-sm hover:bg-[#F8F9FA] cursor-pointer transition-colors">
                            <div className="w-8 h-8 rounded-full bg-[#E8F0FE] flex items-center justify-center">
                                <User size={16} className="text-[#1967D2]" />
                            </div>
                            <span className="text-sm font-medium text-[#3C4043] hidden md:block">
                                {account.slice(0, 6)}...{account.slice(-4)}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
