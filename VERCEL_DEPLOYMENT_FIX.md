## Vercel Deployment Fix - pnpm/npm Monorepo Configuration

### Problem
Build failed dengan error: `Command pnpm -C frontend run build exited with 1`

Penyebab: 
- Vercel menggunakan npm sebagai default package manager
- Direktif `pnpm -C frontend` tidak kompatibel dengan npm environment
- Konfigurasi monorepo pnpm tidak bekerja dengan sempurna di Vercel build environment

### Solution Implemented

#### 1. **vercel.json** - Simplified Build Configuration
```json
{
  "buildCommand": "cd frontend && npm run build",
  "installCommand": "npm install --legacy-peer-deps && cd frontend && npm install --legacy-peer-deps",
  "outputDirectory": "frontend/.next",
  "framework": "nextjs"
}
```

Perubahan:
- Menggunakan `cd frontend && npm run build` yang compatible dengan npm
- Install dependencies secara explicit di root dan di frontend
- Menambahkan `--legacy-peer-deps` untuk compatibility dengan dependencies yang memiliki peer dependency issues

#### 2. **package.json (Root)** - npm Workspaces
```json
{
  "workspaces": [
    "frontend"
  ],
  "scripts": {
    "dev": "cd frontend && npm run dev",
    "build": "cd frontend && npm run build",
    "start": "cd frontend && npm run start"
  }
}
```

Perubahan:
- Menggunakan npm `workspaces` field (bukan pnpm workspaces)
- Semua scripts menggunakan `cd frontend && npm run ...` untuk compatibility

#### 3. **.npmrc** - npm Configuration
```
legacy-peer-deps=true
engine-strict=false
```

Ditambahkan untuk:
- Allow dependency versions yang mungkin tidak sempurna match
- Prevent strict engine version checks

#### 4. **Removed Files**
- `pnpm-workspace.yaml` - Dihapus karena kita switch ke npm

### Expected Behavior After Fix

1. Vercel akan mendeteksi npm sebagai package manager (dari package-lock.json atau .npmrc)
2. Instalasi dependencies:
   - `npm install --legacy-peer-deps` di root
   - `npm install --legacy-peer-deps` di `frontend/`
3. Build command:
   - `cd frontend && npm run build` yang menjalankan `prisma generate && next build`
4. Output: `frontend/.next` directory siap untuk deployment

### Deployment Steps

1. Commit semua changes ke git
2. Push ke GitHub repository
3. Vercel akan automatically trigger deployment
4. Monitor build logs di Vercel dashboard

### Rollback (Jika diperlukan)

Kembali ke pnpm dengan:
- Restore `pnpm-workspace.yaml`
- Update `vercel.json` dengan `pnpm -C frontend run build`
- Update `package.json` scripts dengan `pnpm -C frontend ...`

### Files Modified
- ✅ `/vercel.json` - Updated build commands
- ✅ `/package.json` - Updated to use npm workspaces
- ✅ `/.npmrc` - Created for npm configuration
- ✅ `/pnpm-workspace.yaml` - Deleted

### Related Files (No changes needed)
- `frontend/package.json` - Keep as is (already has build script)
- `frontend/.next` - Build output, auto-generated
- `pnpm-lock.yaml` - Ignored by git, safe to keep locally
