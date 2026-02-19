"use client";
import React, { useState } from 'react';
import { Menu, Wallet, User, Bell, CreditCard, LogOut, Settings, ChevronDown, Zap } from 'lucide-react';
import { useSnishop } from '../../context/SnishopContext';
import { useSession, signOut } from 'next-auth/react';

export default function Header({ toggleSidebar }) {
    const { account, balance, isConnecting, connectWallet, platformSaldo } = useSnishop();
    const { data: session } = useSession();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [hasNotification, setHasNotification] = useState(true);

    const user = session?.user;

    return (
        <header className="header sticky top-0 z-40 px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <button
                    className="md:hidden p-2.5 text-text-muted hover:bg-surface-secondary rounded-xl transition-all active:scale-95"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <Menu size={24} />
                </button>

                {/* Premium Credits Badge */}
                <div className="hidden md:flex items-center gap-3 gradient-green px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center font-bold text-sm">
                        <Zap size={18} />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-xs font-bold uppercase tracking-wider opacity-90">Credits</span>
                        <span className="text-base font-bold">{platformSaldo.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-5">
                {/* Mobile Credits Badge */}
                <div className="md:hidden flex items-center gap-2 gradient-green px-3 py-2 rounded-lg shadow-md">
                    <span className="text-xs font-bold">{platformSaldo} Cr</span>
                </div>

                {/* Notification Button - Premium */}
                <button 
                    className="p-2.5 text-text-muted hover:bg-surface-secondary rounded-xl transition-all relative group"
                    aria-label="Notifications"
                >
                    <Bell size={20} className="group-hover:text-primary transition-colors" />
                    {hasNotification && (
                        <span className="absolute top-1 right-1 w-3 h-3 bg-danger rounded-full border-2 border-white shadow-md animate-pulse-glow"></span>
                    )}
                </button>

                {!account ? (
                    <button
                        onClick={connectWallet}
                        disabled={isConnecting}
                        className="gradient-blue-purple flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm uppercase tracking-wide shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
                    >
                        <Wallet size={18} />
                        <span className="hidden sm:inline">{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
                    </button>
                ) : (
                    <div className="flex items-center gap-5">
                        {/* Token Balance - Desktop Only */}
                        <div className="hidden lg:flex flex-col items-end text-right gap-1">
                            <span className="text-xs text-text-muted font-bold uppercase tracking-wider">SNI Token</span>
                            <span className="text-sm font-bold text-primary">{parseFloat(balance).toFixed(2)}</span>
                        </div>

                        {/* User Profile Menu - Premium */}
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2.5 bg-gradient-to-br from-primary to-indigo px-3.5 py-2.5 rounded-xl text-white font-bold transition-all hover:shadow-lg active:scale-95"
                                aria-label="User menu"
                            >
                                <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-sm">
                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span className="hidden md:inline text-sm">{account?.slice(0, 6)}...{account?.slice(-4)}</span>
                                <ChevronDown size={16} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu - Premium */}
                            {showUserMenu && (
                                <div className="absolute right-0 mt-3 w-64 bg-white border border-border rounded-xl shadow-xl z-50 py-3 animate-fade-in">
                                    <div className="px-5 py-4 border-b border-border-light">
                                        <p className="text-sm font-bold text-text-primary">{user?.name || 'User'}</p>
                                        <p className="text-xs text-text-muted mt-1 break-all font-mono">{account}</p>
                                        <div className="flex items-center gap-2 mt-3">
                                            <span className={`text-xs px-3 py-1.5 rounded-lg font-bold uppercase tracking-wide ${
                                                user?.membershipTier === 'DIAMOND' ? 'badge-tier-diamond' :
                                                user?.membershipTier === 'PLATINUM' ? 'badge-tier-platinum' :
                                                'badge-tier-gold'
                                            }`}>
                                                {user?.membershipTier || 'Member'}
                                            </span>
                                        </div>
                                    </div>

                                    <a href="/dashboard" className="flex items-center gap-3 px-5 py-3 text-text-secondary hover:text-primary hover:bg-primary-light transition-all text-sm font-medium">
                                        <User size={18} />
                                        <span>My Profile</span>
                                    </a>

                                    <a href="/dashboard/wallet" className="flex items-center gap-3 px-5 py-3 text-text-secondary hover:text-primary hover:bg-primary-light transition-all text-sm font-medium">
                                        <Wallet size={18} />
                                        <span>Wallet</span>
                                    </a>

                                    <button className="w-full flex items-center gap-3 px-5 py-3 text-text-secondary hover:text-primary hover:bg-primary-light transition-all text-sm font-medium">
                                        <Settings size={18} />
                                        <span>Settings</span>
                                    </button>

                                    <hr className="border-border-light my-2" />

                                    <button
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        className="w-full flex items-center gap-3 px-5 py-3 text-danger hover:bg-danger-light transition-all text-sm font-bold uppercase tracking-wide"
                                    >
                                        <LogOut size={18} />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Close menu when clicking outside */}
            {showUserMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                />
            )}
        </header>
    );
}
