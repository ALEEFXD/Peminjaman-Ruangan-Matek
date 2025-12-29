import Button from "@/components/ui/button.jsx";

export default function Alur(){
    return(
        <div className="w-full h-fit p-20 flex flex-col text-main bg-neutral-0 rounded-t-[80px] ">
            <h3>Alur Peminjaman Ruangan</h3>
            <ol className="list-decimal list-inside flex flex-col">
                <li>Memilih ruangan yang tersedia dan hendak dipinjam.</li>
                <li>Mengajukan peminjaman dan mengunggah surat permohonan.</li>
                <li>Menunggu persetujuan peminjaman.</li>
                <li>Menggunakan ruangan dengan bertanggung jawab.</li>
            </ol>
        </div>
    )
}