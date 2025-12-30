import supabase from "../api/supabase-client.js";

export default async function addPeminjaman(nimPeminjam, namaRuangan, tanggal, jamMulai, jamSelesai, keperluan) {
    if (!supabase) {
        console.error("Supabase client not initialized");
        return null;
    }
    const { data, error } = await supabase
        .from('peminjaman')
        .insert([
            {
                nim_peminjam: nimPeminjam,
                nama_ruangan: namaRuangan,
                tanggal: tanggal,
                jam_mulai: jamMulai,
                jam_selesai: jamSelesai,
                mata_kuliah: keperluan,
                status: 'pending',
                waktu_pengajuan: new Date().toISOString(),
            }
        ])
        .select();

    if (error) {
        console.error("Error adding peminjaman:", error);
        return null;
    }
    return data;
}