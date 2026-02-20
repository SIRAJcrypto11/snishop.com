"use client";
import React, { useState } from 'react';
import { useSnishop } from '../../../context/SnishopContext';
import { Wallet, Coins, CreditCard, ArrowUpRight, ArrowDownRight, Send, Download, RefreshCw, Copy, ExternalLink, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

export default function WalletPage() {
    const { account, balance, bdagBalance, platformSaldo } = useSnishop();
    const [activeTab, setActiveTab] = useState('all');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (account) { navigator.clipboard.writeText(account); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    };

    const walletCards = [
        { label: 'SNDT Balance', value: balance ? parseFloat(balance).toFixed(4) : '0.0000', unit: 'SNDT', icon: Wallet, color: 'text-indigo-600', bg: 'bg-indigo-50', change: '+2.4%', positive: true },
        { label: 'BDAG Balance', value: bdagBalance ? parseFloat(bdagBalance).toFixed(4) : '0.0000', unit: 'BDAG', icon: Coins, color: 'text-violet-600', bg: 'bg-violet-50', change: '+1.1%', positive: true },
        { label: 'Platform Credits', value: platformSaldo ? `Rp${parseInt(platformSaldo).toLocaleString('id-ID')}` : 'Rp0', icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50', change: '-0.5%', positive: false },
    ];

    const mockTransactions = [
        { type: 'receive', desc: 'Token Purchase SNDT', amount: '+500 SNDT', date: 'Today, 10:32 AM', status: 'completed', hash: '0x1234...abcd' },
        { type: 'send', desc: 'Service Payment', amount: '-120 SNDT', date: 'Today, 08:15 AM', status: 'completed', hash: '0x5678...efgh' },
        { type: 'receive', desc: 'BDAG Deposit', amount: '+2.5 BDAG', date: 'Yesterday, 03:22 PM', status: 'completed', hash: '0x9abc...ijkl' },
        { type: 'send', desc: 'Withdraw to Wallet', amount: '-1.0 BDAG', date: 'Yesterday, 01:10 PM', status: 'pending', hash: '0xdef0...mnop' },
        { type: 'receive', desc: 'Credits Top Up', amount: '+Rp500,000', date: '2 days ago', status: 'completed', hash: '0x1111...qrst' },
        { type: 'send', desc: 'Service Subscription', amount: '-Rp250,000', date: '3 days ago', status: 'failed', hash: '0x2222...uvwx' },
    ];

    const tabs = ['all', 'receive', 'send'];
    const filtered = activeTab === 'all' ? mockTransactions : mockTransactions.filter(t => t.type === activeTab);

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">My Wallet</h1>
                        <p className="text-sm text-slate-500 mt-1">Manage your assets and transactions</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                            <RefreshCw size={14} /> Refresh
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                            <Download size={14} /> Export
                        </button>
                    </div>
                </div>

                {/* Wallet Address Bar */}
                {account && (
                    <div className="bg-white border border-slate-200 rounded-lg p-4 mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                                <Wallet size={16} className="text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium">Connected Wallet</p>
                                <p className="text-sm font-mono text-slate-900">{account.slice(0,8)}...{account.slice(-6)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors">
                                <Copy size={12} />{copied ? 'Copied!' : 'Copy'}
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors">
                                <ExternalLink size={12} /> Explorer
                            </button>
                        </div>
                    </div>
                )}

                {/* Balance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {walletCards.map((card, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-sm transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}>
                                    <card.icon size={20} className={card.color} />
                                </div>
                                <span className={`flex items-center gap-1 text-xs font-semibold ${
                                    card.positive ? 'text-emerald-600' : 'text-red-500'
                                }`}>
                                    {card.positive ? <TrendingUp size={12} /> : <ArrowDownRight size={12} />}
                                    {card.change}
                                </span>
                            </div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">{card.label}</p>
                            <div className="flex items-end gap-1.5">
                                <p className="text-xl font-bold text-slate-900">{card.value}</p>
                                {card.unit && <span className="text-xs text-slate-400 mb-1">{card.unit}</span>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                    <button className="flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                        <Send size={16} /> Send Token
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                        <Download size={16} /> Receive
                    </button>
                </div>

                {/* Transaction History */}
                <div className="bg-white border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                        <h2 className="text-sm font-semibold text-slate-900">Transaction History</h2>
                        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                            {tabs.map(tab => (
                                <button key={tab} onClick={() => setActiveTab(tab)}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all capitalize ${
                                        activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                    }`}>
                                    {tab === 'all' ? 'All' : tab === 'receive' ? 'Received' : 'Sent'}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {filtered.map((tx, i) => (
                            <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                    tx.type === 'receive' ? 'bg-emerald-50' : 'bg-rose-50'
                                }`}>
                                    {tx.type === 'receive' ? <ArrowUpRight size={16} className="text-emerald-600" /> : <ArrowDownRight size={16} className="text-rose-500" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-900">{tx.desc}</p>
                                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                        <Clock size={11} /> {tx.date}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className={`text-sm font-semibold ${
                                        tx.type === 'receive' ? 'text-emerald-600' : 'text-slate-900'
                                    }`}>{tx.amount}</p>
                                    <span className={`inline-flex items-center gap-1 text-xs font-medium mt-0.5 ${
                                        tx.status === 'completed' ? 'text-emerald-600' :
                                        tx.status === 'pending' ? 'text-amber-600' : 'text-red-500'
                                    }`}>
                                        {tx.status === 'completed' ? <CheckCircle size={10} /> : tx.status === 'pending' ? <Clock size={10} /> : <XCircle size={10} />}
                                        {tx.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between">
                        <p className="text-xs text-slate-500">{filtered.length} transactions</p>
                        <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700">View all on explorer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
