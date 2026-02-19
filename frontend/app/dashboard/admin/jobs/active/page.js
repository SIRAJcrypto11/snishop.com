import { PrismaClient } from '@prisma/client';
import { auth } from '../../../../../auth'; // Adjust relative path
import { Briefcase, Clock, ArrowRight, FileText } from 'lucide-react';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

async function getActiveJobs(userId) {
    const jobs = await prisma.order.findMany({
        where: {
            status: 'PROCESSING',
            handledById: userId
        },
        include: { service: true, user: true },
        orderBy: { updatedAt: 'desc' },
    });
    return jobs;
}

import ProcessOrderButton from '@/components/admin/ProcessOrderButton';

export default async function ActiveJobs() {
    const session = await auth();
    if (!session?.user) return <div>Unauthorized</div>;

    const jobs = await getActiveJobs(session.user.id);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">My Active Jobs</h1>
            </div>

            <div className="grid gap-4">
                {jobs.length === 0 ? (
                    <div className="text-center p-12 bg-[#111] rounded-xl border border-blue-900/30 text-gray-500">
                        <Briefcase size={48} className="mx-auto mb-4 opacity-50" />
                        <p>You have no active jobs. Go to Job Board to claim one.</p>
                    </div>
                ) : (
                    jobs.map((job) => (
                        <div key={job.id} className="bg-[#111] border border-blue-900/30 rounded-xl p-5 hover:border-blue-500/50 transition-all">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-500 animate-pulse">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{job.service.name}</h3>
                                        <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                                            <span>ID: #{job.id.slice(-6)}</span>
                                            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                            <span className="text-gray-300">Customer: {job.user.name}</span>
                                        </div>
                                    </div>
                                </div>

                                <ProcessOrderButton jobId={job.id} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
