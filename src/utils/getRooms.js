import supabase from "../api/supabase-client.js";

export default async function getRooms(){
    let { data: rooms, error } = await supabase.from('rooms').select('*');
    if (error) {
        console.error("Error fetching rooms:", error);
    } else {
        return rooms;
    }
}