"use client";
import React, { useState } from 'react';
import { Menu, Wallet, User, Bell, CreditCard, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useSnishop } from '../../context/SnishopContext';
import { useSession, signOut } from 'next-auth/react';

export default function Header({ toggleSidebar }) {
    const { account, balance, isConnecting, connectWallet, platformSaldo } = useSnishop();
    const { data: session } = useSession();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [hasNotification, setHasNotification] = useState(true);

    const user = session?.user;

    return (
        <header className="header sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button
                    className="md:hidden p-2 text-text-muted hover:bg-surface-secondary rounded-lg transition-colors"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <Menu size={24} />
                </button>

                {/* Credits Display */}
                <div className="hidden md:flex items-center gap-3 bg-primary-light border border-primary px-4 py-2.5 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                        C
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-xs text-primary font-semibold uppercase tracking-wider">Credits</span>
                        <span className="text-sm font-bold text-primary">{platformSaldo.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Mobile Credits Display */}
                <div className="md:hidden flex items-center gap-2 bg-primary-light px-3 py-1.5 rounded-lg border border-primary">
                    <span className="text-xs font-bold text-primary">{platformSaldo} Cr</span>
                </div>

                {/* Notification Button */}
                <button 
                    className="p-2 text-text-muted hover:bg-surface-secondary rounded-lg transition-colors relative group"
                    aria-label="Notifications"
                >
                    <Bell size={20} className="group-hover:text-primary transition-colors" />
                    {hasNotification && (
                        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-danger rounded-full border 2px border-surface animate-pulse"></span>
                    )}
                </button>

                {!account ? (
                    <button
                        onClick={connectWallet}
                        disabled={isConnecting}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Wallet size={16} />
                        {isConnecting ? "Connecting..." : "Connect Wallet"}
                    </button>
                ) : (
                    <div className="flex items-center gap-4">
                        {/* Token Balance - Desktop Only */}
                        <div className="hidden md:flex flex-col items-end text-right">
                            <span className="text-xs text-text-muted font-medium">Token Balance</span>
                            <span className="text-sm font-bold text-primary">{parseFloat(balance).toFixed(2)} SNI</span>
                        </div>

                        {/* User Profile Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 bg-surface-secondary border border-border px-3 py-2 rounded-lg hover:bg-background hover:border-primary transition-colors group"
                                aria-label="User menu"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center text-white font-bold text-sm">
                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span className="text-sm font-medium text-text-primary hidden md:block">
                                    {account.slice(0, 6)}...{account.slice(-4)}
                                </span>
                                <ChevronDown size={16} className={`text-text-muted transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-lg shadow-lg z-50 py-2 animate-fade-in">
                                    <div className="px-4 py-3 border-b border-border-light">
                                        <p className="text-sm font-semibold text-text-primary">{user?.name || 'User'}</p>
                                        <p className="text-xs text-text-muted mt-1 break-all">{account}</p>
                                        <span className="inline-block mt-2 text-xs px-2 py-1 bg-primary-light rounded text-primary font-semibold uppercase tracking-wide">
                                            {user?.membershipTier || 'Member'}
                                        </span>
                                    </div>

                                    <a href="/dashboard/wallet" className="flex items-center gap-3 px-4 py-2.5 text-text-secondary hover:text-primary hover:bg-surface-secondary transition-colors text-sm">
                                        <Wallet size={16} />
                                        <span>My Wallet</span>
                                    </a>

                                    <a href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-text-secondary hover:text-primary hover:bg-surface-secondary transition-colors text-sm">
                                        <User size={16} />
                                        <span>Profile Settings</span>
                                    </a>

                                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-text-secondary hover:text-primary hover:bg-surface-secondary transition-colors text-sm">
                                        <Settings size={16} />
                                        <span>Settings</span>
                                    </button>

                                    <hr className="border-border-light my-2" />

                                    <button
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-danger hover:bg-danger-light transition-colors text-sm font-medium"
                                    >
                                        <LogOut size={16} />
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
