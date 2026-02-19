'use client';

import { useState } from 'react';
import { Package, Edit2, Loader2, Power } from 'lucide-react';
import { ServiceDialog } from './ServiceDialog';
import { toggleServiceStatus } from '../../../app/actions/services';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Card } from '../../ui/card';
import { cn } from '../../../lib/utils';
import { useToast } from "../../ui/use-toast";
// Autonomous Correction: I installed @radix-ui/react-toast but didn't build the Toaster component yet.
// I will use `alert` for now to ensure robustness, or better, simple state feedback.

export function ServiceCard({ service }) {
    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast();

    async function handleToggleStatus() {
        setIsLoading(true);
        try {
            await toggleServiceStatus(service.id, service.isActive);
            toast({
                title: service.isActive ? "Service Deactivated" : "Service Activated",
                description: `Service has been ${service.isActive ? 'disabled' : 'enabled'}.`,
                variant: service.isActive ? "default" : "success",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update service status.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="p-5 hover:shadow-md transition-all group relative border-[#DADCE0] bg-white">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ServiceDialog
                    serviceToEdit={service}
                    trigger={
                        <button className="p-2 bg-[#F1F3F4] rounded-lg hover:bg-[#E8F0FE] hover:text-[#1967D2] text-[#5F6368] transition-colors">
                            <Edit2 size={14} />
                        </button>
                    }
                />
                <button
                    onClick={handleToggleStatus}
                    disabled={isLoading}
                    className={cn(
                        "p-2 rounded-lg transition-colors",
                        service.isActive
                            ? "bg-[#FCE8E6] text-[#C5221F] hover:bg-[#FAD2CF]"
                            : "bg-[#E6F4EA] text-[#137333] hover:bg-[#CEEAD6]"
                    )}
                >
                    {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Power size={14} />}
                </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#E8F0FE] rounded-lg text-[#1967D2]">
                    <Package size={20} />
                </div>
                <Badge variant="secondary" className="bg-[#F8F9FA] text-[#5F6368] border border-[#E8EAED] uppercase tracking-wide">
                    {service.category}
                </Badge>
            </div>

            <h3 className="text-lg font-bold text-[#202124] mb-2 truncate" title={service.name}>{service.name}</h3>
            <p className="text-[#5F6368] text-sm mb-4 line-clamp-2 h-10">{service.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-[#F1F3F4]">
                <div>
                    <p className="text-xs text-[#5F6368] mb-0.5">Price</p>
                    <p className="font-mono font-bold text-[#202124]">IDR {(service.basePrice || 0).toLocaleString()}</p>
                </div>
                <Badge variant={service.isActive ? "success" : "destructive"}>
                    {service.isActive ? 'ACTIVE' : 'INACTIVE'}
                </Badge>
            </div>
        </Card>
    );
}
