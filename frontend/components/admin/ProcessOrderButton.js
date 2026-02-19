"use client";
import React, { useState } from 'react';
import { ArrowRight, Upload, CheckCircle, Loader2, X } from 'lucide-react';
import { completeJob } from '../../app/lib/actions_orders';
import { useRouter } from 'next/navigation';

export default function ProcessOrderButton({ jobId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const router = useRouter();

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!file) return alert('Please select a file first');

        setUploading(true);
        try {
            // 1. Upload File
            const formData = new FormData();
            formData.append('file', file);

            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!uploadRes.ok) throw new Error('Upload failed');
            const { url } = await uploadRes.json();

            // 2. Complete Job
            setProcessing(true);
            setUploading(false); // Done uploading, now processing

            const res = await completeJob(jobId, url);
            if (res.error) {
                alert(res.error);
            } else {
                setIsModalOpen(false);
                router.refresh(); // Refresh to remove from active list
            }
        } catch (err) {
            console.error(err);
            alert('Failed to process order');
        } finally {
            setUploading(false);
            setProcessing(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
            >
                Process Order <ArrowRight size={18} />
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                    <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 w-full max-w-md relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <h3 className="text-xl font-bold text-white mb-2">Complete Order</h3>
                        <p className="text-gray-400 text-sm mb-6">Upload the result file (proof of work) to complete this order and receive your commission.</p>

                        <div className="border-2 border-dashed border-gray-800 rounded-xl p-8 text-center mb-6 hover:border-blue-500/50 transition-colors">
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                                <div className="p-3 bg-gray-800 rounded-full text-blue-400">
                                    <Upload size={24} />
                                </div>
                                <span className="text-gray-300 font-medium">
                                    {file ? file.name : 'Click to upload file'}
                                </span>
                                <span className="text-gray-500 text-xs">PDF, JPG, PNG, ZIP</span>
                            </label>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={!file || uploading || processing}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {uploading ? <Loader2 className="animate-spin" size={20} /> :
                                processing ? <Loader2 className="animate-spin" size={20} /> :
                                    <><CheckCircle size={20} /> Complete Order</>}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
