"use client";
import React, { useState } from 'react';
import { useSnishop } from '../../../context/SnishopContext';
import { Coins, Wallet, ArrowRight, Info, Zap, AlertCircle, CheckCircle, Loader2, TrendingUp, Shield, Clock } from 'lucide-react';

export default function PresalePage() {
    const { account, bdagBalance, buyTokens, isConnecting, connectWallet, presaleRate, isPresaleActive } = useSnishop();
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const MIN_BUY = 0.1;

    const estimatedTokens = amount && presaleRate ? (parseFloat(amount) * presaleRate).toFixed(2) : '0';

    const handleMax = () => {
        if (bdagBalance) { const max = parseFloat(bdagBalance) - 0.01; setAmount(max > 0 ? max.toFixed(4) : '0'); }
    };

    const handleSwap = async () => {
        if (!isPresaleActive) return;
        if (!amount || parseFloat(amount) < MIN_BUY) return;
        setIsLoading(true);
        const success = await buyTokens(amount);
        if (success) setAmount('');
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Buy Token</h1>
                    <p className="text-sm text-slate-500 mt-1">Purchase SNDT tokens using BDAG during the presale</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-slate-200 rounded-lg">
                            <div className="px-6 py-4 border-b border-slate-100">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-semibold text-slate-900">Purchase SNDT</h2>
                                    <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                                        isPresaleActive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${
                                            isPresaleActive ? 'bg-emerald-500' : 'bg-red-500'
                                        }`}></span>
                                        {isPresaleActive ? 'Presale Active' : 'Presale Inactive'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 space-y-5">
                                {/* You Pay */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">You Pay</label>
                                    <div className="border border-slate-200 rounded-lg p-4 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0">
                                                <Coins size={16} className="text-violet-600" />
                                            </div>
                                            <div className="flex-1">
                                                <input
                                                    type="number"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    placeholder="0.0000"
                                                    className="w-full text-lg font-semibold text-slate-900 bg-transparent outline-none placeholder:text-slate-300"
                                                    disabled={!isPresaleActive || isLoading}
                                                />
                                                <p className="text-xs text-slate-400 mt-0.5">Balance: {bdagBalance ? parseFloat(bdagBalance).toFixed(4) : '0.0000'} BDAG</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button onClick={handleMax} className="px-2.5 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors">MAX</button>
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-md">
                                                    <span className="text-sm font-semibold text-slate-900">BDAG</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div className="flex justify-center">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                        <ArrowRight size={16} className="text-slate-500 rotate-90" />
                                    </div>
                                </div>

                                {/* You Receive */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">You Receive</label>
                                    <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                                                <Zap size={16} className="text-indigo-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold text-slate-900">{estimatedTokens}</p>
                                                <p className="text-xs text-slate-400 mt-0.5">Rate: 1 BDAG = {presaleRate || '...'} SNDT</p>
                                            </div>
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 rounded-md">
                                                <span className="text-sm font-semibold text-white">SNDT</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Validation Message */}
                                {amount && parseFloat(amount) < MIN_BUY && (
                                    <div className="flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                                        <AlertCircle size={15} />
                                        <p className="text-xs font-medium">Minimum purchase is {MIN_BUY} BDAG</p>
                                    </div>
                                )}

                                {/* Action Button */}
                                {!account ? (
                                    <button onClick={connectWallet} disabled={isConnecting}
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
                                        {isConnecting ? <Loader2 size={16} className="animate-spin" /> : <Wallet size={16} />}
                                        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                                    </button>
                                ) : (
                                    <button onClick={handleSwap}
                                        disabled={!isPresaleActive || isLoading || !amount || parseFloat(amount) < MIN_BUY}
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Coins size={16} />}
                                        {isLoading ? 'Processing...' : 'Buy SNDT Tokens'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Info Sidebar */}
                    <div className="space-y-4">
                        {/* Rate Card */}
                        <div className="bg-white border border-slate-200 rounded-lg p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                                    <TrendingUp size={16} className="text-indigo-600" />
                                </div>
                                <h3 className="text-sm font-semibold text-slate-900">Presale Rate</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-500">Rate</span>
                                    <span className="text-xs font-semibold text-slate-900">1 BDAG = {presaleRate || '...'} SNDT</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-500">Min. Purchase</span>
                                    <span className="text-xs font-semibold text-slate-900">{MIN_BUY} BDAG</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-500">Your BDAG</span>
                                    <span className="text-xs font-semibold text-slate-900">{bdagBalance ? parseFloat(bdagBalance).toFixed(4) : '0.0000'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="bg-white border border-slate-200 rounded-lg p-5">
                            <h3 className="text-sm font-semibold text-slate-900 mb-4">Why Buy SNDT?</h3>
                            <div className="space-y-3">
                                {[
                                    { icon: Shield, text: 'Secure smart contract' },
                                    { icon: Zap, text: 'Instant token delivery' },
                                    { icon: Clock, text: 'Vesting period benefits' },
                                    { icon: TrendingUp, text: 'Early-bird discount rate' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2.5">
                                        <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center flex-shrink-0">
                                            <item.icon size={12} className="text-indigo-600" />
                                        </div>
                                        <span className="text-xs text-slate-600">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Note */}
                        <div className="flex items-start gap-2.5 bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <Info size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-slate-500 leading-relaxed">SNDT tokens will be credited to your connected wallet after transaction confirmation.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
