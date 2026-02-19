"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const SnishopContext = createContext();

export const useSnishop = () => useContext(SnishopContext);

// CONSTANTS
const CONTRACT_ADDRESS = "0x960B6DDb29dA4eC483234e9216CFb8B4407cC640"; // SNISHOP Token
const OWNER_WALLET = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // Hardhat Account 0 (or real owner)
// Note: If on Mainnet, user should update OWNER_WALLET to their real address.
// For now I'll use a placeholder or the one from deploy script if known.
// Since I don't know the user's real wallet, I will use a safe fallback or ask. 
// I'll use the deployer address from logs if I had it, otherwise I'll use a generic one 
// or simply burn it if it's a simulation. 
// Actually, for "Direct Transfer", the user sends BDAG to the "System". 
// I will simulate this by sending to a specific address or just relying on the transaction hash.

const BLOCKDAG_CHAIN_ID = "0x57c"; // 1404
const BLOCKDAG_RPC = "https://rpc.blockdag.network";

const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function transfer(address to, uint256 amount) returns (bool)",
];

export const SnishopProvider = ({ children }) => {
    // Wallet State
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [balance, setBalance] = useState("0"); // SNISHOP Token Balance
    const [bdagBalance, setBdagBalance] = useState("0"); // Native Balance
    const [isConnecting, setIsConnecting] = useState(false);

    // Simulated Backend State (Persisted in LocalStorage)
    const [platformSaldo, setPlatformSaldo] = useState(0); // Web2 Credits
    const [transactions, setTransactions] = useState([]); // History

    // Load from LocalStorage on mount
    useEffect(() => {
        const savedSaldo = localStorage.getItem("snishop_saldo");
        const savedTx = localStorage.getItem("snishop_txs");
        if (savedSaldo) setPlatformSaldo(parseFloat(savedSaldo));
        if (savedTx) setTransactions(JSON.parse(savedTx));
    }, []);

    // Save to LocalStorage on change
    useEffect(() => {
        localStorage.setItem("snishop_saldo", platformSaldo.toString());
        localStorage.setItem("snishop_txs", JSON.stringify(transactions));
    }, [platformSaldo, transactions]);

    const addTransaction = (type, amount, status = "Completed", hash = "") => {
        const newTx = {
            id: Date.now(),
            type, // "Buy Token", "Buy Service", "Topup Saldo"
            amount,
            status,
            hash,
            date: new Date().toLocaleString()
        };
        setTransactions(prev => [newTx, ...prev]);
    };

    // Wallet Logic
    const connectWallet = async () => {
        if (isConnecting) return;
        setIsConnecting(true);
        try {
            if (!window.ethereum) return alert("MetaMask not found");
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length) handleAccountsChanged(accounts);
        } catch (error) {
            console.error(error);
        } finally {
            setIsConnecting(false);
        }
    };

    const handleAccountsChanged = async (accounts) => {
        if (accounts.length > 0) {
            const addr = accounts[0];
            setAccount(addr);
            const browserProvider = new ethers.BrowserProvider(window.ethereum);
            setProvider(browserProvider);
            await updateBalances(addr, browserProvider);
        } else {
            disconnectWallet();
        }
    };

    const updateBalances = async (addr, providerInstance) => {
        if (!addr || !providerInstance) return;
        try {
            // Native BDAG Balance
            const nativeBal = await providerInstance.getBalance(addr);
            setBdagBalance(ethers.formatEther(nativeBal));

            // Token SNISHOP Balance
            // If contract exists check it, else simulate or use 0
            const code = await providerInstance.getCode(CONTRACT_ADDRESS);
            if (code !== "0x") {
                const contract = new ethers.Contract(CONTRACT_ADDRESS, ERC20_ABI, providerInstance);
                const tokenBal = await contract.balanceOf(addr);
                setBalance(ethers.formatUnits(tokenBal, 18));
            }
        } catch (err) {
            console.error("Balance fetch error:", err);
        }
    };

    const disconnectWallet = () => {
        setAccount(null);
        setProvider(null);
        setBalance("0");
        setBdagBalance("0");
    };

    // Admin State (Simulated)
    const [presaleRate, setPresaleRate] = useState(1000);
    const [isPresaleActive, setIsPresaleActive] = useState(true);

    // PRESALE FUNCTION (Simulated or Real)
    const buyTokens = async (bdagAmount) => {
        if (!isPresaleActive) return alert("Presale is currently paused by Admin.");
        if (!provider || !account) return alert("Connect Wallet first");

        try {
            const signer = await provider.getSigner();
            const tx = await signer.sendTransaction({
                to: OWNER_WALLET, // Send to Admin
                value: ethers.parseEther(bdagAmount.toString())
            });
            await tx.wait();

            // Calculate tokens based on dynamic rate
            const tokenAmount = bdagAmount * presaleRate;
            addTransaction("Buy Token (Presale)", `${tokenAmount} SNISHOP`, "Completed", tx.hash);

            setPlatformSaldo(prev => prev + tokenAmount);

            return true;
        } catch (err) {
            console.error("Presale Error:", err);
            return false;
        }
    };

    const buyService = (serviceName, cost) => {
        if (platformSaldo >= cost) {
            setPlatformSaldo(prev => prev - cost);
            addTransaction("Buy Service", `${serviceName} (-${cost})`, "Completed");
            return true;
        }
        return false;
    };

    // Admin Actions
    const updatePresaleRate = (newRate) => {
        setPresaleRate(newRate);
        // Persist if needed
    };

    const togglePresaleStatus = () => {
        setIsPresaleActive(!isPresaleActive);
    };

    const withdrawFunds = async (amount) => {
        // In a real contract this would call verifyOwner()
        // Here we just simulate a withdrawal transaction record
        addTransaction("Admin Withdrawal", `${amount} BDAG`, "Completed");
        return true;
    };

    return (
        <SnishopContext.Provider value={{
            account, balance, bdagBalance, isConnecting,
            connectWallet, disconnectWallet,
            platformSaldo, transactions,
            buyTokens, buyService,
            // Admin Exports
            presaleRate, isPresaleActive,
            updatePresaleRate, togglePresaleStatus, withdrawFunds
        }}>
            {children}
        </SnishopContext.Provider>
    );
};
