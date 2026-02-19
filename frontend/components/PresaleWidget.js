
"use client";
import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useSnishop } from "../context/SnishopContext";

export default function PresaleWidget() {
    const { account, connectWallet, buyTokens } = useSnishop();

    const [amount, setAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null); // success, error

    const RATE = 1000; // 1 BDAG = 1000 SNISHOP

    const handleBuy = async () => {
        if (!amount || parseFloat(amount) <= 0) return;
        setIsLoading(true);
        setStatus(null);

        const success = await buyTokens(amount);

        if (success) {
            setStatus("success");
            setAmount("");
        } else {
            setStatus("error");
        }
        setIsLoading(false);
    };

    return (
        <div className="presale-widget fade-in glass-card" style={{
            padding: "30px",
            borderRadius: "24px",
            maxWidth: "400px",
            margin: "0 auto",
            boxShadow: "0 20px 50px rgba(0,0,0,0.1)"
        }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "10px", color: "var(--text-primary)" }}>Pre-Sale SNISHOP</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>1 BDAG = {RATE} SNISHOP</p>

            {!account ? (
                <button onClick={connectWallet} className="btn btn-primary" style={{ width: "100%" }}>
                    Connect Wallet to Buy
                </button>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div>
                        <label style={{ display: "block", color: "var(--text-secondary)", marginBottom: "5px", fontSize: "0.9rem" }}>Amount (BDAG)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.0"
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "12px",
                                border: "1px solid var(--border)",
                                background: "var(--surface)",
                                color: "var(--text-primary)",
                                fontSize: "1.1rem"
                            }}
                        />
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                        <span>You Receive:</span>
                        <span style={{ color: "var(--primary)", fontWeight: "bold" }}>
                            {amount ? (parseFloat(amount) * RATE).toLocaleString() : "0"} SNISHOP
                        </span>
                    </div>

                    <button
                        onClick={handleBuy}
                        disabled={isLoading || !amount}
                        className="btn btn-primary"
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                            opacity: (isLoading || !amount) ? 0.7 : 1
                        }}
                    >
                        {isLoading ? <div className="spinner"></div> : <Send size={18} />}
                        {isLoading ? "Processing..." : "Buy Token"}
                    </button>

                    {status === "success" && (
                        <div style={{
                            background: "rgba(40, 167, 69, 0.2)",
                            color: "#28a745",
                            padding: "10px",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "0.9rem"
                        }}>
                            <CheckCircle2 size={16} /> Purchase Successful!
                        </div>
                    )}

                    {status === "error" && (
                        <div style={{
                            background: "rgba(220, 53, 69, 0.2)",
                            color: "#dc3545",
                            padding: "10px",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "0.9rem"
                        }}>
                            <AlertCircle size={16} /> Transaction Failed.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
