"use client";
import React, { useState } from 'react';
import { useSnishop } from '../../../context/SnishopContext';
import { Shield, Settings, PauseCircle, PlayCircle, Save, Download, Activity } from 'lucide-react';

export default function AdminPage() {
    const {
        presaleRate,
        isPresaleActive,
        updatePresaleRate,
        togglePresaleStatus,
        withdrawFunds,
        transactions,
        bdagBalance // In real app, this would be contract balance
    } = useSnishop();

    const [newRate, setNewRate] = useState(presaleRate);
    const [withdrawAmount, setWithdrawAmount] = useState("");

    const handleRateUpdate = () => {
        updatePresaleRate(parseInt(newRate));
        alert("Exchange Rate Updated!");
    };

    const handleWithdraw = async () => {
        if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
        await withdrawFunds(withdrawAmount);
        alert(`Withdrawn ${withdrawAmount} BDAG to owner wallet.`);
        setWithdrawAmount("");
    };

    return (
        <div className="admin-page">
            <h1 className="page-title">
                <Shield size={32} /> Admin Dashboard
            </h1>

            <div className="admin-grid">

                {/* Presale Settings */}
                <div className="admin-card">
                    <div className="card-header">
                        <Settings size={20} />
                        <h3>Presale Configuration</h3>
                    </div>

                    <div className="control-group">
                        <label>Presale Status</label>
                        <button
                            className={`toggle-btn ${isPresaleActive ? 'active' : 'paused'}`}
                            onClick={togglePresaleStatus}
                        >
                            {isPresaleActive ? (
                                <><PauseCircle size={18} /> Pause Presale</>
                            ) : (
                                <><PlayCircle size={18} /> Resume Presale</>
                            )}
                        </button>
                    </div>

                    <div className="control-group">
                        <label>Exchange Rate (1 BDAG = X SNI)</label>
                        <div className="input-with-action">
                            <input
                                type="number"
                                value={newRate}
                                onChange={(e) => setNewRate(e.target.value)}
                            />
                            <button onClick={handleRateUpdate}>
                                <Save size={18} /> Update
                            </button>
                        </div>
                    </div>
                </div>

                {/* Treasury Management */}
                <div className="admin-card">
                    <div className="card-header">
                        <Download size={20} />
                        <h3>Treasury Management</h3>
                    </div>

                    <div className="balance-info">
                        <span>Contract Balance (Simulated):</span>
                        <strong>{parseFloat(bdagBalance).toFixed(4)} BDAG</strong>
                    </div>

                    <div className="control-group">
                        <label>Withdraw to Owner</label>
                        <div className="input-with-action">
                            <input
                                type="number"
                                placeholder="Amount BDAG"
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                            />
                            <button onClick={handleWithdraw} className="withdraw-btn">
                                Withdraw
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="admin-card full-width">
                    <div className="card-header">
                        <Activity size={20} />
                        <h3>System Activity Log</h3>
                    </div>
                    <div className="activity-table-wrapper">
                        <table className="activity-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Hash</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx) => (
                                    <tr key={tx.id}>
                                        <td>{tx.date}</td>
                                        <td>{tx.type}</td>
                                        <td>{tx.amount}</td>
                                        <td>
                                            <span className={`status-badge ${tx.status.toLowerCase()}`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="hash">
                                            {tx.hash ? `${tx.hash.substring(0, 10)}...` : '-'}
                                        </td>
                                    </tr>
                                ))}
                                {transactions.length === 0 && (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No activity recorded.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .page-title {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 32px;
                    color: var(--text-primary);
                }
                .admin-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 24px;
                }
                .admin-card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: 20px;
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .admin-card.full-width {
                    grid-column: 1 / -1;
                }
                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: var(--text-primary);
                    margin-bottom: 8px;
                }
                .card-header h3 {
                    font-size: 1.2rem;
                    font-weight: 600;
                }
                
                .control-group label {
                    display: block;
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                    margin-bottom: 8px;
                }
                .toggle-btn {
                    width: 100%;
                    padding: 12px;
                    border-radius: 12px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .toggle-btn.active {
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                    border: 1px solid #ef4444;
                }
                .toggle-btn.paused {
                    background: rgba(16, 185, 129, 0.1);
                    color: #10B981;
                    border: 1px solid #10B981;
                }

                .input-with-action {
                    display: flex;
                    gap: 12px;
                }
                .input-with-action input {
                    flex: 1;
                    padding: 10px 16px;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    color: var(--text-primary);
                }
                .input-with-action button {
                    padding: 10px 20px;
                    background: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .withdraw-btn {
                    background: var(--bg-secondary) !important;
                    color: var(--text-primary) !important;
                    border: 1px solid var(--border) !important;
                }
                .withdraw-btn:hover {
                    background: var(--border) !important;
                }

                .balance-info {
                    font-size: 1.1rem;
                    display: flex;
                    justify-content: space-between;
                    padding: 12px;
                    background: var(--bg-secondary);
                    border-radius: 12px;
                }

                .activity-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 0.9rem;
                }
                .activity-table th {
                    text-align: left;
                    padding: 12px;
                    color: var(--text-secondary);
                    font-weight: 500;
                    border-bottom: 1px solid var(--border);
                }
                .activity-table td {
                    padding: 12px;
                    border-bottom: 1px solid var(--border);
                    color: var(--text-primary);
                }
                .status-badge {
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    text-transform: capitalize;
                }
                .status-badge.completed {
                    background: rgba(16, 185, 129, 0.1);
                    color: #10B981;
                }
                .hash {
                    font-family: monospace;
                    color: var(--text-secondary);
                }
            `}</style>
        </div>
    );
}
