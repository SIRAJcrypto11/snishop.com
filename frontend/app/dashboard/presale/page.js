"use client";
import React, { useState } from 'react';
import { useSnishop } from '../../../context/SnishopContext';
import { ArrowDown, Coins, Wallet, Info } from 'lucide-react';

export default function PresalePage() {
    const {
        account,
        bdagBalance,
        buyTokens,
        isConnecting,
        connectWallet,
        presaleRate,
        isPresaleActive
    } = useSnishop();

    const [amount, setAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Constants
    const MIN_BUY = 0.1;

    const handleMax = () => {
        if (bdagBalance) {
            const max = parseFloat(bdagBalance) - 0.01;
            setAmount(max > 0 ? max.toFixed(4) : "0");
        }
    };

    const handleSwap = async () => {
        if (!isPresaleActive) return;
        if (!amount || parseFloat(amount) < MIN_BUY) return;
        setIsLoading(true);
        const success = await buyTokens(amount);
        if (success) {
            setAmount("");
        }
        setIsLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in pb-12">
            <div className="section-header text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-pill mb-4">
                    <img src="https://cryptologos.cc/logos/blockdag-bdag-logo.png?v=032" alt="BDAG" className="w-4 h-4" onError={(e) => e.target.style.display = 'none'} />
                    <span>Official Token Presale</span>
                </div>
                <h1>Invest in the Future</h1>
                <p className="text-center max-w-lg mx-auto">
                    Secure your allocation of BDAG tokens at the exclusive presale rate.
                </p>
            </div>

            {!isPresaleActive && (
                <div className="bg-danger-light border border-danger text-danger p-4 rounded-xl flex items-center gap-3 font-medium">
                    <Info size={20} />
                    <span>Presale is currently paused by the administrator.</span>
                </div>
            )}

            <div className={`chart-container ${!isPresaleActive ? 'opacity-60 pointer-events-none grayscale' : ''}`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="chart-title text-lg">Swap Tokens</h2>
                    <div className="flex items-center gap-2 bg-background px-3 py-1.5 rounded-full border border-border text-sm font-medium text-text-muted">
                        <Info size={14} />
                        <span>1 BDAG = {presaleRate} SNI</span>
                    </div>
                </div>

                {/* FROM input */}
                <div className="bg-background rounded-lg p-5 border border-border hover:border-primary transition-colors group relative mb-2">
                    <div className="flex justify-between text-sm text-text-muted mb-2 font-medium">
                        <span>You Pay</span>
                        <span>Balance: {parseFloat(bdagBalance).toFixed(4)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <input
                            type="number"
                            placeholder="0.0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="input-field border-0 bg-transparent text-3xl font-bold text-text-primary focus:outline-none w-full placeholder:text-text-tertiary p-0"
                        />
                        <div className="flex items-center gap-2 bg-surface px-3 py-2 rounded-lg border border-border min-w-[120px] justify-center">
                            <img src="https://cryptologos.cc/logos/blockdag-bdag-logo.png?v=032" onError={(e) => e.target.style.display = 'none'} alt="" className="w-6 h-6" />
                            <span className="font-bold text-text-primary">BDAG</span>
                        </div>
                    </div>
                    {account && (
                        <button
                            onClick={handleMax}
                            className="absolute bottom-5 left-0 ml-5 text-xs font-bold text-primary hover:text-primary-hover uppercase tracking-wider hidden group-hover:block transition-all"
                        >
                            Use Max
                        </button>
                    )}
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-3 relative z-10 mb-2">
                    <div className="bg-surface p-2 rounded-lg border border-border text-text-muted">
                        <ArrowDown size={20} />
                    </div>
                </div>

                {/* TO input */}
                <div className="bg-background rounded-lg p-5 border border-border mb-8">
                    <div className="flex justify-between text-sm text-text-muted mb-2 font-medium">
                        <span>You Receive</span>
                        <span>Rate: {presaleRate}x</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="0.0"
                            value={amount ? (parseFloat(amount) * presaleRate).toLocaleString() : "0.0"}
                            readOnly
                            className="input-field border-0 bg-transparent text-3xl font-bold text-text-primary focus:outline-none w-full placeholder:text-text-tertiary p-0"
                        />
                        <div className="flex items-center gap-2 bg-surface px-3 py-2 rounded-lg border border-border min-w-[120px] justify-center">
                            <Coins size={20} className="text-primary" />
                            <span className="font-bold text-text-primary">SNISHOP</span>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div>
                    {!account ? (
                        <button
                            className="btn-primary w-full !bg-primary-light !text-primary hover:!bg-blue-100 flex items-center justify-center gap-2"
                            onClick={connectWallet}
                            disabled={isConnecting}
                        >
                            <Wallet size={20} />
                            {isConnecting ? "Connecting..." : "Connect Wallet to Purchase"}
                        </button>
                    ) : (
                        <button
                            className={`w-full btn-primary font-bold text-lg shadow-lg transition-all transform active:scale-[0.98] ${isLoading || !amount || parseFloat(amount) < MIN_BUY || !isPresaleActive
                                    ? 'opacity-50 cursor-not-allowed'
                                    : ''
                                }`}
                            onClick={handleSwap}
                            disabled={isLoading || !amount || parseFloat(amount) < MIN_BUY || !isPresaleActive}
                        >
                            {isLoading ? "Processing Transaction..." : parseFloat(amount) < MIN_BUY ? `Minimum Buy ${MIN_BUY} BDAG` : "Confirm Swap"}
                        </button>
                    )}
                </div>

                <div className="mt-6 text-center text-xs text-text-muted font-medium flex items-center justify-center gap-1">
                    <Info size={12} /> Gas fees are paid in BDAG network currency.
                </div>
            </div>
        </div>
    );
}
