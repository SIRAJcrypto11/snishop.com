import { PrismaClient } from '@prisma/client';
import { Package, Plus, Edit2 } from 'lucide-react';
import { ServiceDialog } from '../../../../components/dashboard/services/ServiceDialog';
import { ServiceCard } from '../../../../components/dashboard/services/ServiceCard';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

async function getServices() {
    try {
        const services = await prisma.service.findMany({
            orderBy: { category: 'asc' }
        });
        return services;
    } catch (e) {
        console.error("Failed to fetch services:", e);
        return [];
    }
}


export default async function ServiceManager() {
    const services = await getServices();

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#202124]">Service Management</h1>
                    <p className="text-[#5F6368] mt-1">Configure and manage your platform&apos;s service offerings.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2 text-sm text-[#5F6368] bg-white border border-[#DADCE0] px-3 py-1.5 rounded-lg shadow-sm">
                        <Package size={16} />
                        <span>{services.length} Services Active</span>
                    </div>
                    <ServiceDialog />
                </div>
            </div>

            {services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div key={service.id} className="transform transition-all duration-300 hover:-translate-y-1">
                            <ServiceCard service={service} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-[#DADCE0] p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-24 h-24 bg-[#F8F9FA] rounded-full flex items-center justify-center mb-6">
                        <Package size={40} className="text-[#BDC1C6]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#202124] mb-2">No Services Configured</h3>
                    <p className="text-[#5F6368] max-w-md mx-auto mb-8">
                        Get started by adding your first service package. These will be available for users to purchase.
                    </p>
                    <ServiceDialog />
                </div>
            )}
        </div>
    );
}
