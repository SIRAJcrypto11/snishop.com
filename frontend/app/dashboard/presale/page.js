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
            // Leave some gas
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
            // alert("Purchase Successful!"); // Or toast
        }
        setIsLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in pb-12">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FEF7E0] border border-[#FEEFC3] text-[#B06000] text-sm font-bold shadow-sm animate-pulse-slow">
                    <img src="https://cryptologos.cc/logos/blockdag-bdag-logo.png?v=032" alt="BDAG" className="w-4 h-4" onError={(e) => e.target.style.display = 'none'} />
                    <span>Official Token Presale</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#F9AB00] to-[#FFD54F] bg-clip-text text-transparent drop-shadow-sm">
                    Invest in the Future
                </h1>
                <p className="text-[#5F6368] text-lg max-w-lg mx-auto">
                    Secure your allocation of BDAG tokens at the exclusive presale rate.
                </p>
            </div>

            {!isPresaleActive && (
                <div className="bg-[#FEF2F2] border border-[#FCA5A5] text-[#B91C1C] p-4 rounded-xl flex items-center gap-3 font-medium shadow-sm">
                    <Info size={20} className="text-[#EF4444]" />
                    <span>Presale is currently paused by the administrator.</span>
                </div>
            )}

            <div className={`relative bg-white rounded-xl p-6 md:p-8 shadow-xl border border-[#DADCE0] overflow-hidden ${!isPresaleActive ? 'opacity-60 pointer-events-none grayscale' : ''}`}>
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FEF7E0] to-transparent rounded-full blur-3xl -z-10 opacity-50"></div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#202124]">Swap Tokens</h2>
                    <div className="flex items-center gap-2 bg-[#F8F9FA] px-3 py-1.5 rounded-full border border-[#E8EAED] text-sm font-medium text-[#5F6368]">
                        <Info size={14} />
                        <span>1 BDAG = {presaleRate} SNI</span>
                    </div>
                </div>

                {/* FROM input */}
                <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E8EAED] hover:border-[#DADCE0] transition-colors group relative">
                    <div className="flex justify-between text-sm text-[#5F6368] mb-2 font-medium">
                        <span>You Pay</span>
                        <span>Balance: {parseFloat(bdagBalance).toFixed(4)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <input
                            type="number"
                            placeholder="0.0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-transparent border-none text-3xl font-bold text-[#202124] focus:outline-none w-full placeholder:text-[#DADCE0]"
                        />
                        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm border border-[#E8EAED] min-w-[120px] justify-center">
                            <img src="https://cryptologos.cc/logos/blockdag-bdag-logo.png?v=032" onError={(e) => e.target.style.display = 'none'} alt="" className="w-6 h-6" />
                            <span className="font-bold text-[#202124]">BDAG</span>
                        </div>
                    </div>
                    {account && (
                        <button
                            onClick={handleMax}
                            className="absolute bottom-5 left-0 ml-5 text-xs font-bold text-[#1A73E8] hover:text-[#174EA6] uppercase tracking-wider hidden group-hover:block transition-all"
                        >
                            Use Max
                        </button>
                    )}
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-3 relative z-10">
                    <div className="bg-white p-2 rounded-xl border border-[#E8EAED] shadow-sm text-[#5F6368]">
                        <ArrowDown size={20} />
                    </div>
                </div>

                {/* TO input */}
                <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E8EAED]">
                    <div className="flex justify-between text-sm text-[#5F6368] mb-2 font-medium">
                        <span>You Receive</span>
                        <span>Rate: {presaleRate}x</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="0.0"
                            value={amount ? (parseFloat(amount) * presaleRate).toLocaleString() : "0.0"}
                            readOnly
                            className="bg-transparent border-none text-3xl font-bold text-[#202124] focus:outline-none w-full placeholder:text-[#DADCE0]"
                        />
                        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm border border-[#E8EAED] min-w-[120px] justify-center">
                            <Coins size={20} className="text-[#1967D2]" />
                            <span className="font-bold text-[#202124]">SNISHOP</span>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-8">
                    {!account ? (
                        <button
                            className="w-full py-4 rounded-xl bg-[#E8F0FE] text-[#1967D2] font-bold text-lg hover:bg-[#D2E3FC] transition-all flex items-center justify-center gap-2"
                            onClick={connectWallet}
                            disabled={isConnecting}
                        >
                            <Wallet size={20} />
                            {isConnecting ? "Connecting..." : "Connect Wallet to Purchase"}
                        </button>
                    ) : (
                        <button
                            className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all transform active:scale-[0.98] ${isLoading || !amount || parseFloat(amount) < MIN_BUY || !isPresaleActive
                                ? 'bg-[#DADCE0] cursor-not-allowed shadow-none text-[#9AA0A6]'
                                : 'bg-gradient-to-r from-[#F9AB00] to-[#F57F17] hover:shadow-xl hover:brightness-110'
                                }`}
                            onClick={handleSwap}
                            disabled={isLoading || !amount || parseFloat(amount) < MIN_BUY || !isPresaleActive}
                        >
                            {isLoading ? "Processing Transaction..." : parseFloat(amount) < MIN_BUY ? `Minimum Buy ${MIN_BUY} BDAG` : "Confirm Swap"}
                        </button>
                    )}
                </div>

                <div className="mt-6 text-center text-xs text-[#9AA0A6] font-medium flex items-center justify-center gap-1">
                    <Info size={12} /> Gas fees are paid in BDAG network currency.
                </div>
            </div>
        </div>
    );
}
