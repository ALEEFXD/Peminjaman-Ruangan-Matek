import supabase from "../api/supabase-client.js";

export default async function getPeminjaman(nim) {
    let query = supabase.from('peminjaman').select('*');

    if (nim) {
        query = query.eq('nim_peminjam', nim);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching peminjaman:", error);
        return [];
    }

    return data;
}