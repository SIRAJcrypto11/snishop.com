"use client";
import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { claimJob } from '../../app/lib/actions_orders';
import { useRouter } from 'next/navigation';

export default function ClaimButton({ jobId }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleClaim = async () => {
        setLoading(true);
        try {
            const res = await claimJob(jobId);
            if (res.error) {
                alert(res.error);
            } else {
                // Success: Redirect to active jobs or just refresh
                // router.refresh(); // handled by revalidatePath in action
                router.push('/dashboard/admin/jobs/active');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to claim job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleClaim}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? <Loader2 className="animate-spin" size={18} /> : (
                <>Claim Job <ArrowRight size={18} /></>
            )}
        </button>
    );
}
