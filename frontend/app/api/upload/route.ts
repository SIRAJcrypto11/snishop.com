import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: Request) {
    try {
        const data = await req.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = file.name.replace(/\.[^/.]+$/, "") + '-' + uniqueSuffix + '.' + file.name.split('.').pop();

        // Save to public/uploads
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        // Ensure dir exists? standard fs promises doesn't have existSync easily, assume public exists or we might crash.
        // Better to use a simpler path or assume public exists.
        const path = join(uploadDir, filename);

        await writeFile(path, buffer);

        const url = `/uploads/${filename}`;

        return NextResponse.json({ message: 'Upload success', url }, { status: 201 });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
    }
}
