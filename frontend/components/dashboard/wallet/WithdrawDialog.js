'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, DollarSign } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { requestWithdrawal } from '@/app/actions/wallet';

const withdrawSchema = z.object({
    amount: z.coerce.number().min(50000, "Minimum withdrawal is IDR 50,000"),
    bankName: z.string().min(3, "Bank Name is required"),
    accountNumber: z.string().min(5, "Account Number is required"),
});

export function WithdrawDialog({ userId, currentBalance, trigger }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(withdrawSchema),
        defaultValues: {
            amount: '',
            bankName: '',
            accountNumber: ''
        }
    });

    async function onSubmit(data) {
        if (data.amount > currentBalance) {
            toast({
                title: "Insufficient Funds",
                description: "Amount exceeds current commission balance.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            const result = await requestWithdrawal(userId, data);
            if (result.success) {
                toast({
                    title: "Request Submitted",
                    description: "Your withdrawal request is being processed.",
                    variant: "success",
                });
                setOpen(false);
                reset();
            } else {
                toast({
                    title: "Error",
                    description: result.message,
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "System Error",
                description: "Please try again later.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button>Withdraw Funds</Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Withdraw Funds</DialogTitle>
                    <DialogDescription>
                        Transfer your commission balance to your bank account.
                        <br />
                        <span className="font-bold text-[#137333]">Available: IDR {currentBalance.toLocaleString()}</span>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Amount (IDR)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F6368]" size={16} />
                            <Input type="number" {...register('amount')} className="pl-10" placeholder="50000" />
                        </div>
                        {errors.amount && <p className="text-xs text-red-500">{errors.amount.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Bank Name</label>
                        <Input {...register('bankName')} placeholder="e.g. BCA, Mandiri" />
                        {errors.bankName && <p className="text-xs text-red-500">{errors.bankName.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Account Number</label>
                        <Input {...register('accountNumber')} placeholder="1234567890" />
                        {errors.accountNumber && <p className="text-xs text-red-500">{errors.accountNumber.message}</p>}
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Request Withdraw
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
