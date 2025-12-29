import supabase from "../api/supabase-client.js";

export default async function checkPeminjamanHours(roomName, date) {
    const { data: hours, error } = await supabase
        .from('peminjaman')
        .select('jam_mulai, jam_selesai')
        .eq('nama_ruangan', roomName)
        .eq('tanggal', date)
        .or('status.eq.approved,status.eq.pending');

    if (error) {
        console.error("Error fetching peminjaman:", error);
        return [];
    }
    return hours;
}