'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit2, Loader2 } from 'lucide-react';
import { useToast } from '../../ui/use-toast';

import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../ui/dialog';
// Autonomous Correction: I forgot Select component. I will use standard HTML select or standard input for now to avoid breaking flow, or quickly create select component.
// Decision: I will use standard standard <select> with Tailwind classes for robustness until UI component is built.

import { createService, updateService } from '../../../app/actions/services';

const formSchema = z.object({
    name: z.string().min(3, "Name is required"),
    slug: z.string().min(3, "Slug is required"),
    description: z.string().min(10, "Description is required"),
    basePrice: z.coerce.number().min(0, "Price is required"),
    category: z.enum(["SOFTWARE", "DESIGN", "WRITING", "MARKETING", "OTHER"]),
    adminCommission: z.coerce.number().min(0, "Commission is required"),
    adminCommissionType: z.enum(["FIXED", "PERCENTAGE"]),
});

export function ServiceDialog({ serviceToEdit = null, trigger }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: serviceToEdit || {
            name: '',
            slug: '',
            description: '',
            basePrice: 0,
            category: 'SOFTWARE',
            adminCommission: 0,
            adminCommissionType: 'FIXED',
        }
    });

    async function onSubmit(data) {
        setLoading(true);
        try {
            if (serviceToEdit) {
                const result = await updateService(serviceToEdit.id, data);
                if (result.success) {
                    toast({
                        title: "Success",
                        description: "Service updated successfully!",
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
            } else {
                const result = await createService(data);
                if (result.success) {
                    toast({
                        title: "Success",
                        description: "Service created successfully!",
                        variant: "success",
                    });
                    setOpen(false);
                    reset();
                } else {
                    toast({
                        title: "Error",
                        description: "Failed to create service",
                        variant: "destructive",
                    });
                }
            }
        } catch (error) {
            toast({
                title: "System Error",
                description: "Something went wrong. Please try again.",
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
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Service
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>{serviceToEdit ? 'Edit Service' : 'Create New Service'}</DialogTitle>
                    <DialogDescription>
                        {serviceToEdit ? 'Update service details below.' : 'Add a new service to the marketplace.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Service Name</label>
                        <Input {...register('name')} placeholder="e.g. Turnitin Check" />
                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Slug (URL)</label>
                        <Input {...register('slug')} placeholder="e.g. turnitin-check" />
                        {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <select
                            {...register('category')}
                            className="flex h-10 w-full rounded-md border border-[#DADCE0] bg-white px-3 py-2 text-sm text-[#202124] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
                        >
                            <option value="SOFTWARE">Software & Apps</option>
                            <option value="DESIGN">Design & Creative</option>
                            <option value="WRITING">Writing & Translation</option>
                            <option value="MARKETING">Marketing</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            {...register('description')}
                            className="flex w-full rounded-md border border-[#DADCE0] bg-white px-3 py-2 text-sm text-[#202124] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
                            rows={3}
                            placeholder="Describe the service..."
                        />
                        {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Base Price (IDR)</label>
                            <Input type="number" {...register('basePrice')} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Commission</label>
                            <Input type="number" {...register('adminCommission')} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Commission Type</label>
                        <select
                            {...register('adminCommissionType')}
                            className="flex h-10 w-full rounded-md border border-[#DADCE0] bg-white px-3 py-2 text-sm text-[#202124] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
                        >
                            <option value="FIXED">Fixed Amount (IDR)</option>
                            <option value="PERCENTAGE">Percentage (%)</option>
                        </select>
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {serviceToEdit ? 'Save Changes' : 'Create Service'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
