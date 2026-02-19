
"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import { X, Send, CreditCard, LogOut } from "lucide-react";

const CONTRACT_ADDRESS = "0x960B6DDb29dA4eC483234e9216CFb8B4407cC640";
const ERC20_ABI = [
    "function transfer(address to, uint amount) returns (bool)",
    "function decimals() view returns (uint8)"
];

export default function WalletDashboard({ account, balance, onClose, disconnectWallet }) {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleTransfer = async () => {
        if (!recipient || !amount) return;
        setIsLoading(true);
        setStatus(null);

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, ERC20_ABI, signer);

            // Assume 18 decimals or fetch
            let decimals = 18;
            try {
                decimals = await contract.decimals();
            } catch (err) {
                console.warn("Failed to fetch decimals, defaulting to 18", err);
            }
            const parsedAmount = ethers.parseUnits(amount, decimals);

            const tx = await contract.transfer(recipient, parsedAmount);
            await tx.wait();

            setStatus("success");
            setAmount("");
            setRecipient("");
        } catch (error) {
            console.error("Transfer Error:", error);
            setStatus("error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="wallet-dashboard-overlay" style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(5px)", zIndex: 2000,
            display: "flex", justifyContent: "center", alignItems: "center"
        }}>
            <div className="wallet-dashboard" style={{
                background: "white", padding: "30px", borderRadius: "16px", width: "400px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)", position: "relative"
            }}>
                <button onClick={onClose} style={{ position: "absolute", top: "15px", right: "15px", border: "none", background: "none", cursor: "pointer" }}>
                    <X size={24} color="#333" />
                </button>

                <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <CreditCard size={20} color="#0066FF" /> Wallet Dashboard
                </h3>

                <div style={{ background: "#F5F7FA", padding: "15px", borderRadius: "12px", marginBottom: "20px" }}>
                    <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "5px" }}>Connected Account</p>
                    <div style={{ wordBreak: "break-all", fontFamily: "monospace", fontSize: "0.85rem", fontWeight: "600" }}>{account}</div>
                </div>

                <div style={{ background: "linear-gradient(135deg, #0066FF 0%, #0052CC 100%)", padding: "20px", borderRadius: "12px", color: "white", marginBottom: "25px" }}>
                    <p style={{ fontSize: "0.9rem", opacity: 0.8, marginBottom: "5px" }}>Total Balance</p>
                    <div style={{ fontSize: "2rem", fontWeight: "700" }}>{balance} <span style={{ fontSize: "1rem" }}>SNISHOP</span></div>
                </div>

                <h4 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "15px" }}>Transfer Token</h4>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", fontSize: "0.85rem", color: "#666", marginBottom: "5px" }}>Recipient Address</label>
                    <input
                        type="text"
                        placeholder="0x..."
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
                    />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "0.85rem", color: "#666", marginBottom: "5px" }}>Amount</label>
                    <input
                        type="number"
                        placeholder="0.0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
                    />
                </div>

                <button
                    onClick={handleTransfer}
                    disabled={isLoading || !amount || !recipient}
                    className="btn btn-primary"
                    style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
                >
                    {isLoading ? "Processing..." : <> <Send size={16} /> Transfer Now </>}
                </button>

                {status === "success" && <p style={{ color: "green", marginTop: "10px", fontSize: "0.9rem" }}>Transfer Successful!</p>}
                {status === "error" && <p style={{ color: "red", marginTop: "10px", fontSize: "0.9rem" }}>Transfer Failed!</p>}

                <div style={{ marginTop: "20px", borderTop: "1px solid #eee", paddingTop: "15px" }}>
                    <button
                        onClick={disconnectWallet}
                        style={{
                            width: "100%",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                            color: "#FF3B30", background: "none", border: "none", cursor: "pointer", fontWeight: "600"
                        }}
                    >
                        <LogOut size={16} /> Disconnect Wallet
                    </button>
                </div>

            </div>
        </div>
    );
}
