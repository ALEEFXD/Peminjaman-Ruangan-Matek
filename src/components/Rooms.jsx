import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import RoomCard from "./ui/roomCard.jsx";
import getRooms from "@/utils/getRooms.js";


export default function Rooms(){
    const [rooms, setRooms] = useState([]);
    
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const fetchedRooms = await getRooms();
                if (fetchedRooms) setRooms(fetchedRooms);
            } catch (error) {
                console.error("Failed to fetch rooms:", error);
            }
        };
        fetchRooms();
    }, []);


    return(
        <div className="w-full h-fit p-20 flex flex-col text-main bg-neutral-0">
            <h2 className="text-3xl font-bold mb-8">Daftar Ruangan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-fit w-full">
                {/* Using the JavaScript .map() function inside JSX */}
                {rooms.map((room, index) => (
                    <RoomCard
                    key={index}
                    roomName={room.nama_ruangan}
                    floor={room.lantai}
                    capacity={room.kapasitas}
                    facilities={room.fasilitas}
                    imgDir={`/lantai-${room.lantai}.jpg`} />
                ))}
            </div>
        </div>
    )
}