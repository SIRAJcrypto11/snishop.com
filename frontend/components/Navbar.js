"use client";
import React, { useState } from "react";
import { Wallet, LogOut, ChevronDown, User } from "lucide-react";
import { useSnishop } from "../context/SnishopContext";
import WalletDashboard from "./WalletDashboard";

export default function Navbar() {
    const {
        account,
        balance,
        isConnecting,
        connectWallet,
        disconnectWallet
    } = useSnishop();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Close menu when clicking a link
    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header className={`header ${isMobileMenuOpen ? 'menu-open' : ''}`}>
                <div className="container">
                    <div className="header-inner">
                        {/* Logo */}
                        <a href="/" className="logo" onClick={handleLinkClick}>
                            <img src="/assets/logo snishop/Logo snishop biru panjang.png" alt="SNISHOP.ID" />
                        </a>

                        {/* Navigation (Mobile Menu Container on Mobile) */}
                        <nav className={`nav ${isMobileMenuOpen ? "active" : ""}`}>
                            <div className="nav-links">
                                <a href="#beranda" className="nav-link active" onClick={handleLinkClick}>Beranda</a>
                                <a href="#layanan" className="nav-link" onClick={handleLinkClick}>Layanan</a>
                                <a href="#harga" className="nav-link" onClick={handleLinkClick}>Harga</a>
                                <a href="#ekosistem" className="nav-link" onClick={handleLinkClick}>Ekosistem</a>
                                <a href="/dashboard" className="nav-link" onClick={handleLinkClick}>Dashboard</a>
                            </div>

                            {/* Mobile Actions (Visible inside nav menu on mobile) */}
                            <div className="mobile-actions">
                                {!account ? (
                                    <button
                                        onClick={() => { connectWallet(); handleLinkClick(); }}
                                        disabled={isConnecting}
                                        className="btn btn-primary w-full"
                                    >
                                        <Wallet size={18} />
                                        {isConnecting ? "Connecting..." : "Connect Wallet"}
                                    </button>
                                ) : (
                                    <div className="wallet-card-mobile">
                                        <div className="balance-row">
                                            <span className="label">Balance</span>
                                            <span className="value">{parseFloat(balance).toFixed(2)} SNISHOP</span>
                                        </div>
                                        <button
                                            onClick={() => { setShowDashboard(true); handleLinkClick(); }}
                                            className="btn btn-secondary w-full"
                                        >
                                            <User size={16} />
                                            {account.slice(0, 6)}...{account.slice(-4)}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </nav>

                        {/* Desktop Actions (Hidden on mobile) */}
                        <div className="desktop-actions">
                            {!account ? (
                                <button
                                    onClick={connectWallet}
                                    disabled={isConnecting}
                                    className="btn btn-primary"
                                >
                                    <Wallet size={18} />
                                    {isConnecting ? "Connecting..." : "Connect Wallet"}
                                </button>
                            ) : (
                                <div className="wallet-connected">
                                    <div className="balance-display text-right mr-3">
                                        <div className="text-secondary text-xs">Balance</div>
                                        <div className="text-primary font-bold">{parseFloat(balance).toFixed(2)} SNISHOP</div>
                                    </div>
                                    <button
                                        onClick={() => setShowDashboard(true)}
                                        className="btn btn-secondary btn-sm"
                                    >
                                        <User size={16} />
                                        {account.slice(0, 6)}...{account.slice(-4)}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu} aria-label="Toggle Menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </header>

            {showDashboard && (
                <WalletDashboard
                    account={account}
                    balance={balance}
                    onClose={() => setShowDashboard(false)}
                    disconnectWallet={() => {
                        disconnectWallet();
                        setShowDashboard(false);
                    }}
                />
            )}
        </>
    );
}
