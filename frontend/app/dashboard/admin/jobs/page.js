import { PrismaClient } from '@prisma/client';
import { Briefcase, Clock, DollarSign, ArrowRight } from 'lucide-react';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

async function getAvailableJobs() {
    try {
        const jobs = await prisma.order.findMany({
            where: { status: 'PAID' },
            include: { service: true, user: true },
            orderBy: { createdAt: 'asc' }, // Oldest first
        });
        return jobs;
    } catch (e) {
        console.error("Failed to fetch jobs:", e);
        return [];
    }
}

export default async function JobBoard() {
    const jobs = await getAvailableJobs();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#202124]">available Jobs</h1>

            {jobs.length === 0 ? (
                <div className="text-center p-12 bg-white rounded-xl border border-[#DADCE0] text-[#5F6368] shadow-sm">
                    <Briefcase size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-lg">No open jobs available at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {jobs.map(job => (
                        <div key={job.id} className="bg-white border border-[#DADCE0] rounded-xl p-5 hover:border-[#1A73E8] hover:shadow-md transition-all group cursor-pointer relative">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-[#E8F0FE] rounded-lg text-[#1967D2]">
                                        <Briefcase size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#202124]">{job.service.name}</h3>
                                        <div className="flex items-center gap-3 text-sm text-[#5F6368] mt-1">
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} /> {new Date(job.createdAt).toLocaleString()}
                                            </span>
                                            <span className="w-1 h-1 bg-[#DADCE0] rounded-full"></span>
                                            <span className="text-[#5F6368]">Customer: {job.user.name}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden md:block">
                                        <p className="text-xs text-[#5F6368]">Potential Commission</p>
                                        <p className="font-mono text-[#137333] font-bold">
                                            {job.service.adminCommissionType === 'PERCENTAGE'
                                                ? `${job.service.adminCommission}%`
                                                : `IDR ${(job.service.adminCommission || 0).toLocaleString()}`}
                                        </p>
                                    </div>
                                    <button className="p-2 border border-[#DADCE0] rounded-full text-[#1A73E8] hover:bg-[#E8F0FE] transition-colors">
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
