"use client";
import React from 'react';
import { useSnishop } from '../../context/SnishopContext';
import { Wallet, Coins, CreditCard, ArrowRight, TrendingUp, Activity, Box, MoreVertical, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { DashboardCharts } from '../../components/dashboard/overview/DashboardCharts';

export default function DashboardOverview() {
    const { balance, bdagBalance, platformSaldo, transactions } = useSnishop();

    const StatCard = ({ icon: Icon, label, value, unit, trend, trendType, color }) => (
        <div className="card-base p-6">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon size={24} />
                </div>
                <button className="p-2 hover:bg-surface-secondary rounded-lg transition">
                    <MoreVertical size={18} className="text-text-tertiary" />
                </button>
            </div>
            <p className="text-text-tertiary text-sm font-medium uppercase tracking-wide mb-2">{label}</p>
            <h3 className="text-2xl font-bold text-text-primary mb-3">
                {value} <span className="text-lg text-text-secondary">{unit}</span>
            </h3>
            {trend && (
                <div className={`flex items-center gap-1 text-sm font-semibold ${trendType === 'positive' ? 'text-success' : 'text-danger'}`}>
                    {trendType === 'positive' ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                    {trend}
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="animate-fade-in">
                <h1 className="text-4xl font-bold text-text-primary mb-2">
                    Dashboard Overview
                </h1>
                <p className="text-text-secondary">Welcome back! Here's your portfolio performance and insights.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-scale">
                <StatCard
                    icon={Coins}
                    label="SNISHOP Token"
                    value={parseFloat(balance).toLocaleString()}
                    unit="SNI"
                    trend="+12.5%"
                    trendType="positive"
                    color="bg-gradient-to-br from-accent-secondary/20 to-transparent text-accent-secondary"
                />
                <StatCard
                    icon={Wallet}
                    label="BDAG Balance"
                    value={parseFloat(bdagBalance).toFixed(4)}
                    unit="BDAG"
                    trend="+8.2%"
                    trendType="positive"
                    color="bg-gradient-to-br from-accent-primary/20 to-transparent text-accent-primary"
                />
                <StatCard
                    icon={CreditCard}
                    label="Platform Credits"
                    value={platformSaldo.toLocaleString()}
                    unit="Credits"
                    trend="Stable"
                    trendType="positive"
                    color="bg-gradient-to-br from-success/20 to-transparent text-success"
                />
            </div>

            {/* Charts Section */}
            <div className="animate-fade-in">
                <DashboardCharts />
            </div>

            {/* Recent Transactions */}
            <div className="card-base overflow-hidden animate-fade-in">
                <div className="p-6 border-b border-border-default flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-text-primary">Recent Transactions</h2>
                        <p className="text-text-tertiary text-sm mt-1">Latest activity on your account</p>
                    </div>
                    <a href="/dashboard/wallet" className="text-accent-primary hover:text-accent-primary-hover flex items-center gap-2 transition-colors font-semibold text-sm">
                        View All <ArrowRight size={16} />
                    </a>
                </div>

                <div className="divide-y divide-border-subtle overflow-x-auto">
                    {transactions.length === 0 ? (
                        <div className="p-12 text-center flex flex-col items-center justify-center min-h-80">
                            <div className="w-16 h-16 bg-surface-secondary rounded-lg flex items-center justify-center mb-4">
                                <Activity size={32} className="text-text-tertiary" />
                            </div>
                            <p className="text-text-secondary font-medium">No transactions yet</p>
                            <p className="text-text-tertiary text-sm mt-1">Your transaction history will appear here</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-border-subtle">
                            {transactions.slice(0, 5).map((tx) => (
                                <div key={tx.id} className="p-6 hover:bg-surface-secondary/50 transition-colors flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold ${
                                            tx.type.includes("Buy") 
                                                ? "bg-gradient-to-br from-accent-primary/20 to-transparent text-accent-primary" 
                                                : tx.type.includes("Service")
                                                ? "bg-gradient-to-br from-accent-secondary/20 to-transparent text-accent-secondary"
                                                : "bg-gradient-to-br from-success/20 to-transparent text-success"
                                        }`}>
                                            {tx.type.includes("Token") ? <Coins size={20} /> :
                                                tx.type.includes("Service") ? <Box size={20} /> : <CreditCard size={20} />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors">{tx.type}</p>
                                            <p className="text-xs text-text-tertiary mt-1">{tx.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-mono font-bold text-text-primary text-lg">{tx.amount}</p>
                                        <span className={`text-xs px-3 py-1.5 rounded-full font-semibold inline-block mt-1 ${
                                            tx.status === 'Completed' 
                                                ? 'badge-success' 
                                                : 'badge-warning'
                                        }`}>
                                            {tx.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
