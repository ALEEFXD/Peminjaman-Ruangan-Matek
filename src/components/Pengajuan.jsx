import { PengajuanTable } from "./ui/pengajuanTable"

export default function Pengajuan() {
    return(
        <div className='w-full h-[100vh] bg-neutral-1 font-sans p-[40px]'>
            <h2>Daftar Pengajuan Anda</h2>
            <PengajuanTable />
        </div>
    )
}